'use client';

import { ChangeEvent, useState } from 'react';
import Image from 'next/image';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client (same as in AdminPanel)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Props = {
  files: string[];
  setFiles: (urls: string[]) => void | Promise<void>;
  folder: '/' | 'gallery';
  multiple?: boolean;
  fixedFilename?: string; // e.g., "hero.jpg"
};

export default function FileUploadDropzone({
  files,
  setFiles,
  folder,
  multiple = false,
  fixedFilename,
}: Props) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (file: File) => {
    try {
      setUploading(true);

      let storagePath = '';

      if (folder === '/' && fixedFilename) {
        // Rename file to fixed filename
        const base = fixedFilename.replace(/\.jpe?g$/i, '');
        const newFilename = `${base}.jpg`;
        const renamedFile = new File([file], newFilename, { type: file.type });
        file = renamedFile;
        storagePath = newFilename;
      } else if (folder === 'gallery') {
        storagePath = `gallery/${Date.now()}-${file.name}`;
      } else {
        storagePath = `${Date.now()}-${file.name}`;
      }

      // Upload to Supabase Storage
      const { error } = await supabase.storage
        .from('artist')
        .upload(storagePath, file, { upsert: true });

      if (error) {
        console.error('Upload failed:', error);
        alert('Upload failed: ' + error.message);
        return;
      }

      // Get public URL
      const { data: urlData } = supabase.storage.from('artist').getPublicUrl(storagePath);
      if (!urlData?.publicUrl) {
        alert('Could not get public URL for uploaded file.');
        return;
      }

      if (multiple) {
        setFiles([...files, urlData.publicUrl]);
      } else {
        setFiles([urlData.publicUrl]);
      }
    } catch (err) {
      console.error('Unexpected upload error:', err);
      alert('Unexpected upload error: ' + (err as Error).message);
    } finally {
      setUploading(false);
    }
  };

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const fileList = Array.from(e.target.files);

    if (multiple) {
      for (const file of fileList) {
        await handleUpload(file);
      }
    } else {
      await handleUpload(fileList[0]);
    }
  };

  return (
    <div className="flex flex-col items-center w-full mt-3">
      <label
        className={`flex flex-col items-center justify-center w-full h-40
        bg-[#eaeaea] border-2 border-dashed border-[#ccc] rounded-lg cursor-pointer 
        hover:bg-gray-300 ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
      >
        <div className="flex flex-col items-center justify-center text-[#111] pt-4 pb-4">
          <svg
            className="w-8 h-8 mb-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h3a3 3 0 0 0 0-6h-.025a5.56 5.56 0 0 0 .025-.5A5.5 5.5 0 0 0 7.207 9.021C7.137 9.017 7.071 9 7 9a4 4 0 1 0 0 8h2.167M12 19v-9m0 0-2 2m2-2 2 2"
            />
          </svg>
          <p className="text-sm">
            <span className="font-semibold">Click to upload</span> or drag & drop
          </p>
          <p className="text-xs">JPG preferred</p>
        </div>

        <input
          type="file"
          multiple={multiple}
          className="hidden"
          onChange={handleChange}
          accept="image/*"
        />
      </label>

      {files.length > 0 && (
        <div className="grid grid-cols-3 gap-3 mt-3 w-full">
          {files.map((url, i) => (
            <div key={i} className="relative w-full h-24 rounded overflow-hidden">
              <Image src={url} alt={`upload-preview-${i}`} fill className="object-cover" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
