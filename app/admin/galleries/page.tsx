'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabaseClient';

type Photo = {
  id: string;
  title: string;
  url: string;
};

export default function AdminGalleriesPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');

  // Fetch photos from Supabase
  useEffect(() => {
    let isMounted = true;

    const fetchPhotos = async () => {
      const { data, error } = await supabase
        .from('photos')
        .select('*')
        .order('created_at', { ascending: false });

      if (isMounted && data) {
        setPhotos(data);
      }
      if (error) console.error('Error fetching photos:', error);
    };

    fetchPhotos();

    return () => {
      isMounted = false;
    };
  }, []);

  // Upload photo
  const uploadPhoto = async () => {
    if (!file || !title) return alert('Please provide a title and file.');

    const fileName = `photo-${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from('galleries')
      .upload(fileName, file);

    if (uploadError) return alert(uploadError.message);

    const url = supabase.storage.from('galleries').getPublicUrl(fileName).data.publicUrl;

    await supabase.from('photos').insert([{ title, url }]);

    setFile(null);
    setTitle('');

    // Refresh gallery
    const { data } = await supabase.from('photos').select('*').order('created_at', { ascending: false });
    if (data) setPhotos(data);
  };

  // Delete photo
  const deletePhoto = async (id: string, filePath: string) => {
    await supabase.from('photos').delete().eq('id', id);
    await supabase.storage.from('galleries').remove([filePath]);

    setPhotos(prev => prev.filter(photo => photo.id !== id));
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin Gallery</h1>

      {/* Upload form */}
      <div className="flex flex-col sm:flex-row gap-2 mb-6">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="border p-2 flex-1"
        />
        <input
          type="file"
          onChange={e => setFile(e.target.files?.[0] ?? null)}
          className="border p-2"
        />
        <button
          onClick={uploadPhoto}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Upload
        </button>
      </div>

      {/* Gallery grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {photos.map(photo => (
          <div key={photo.id} className="border p-2 relative">
            <div className="relative w-full h-48">
              <Image
                src={photo.url}
                alt={photo.title}
                fill
                className="object-cover"
              />
            </div>
            <p className="mt-2 font-medium">{photo.title}</p>
            <button
              onClick={() => deletePhoto(photo.id, photo.url.split('/').pop()!)}
              className="bg-red-600 text-white px-2 py-1 mt-1 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
