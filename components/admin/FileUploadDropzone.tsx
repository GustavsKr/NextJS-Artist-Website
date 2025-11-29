'use client';
import { ChangeEvent } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabaseClient';

type Props = {
  files: string[];
  setFiles: (urls: string[]) => void;
  folder: 'hero' | 'news' | 'about' | 'gallery';
  multiple?: boolean;
};

export default function FileUploadDropzone({ files, setFiles, folder, multiple = false }: Props) {
  const handleUpload = async (file: File) => {
    const fileName = `${folder}-${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from('artist').upload(`${folder}/${fileName}`, file);

    if (error) return alert(error.message);

    const url = supabase.storage.from('artist').getPublicUrl(`${folder}/${fileName}`).data.publicUrl;
    if (url) setFiles(multiple ? [...files, url] : [url]);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    if (multiple) {
      Array.from(e.target.files).forEach(f => handleUpload(f));
    } else {
      handleUpload(e.target.files[0]);
    }
  };

  return (
    <div className="flex items-center justify-center w-full mt-3">
      <label
        className="flex flex-col items-center justify-center w-full h-64 bg-[#eaeaea] border-2 border-dashed border-[#ccc] rounded-lg cursor-pointer hover:bg-gray-300"
      >
        <div className="flex flex-col items-center justify-center text-[#111] pt-5 pb-6">
          <svg className="w-8 h-8 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h3a3 3 0 0 0 0-6h-.025a5.56 5.56 0 0 0 .025-.5A5.5 5.5 0 0 0 7.207 9.021C7.137 9.017 7.071 9 7 9a4 4 0 1 0 0 8h2.167M12 19v-9m0 0-2 2m2-2 2 2" />
          </svg>
          <p className="mb-2 text-sm"><span className="font-semibold">Click to upload</span> or drag and drop</p>
          <p className="text-xs">.JPG files heavily preferred</p>
        </div>
        <input
          type="file"
          multiple={multiple}
          className="hidden"
          onChange={handleChange}
        />
      </label>

      {/* Show previews */}
      {files.length > 0 && (
        <div className="grid grid-cols-3 gap-3 mt-3 w-full">
          {files.map((url, i) => (
            <div key={i} className="relative w-full h-24 rounded overflow-hidden">
              <Image src={url} alt={folder} fill className="object-cover" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
