"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";
import Navbar from "@/components/Navbar";
import FileUploadDropzone from "@/components/admin/FileUploadDropzone";
import TextInputField from "@/components/admin/TextInputField";

// Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Fixed filenames for the homepage images
const FILES: Record<string, string> = {
  hero: "hero.jpg",
  news: "news.jpg",
  about: "about.jpg",
};

// Get public URL from Supabase storage
async function getPublicUrl(filename: string): Promise<string> {
  const { data } = supabase.storage.from("artist").getPublicUrl(filename);
  return data.publicUrl;
}

// Helper function to upload and rename a file
async function uploadFixedFile(file: File, filename: string): Promise<string> {
  const base = filename.replace(/\.jpe?g$/i, "");
  const newFilename = `${base}.jpg`;

  const fileToUpload = new File([file], newFilename, {
    type: file.type || "image/jpeg",
  });

  const { error } = await supabase.storage
    .from("artist")
    .upload(newFilename, fileToUpload, {
      upsert: true,
      cacheControl: "0",
    });

  if (error) {
    console.error("Upload failed:", error);
    throw error;
  }

  const { data } = supabase.storage.from("artist").getPublicUrl(newFilename);
  return data.publicUrl;
}

export default function AdminPanel() {
  const [heroUrl, setHeroUrl] = useState<string>("");
  const [newsUrl, setNewsUrl] = useState<string>("");
  const [aboutUrl, setAboutUrl] = useState<string>("");

  const [aboutText, setAboutText] = useState<string>("");

  useEffect(() => {
    async function load() {
      setHeroUrl(await getPublicUrl(FILES.hero));
      setNewsUrl(await getPublicUrl(FILES.news));
      setAboutUrl(await getPublicUrl(FILES.about));
    }
    load();
  }, []);

  return (
    <section className="text-white bg-[#111]">
    <Navbar />
    <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* HERO */}
      <section className="p-6 bg-neutral-900 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-4">Hero Section</h2>

        {heroUrl ? (
          <div className="relative w-64 h-40 mb-4 rounded overflow-hidden">
            <Image src={heroUrl} alt="Hero" fill className="object-cover" />
          </div>
        ) : (
          <p>No hero.jpg found</p>
        )}

        <label className="text-sm mb-2 block">Upload hero.jpg</label>

        <FileUploadDropzone
          files={[]}
          setFiles={async (files: string[] | File[]) => {
            if (!files.length) return;
            const file = files[0] as File;
            const url = await uploadFixedFile(file, FILES.hero);
            setHeroUrl(url);
          }}
          folder="/"
          multiple={false}
        />
      </section>

      {/* NEWS */}
      <section className="p-6 bg-neutral-900 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-4">News Section</h2>

        {newsUrl ? (
          <div className="relative w-64 h-40 mb-4 rounded overflow-hidden">
            <Image src={newsUrl} alt="News" fill className="object-cover" />
          </div>
        ) : (
          <p>No news.jpg found</p>
        )}

        <label className="text-sm mb-2 block">Upload news.jpg</label>

        <FileUploadDropzone
          files={[]}
          setFiles={async (files: string[] | File[]) => {
            if (!files.length) return;
            const file = files[0] as File;
            const url = await uploadFixedFile(file, FILES.news);
            setNewsUrl(url);
          }}
          folder="/"
          multiple={false}
        />
      </section>

      {/* ABOUT */}
      <section className="p-6 bg-neutral-900 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-4">About Section</h2>

        {aboutUrl ? (
          <div className="relative w-64 h-40 mb-4 rounded overflow-hidden">
            <Image src={aboutUrl} alt="About" fill className="object-cover" />
          </div>
        ) : (
          <p>No about.jpg found</p>
        )}

        <label className="text-sm mb-2 block">Upload about.jpg</label>

        <FileUploadDropzone
          files={[]}
          setFiles={async (files: string[] | File[]) => {
            if (!files.length) return;
            const file = files[0] as File;
            const url = await uploadFixedFile(file, FILES.about);
            setAboutUrl(url);
          }}
          folder="/"
          multiple={false}
        />

        <div className="mt-6">
          <label className="text-sm mb-2 block">About Text</label>

          <TextInputField
            value={aboutText}
            setValue={setAboutText}
            table="about"
            field="content"
            rowId="about-text-row"
          />
        </div>
      </section>

      {/* PERFORMANCES (Disabled) */}
      <section className="p-6 bg-neutral-900 opacity-50 pointer-events-none rounded-xl">
        <h2 className="text-2xl font-bold mb-2">Performances (Disabled)</h2>
        <p>Will build after database design.</p>
      </section>

      {/* GALLERY — FULL WIDTH */}
      <section className="p-6 bg-neutral-900 opacity-50 pointer-events-none rounded-xl col-span-1 md:col-span-2">
        <h2 className="text-2xl font-bold mb-2">Gallery (Disabled)</h2>
        <p>Will build after database design.</p>
      </section>
    </div>
    </section>
  );
}