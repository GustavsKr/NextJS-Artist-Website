'use client';
import Navbar from '@/components/Navbar';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabaseClient';
import { X } from 'lucide-react';
import { DragDropContext, Droppable, Draggable, DropResult, DroppableProvided, DraggableProvided } from 'react-beautiful-dnd';
import FileUploadDropzone from '@/components/admin/FileUploadDropzone';
import TextInputDB from '@/components/admin/TextInputDB';

type Photo = { id: string; title: string; url: string; order?: number };

export default function AdminPanel() {
  const [heroFiles, setHeroFiles] = useState<string[]>([]);
  const [newsFiles, setNewsFiles] = useState<string[]>([]);
  const [galleryFiles, setGalleryFiles] = useState<Photo[]>([]);
  const [aboutFiles, setAboutFiles] = useState<string[]>([]);
  const [aboutUrl, setAboutUrl] = useState('');
  const [aboutContent, setAboutContent] = useState('');
  const [aboutSaved, setAboutSaved] = useState(false);

  const [homepageYT, setHomepageYT] = useState(['', '']);
  const [performanceYT, setPerformanceYT] = useState<string[]>([]);

  const BUCKET = 'artist';

  useEffect(() => {
    const fetchData = async () => {
      // Hero
      const { data: heroData } = await supabase.from('homepage').select('*').eq('section', 'hero');
      if (heroData?.length) setHeroFiles(heroData.map(d => d.url!));

      // News
      const { data: newsData } = await supabase.from('homepage').select('*').eq('section', 'news');
      if (newsData?.length) setNewsFiles(newsData.map(d => d.url!));

      // Homepage YouTube
      const { data: youtubeData } = await supabase.from('homepage').select('*').eq('section', 'youtube').single();
      if (youtubeData) setHomepageYT([youtubeData.link1 ?? '', youtubeData.link2 ?? '']);

      // Performance YouTube
      const { data: perfData } = await supabase.from('homepage').select('*').eq('section', 'performance');
      if (perfData?.length) setPerformanceYT(perfData.map(d => d.link1 ?? ''));

      // About
      const { data: aboutData } = await supabase.from('about').select('*').single();
      if (aboutData) {
        setAboutContent(aboutData.content ?? '');
        if (aboutData.url) {
          setAboutFiles([aboutData.url]);
          setAboutUrl(aboutData.url);
        }
      }

      // Gallery
      const { data: galleryData } = await supabase.from('photos').select('*').order('order', { ascending: true }).order('created_at', { ascending: true });
      if (galleryData) setGalleryFiles(galleryData);
    };
    fetchData();
  }, []);

  const uploadFile = async (file: File, folder: string) => {
    const fileName = `${folder}/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from(BUCKET).upload(fileName, file);
    if (error) return null;
    const { data } = supabase.storage.from(BUCKET).getPublicUrl(fileName);
    return data?.publicUrl || null;
  };

  const handleUpload = async (file: File, section: 'hero' | 'news' | 'about') => {
    const url = await uploadFile(file, section);
    if (!url) return;
    if (section === 'hero') {
      await supabase.from('homepage').upsert({ section: 'hero', url });
      setHeroFiles([url]);
    } else if (section === 'news') {
      await supabase.from('homepage').upsert({ section: 'news', url });
      setNewsFiles([url]);
    } else if (section === 'about') {
      await supabase.from('about').upsert({ content: aboutContent, url });
      setAboutFiles([url]);
      setAboutUrl(url);
      setAboutSaved(true);
    }
  };

  const handleGalleryUpload = async (files: FileList) => {
    for (const file of Array.from(files)) {
      const url = await uploadFile(file, 'gallery');
      if (!url) continue;
      const { data } = await supabase.from('photos').insert([{ title: file.name, url }]).select();
      if (data && data.length) setGalleryFiles(prev => [...prev, data[0]]);
    }
  };

  const deleteGallery = async (id: string, filePath: string) => {
    await supabase.from('photos').delete().eq('id', id);
    await supabase.storage.from(BUCKET).remove([`gallery/${filePath}`]);
    setGalleryFiles(prev => prev.filter(p => p.id !== id));
  };

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;
    const newGallery = Array.from(galleryFiles);
    const [moved] = newGallery.splice(result.source.index, 1);
    newGallery.splice(result.destination.index, 0, moved);
    setGalleryFiles(newGallery);
    for (let i = 0; i < newGallery.length; i++) {
      await supabase.from('photos').update({ order: i }).eq('id', newGallery[i].id);
    }
  };

  const saveAbout = async () => {
    await supabase.from('about').upsert({ content: aboutContent, url: aboutUrl });
    setAboutSaved(true);
  };

  const saveHomepageYT = async () => {
    await supabase.from('homepage').upsert({ section: 'youtube', link1: homepageYT[0], link2: homepageYT[1] });
  };

  const savePerformanceYT = async () => {
    await supabase.from('homepage').delete().eq('section', 'performance');
    for (const link of performanceYT) {
      if (link.trim()) await supabase.from('homepage').insert({ section: 'performance', link1: link });
    }
  };

  return (
<div className="min-h-screen p-6 bg-[#111] text-[#eaeaea] space-y-12">
  <Navbar />
  {/* HOME GROUP: Hero, News, Homepage YouTube */}
  <div className="space-y-6">
        
    {/* HERO */}
    <section className="p-6 rounded-xl shadow-md bg-[#222]">
    <h2 className="text-2xl font-bold mb-3">Hero Section</h2>

    {heroFiles.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-3">
        {heroFiles.map((url, i) => (
            <div key={i} className="relative w-full h-48 rounded overflow-hidden">
            <Image src={url} alt="hero" fill className="object-cover" />
            </div>
        ))}
        </div>
    ) : <b>No media currently set for this section</b>}

    {/* Drag-and-drop upload */}
    <div className="flex items-center justify-center w-full mt-3">
        <label
        htmlFor="hero-dropzone"
        className="flex flex-col items-center justify-center w-full h-64 bg-[#eaeaea] border-2 border-dashed border-[#ccc] rounded-lg cursor-pointer hover:bg-gray-300"
        >
        <div className="flex flex-col items-center justify-center text-[#111] pt-5 pb-6">
            <svg
            className="w-8 h-8 mb-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            >
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h3a3 3 0 0 0 0-6h-.025a5.56 5.56 0 0 0 .025-.5A5.5 5.5 0 0 0 7.207 9.021C7.137 9.017 7.071 9 7 9a4 4 0 1 0 0 8h2.167M12 19v-9m0 0-2 2m2-2 2 2"
            />
            </svg>
            <p className="mb-2 text-sm">
            <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs">.JPG files heavily prefered</p>
        </div>
        <input
            id="hero-dropzone"
            type="file"
            className="hidden"
            onChange={e => e.target.files?.[0] && handleUpload(e.target.files[0], 'hero')}
        />
        </label>
    </div>
    </section>


    {/* NEWS */}
    <section className="p-6 rounded-xl shadow-md bg-[#222]">
    <h2 className="text-2xl font-bold mb-3">News Section</h2>
    
    {newsFiles.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-3">
        {newsFiles.map((url, i) => (
            <div key={i} className="relative w-full h-48 rounded overflow-hidden">
            <Image src={url} alt="news" fill className="object-cover"/>
            </div>
        ))}
        </div>
    ) : <b>No media currently set for this section</b>}

    {/* Drag-and-drop upload */}
    <div className="flex items-center justify-center w-full mt-3">
        <label
        htmlFor="news-dropzone"
        className="flex flex-col items-center justify-center w-full h-64 bg-[#eaeaea] border-2 border-dashed border-[#ccc] rounded-lg cursor-pointer hover:bg-gray-300"
        >
        <div className="flex flex-col items-center justify-center text-[#111] pt-5 pb-6">
            <svg
            className="w-8 h-8 mb-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            >
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h3a3 3 0 0 0 0-6h-.025a5.56 5.56 0 0 0 .025-.5A5.5 5.5 0 0 0 7.207 9.021C7.137 9.017 7.071 9 7 9a4 4 0 1 0 0 8h2.167M12 19v-9m0 0-2 2m2-2 2 2"
            />
            </svg>
            <p className="mb-2 text-sm">
            <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs">.JPG files heavily preferred</p>
        </div>
        <input
            id="news-dropzone"
            type="file"
            className="hidden"
            onChange={e => e.target.files?.[0] && handleUpload(e.target.files[0], 'news')}
        />
        </label>
    </div>
    </section>


    {/* Homepage YouTube */}
    <section className="p-6 rounded-xl shadow-md bg-[#222]">
      <h2 className="text-2xl font-bold mb-3">Homepage YouTube (2 links max)</h2>
      {homepageYT.map((link, i) => (
        <input
          key={i}
          value={link}
          onChange={e => { const tmp = [...homepageYT]; tmp[i] = e.target.value; setHomepageYT(tmp); }}
          placeholder={`YouTube Link ${i + 1}`}
          className="border p-2 w-full mb-2 rounded text-[#eaeaea]"
        />
      ))}
      <button
        onClick={saveHomepageYT}
        className="bg-[#eaeaea] text-[#111] px-2 py-2 rounded hover:cursor-pointer"
      >
        Save Homepage YT
      </button>
    </section>
  </div>

    {/* PERFORMANCE GROUP */}
    <section className="p-6 rounded-xl shadow-md bg-[#222]">
    <h2 className="text-2xl font-bold mb-3">Performances</h2>

    {performanceYT.map((link, i) => (
        <input
        key={i}
        value={link}
        onChange={e => {
            const tmp = [...performanceYT];
            tmp[i] = e.target.value;
            setPerformanceYT(tmp);
        }}
        placeholder={`YouTube Link ${i + 1}`}
        className="border p-2 w-full mb-2 rounded text-[#eaeaea]"
        />
    ))}

    <button
        onClick={() => setPerformanceYT([...performanceYT, ''])}
        className="bg-[#eaeaea] text-[#111] px-3 py-1 rounded mb-2 hover:cursor-pointer flex items-center justify-center"
    >
        <span className="text-xl font-bold">+</span>
    </button>

    <button
        onClick={savePerformanceYT}
        className="bg-[#eaeaea] text-[#111] px-4 py-2 rounded hover:cursor-pointer"
    >
        Save Performance YT
    </button>
    </section>


  {/* ABOUT GROUP */}
  <section className="p-6 rounded-xl shadow-md bg-[#222]">
    <h2 className="text-2xl font-bold mb-3">About Section</h2>
    {aboutFiles.length ? (
      <div className="relative w-64 h-48 rounded overflow-hidden mb-3">
        <Image src={aboutFiles[0]} alt="about" fill className="object-cover"/>
      </div>
    ) : <b>No media currently set for this section</b>}

    <div className="mb-2">
      <input
        type="file"
        id="aboutFile"
        className="file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold
                   file:bg-[#eaeaea] file:text-[#111] hover:file:bg-gray-300 cursor-pointer w-full"
        onChange={e => e.target.files?.[0] && handleUpload(e.target.files[0], 'about')}
      />
    </div>

    <textarea
      value={aboutContent}
      onChange={e => { setAboutContent(e.target.value); setAboutSaved(false); }}
      className="border p-3 w-full mb-2 rounded bg-[#222] text-[#eaeaea]"
      placeholder="About text"
    />
    <button
      onClick={saveAbout}
      className={`px-4 py-2 rounded hover:cursor-pointer ${aboutSaved ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-[#eaeaea] text-[#111]'}`}
      disabled={aboutSaved}
    >
      Save About
    </button>
  </section>

  {/* GALLERY GROUP */}
  <section className="p-6 rounded-xl shadow-md bg-[#222]">
    <h2 className="text-2xl font-bold mb-3">Gallery</h2>
    {galleryFiles.length ? (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="gallery" direction="horizontal">
          {(provided: DroppableProvided) => (
            <div className="flex gap-3 mb-3 overflow-x-auto" {...provided.droppableProps} ref={provided.innerRef}>
              {galleryFiles.map((photo, index) => (
                <Draggable key={photo.id} draggableId={photo.id} index={index}>
                  {(provided: DraggableProvided) => (
                    <div className="relative w-24 h-24 rounded overflow-hidden" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <Image src={photo.url} alt={photo.title} fill className="object-cover"/>
                      <button onClick={() => deleteGallery(photo.id, photo.url.split('/').pop()!)} className="absolute top-1 right-1 bg-red-600 p-1 rounded opacity-70 hover:opacity-100 hover:cursor-pointer">
                        <X size={16} color="#fff"/>
                      </button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    ) : <b>No media currently set for this section</b>}

    <div className="mt-3">
      <input
        type="file"
        multiple
        id="galleryFiles"
        className="file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold
                   file:bg-[#eaeaea] file:text-[#111] hover:file:bg-gray-300 cursor-pointer w-full"
        onChange={e => e.target.files && handleGalleryUpload(e.target.files)}
      />
    </div>
  </section>
</div>

  );
}
