"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";
import FileUploadDropzone from "@/components/admin/FileUploadDropzone";
import TextInputField from "@/components/admin/TextInputField";

// Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Fixed filenames for the homepage images
const FILES = {
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
  // Ensure the file is uploaded as JPG if fixed filename has .jpg
  const base = filename.replace(/\.jpe?g$/i, "");
  const newFilename = `${base}.jpg`;

  // Create a new File object to rename the file, preserve original bytes
  const fileToUpload = new File([file], newFilename, {
    type: file.type || "image/jpeg",
  });

  const { error } = await supabase.storage
    .from("artist")
    .upload(newFilename, fileToUpload, {
      upsert: true, // overwrite existing file
      cacheControl: "0", // disable caching
    });

  if (error) {
    console.error("Upload failed:", error);
    throw error;
  }

  // Return public URL
  const { data } = supabase.storage.from("artist").getPublicUrl(newFilename);
  return data.publicUrl;
}


export default function AdminPanel() {

  const [heroUrl, setHeroUrl] = useState<string>("");
  const [newsUrl, setNewsUrl] = useState<string>("");
  const [aboutUrl, setAboutUrl] = useState<string>("");

  const [aboutText, setAboutText] = useState<string>("");

  // Load initial images on mount
  useEffect(() => {
    async function load() {
      setHeroUrl(await getPublicUrl(FILES.hero));
      setNewsUrl(await getPublicUrl(FILES.news));
      setAboutUrl(await getPublicUrl(FILES.about));
    }
    load();
  }, []);

  return (
    <div className="p-10 text-white space-y-12">

      {/* ------------------------------------------------ */}
      {/*                     HERO SECTION                 */}
      {/* ------------------------------------------------ */}
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
            const url = await uploadFixedFile(file, FILES.hero); // e.g., hero.jpg
            setHeroUrl(url);
          }}
          folder="/"
          multiple={false}
        />

      </section>

      {/* ------------------------------------------------ */}
      {/*                     NEWS SECTION                 */}
      {/* ------------------------------------------------ */}
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
            const url = await uploadFixedFile(file, FILES.news); // e.g., news.jpg
            setNewsUrl(url);
          }}
          folder="/"
          multiple={false}
        />

      </section>

      {/* ------------------------------------------------ */}
      {/*                     ABOUT SECTION                */}
      {/* ------------------------------------------------ */}
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
            const url = await uploadFixedFile(file, FILES.about); // e.g., about.jpg
            setAboutUrl(url);
          }}
          folder="/"
          multiple={false}
        />


        {/* ABOUT TEXT INPUT */}
        <div className="mt-6">
          <label className="text-sm mb-2 block">About Text</label>

          <TextInputField
            value={aboutText}
            setValue={setAboutText}
            table="about"
            field="content"
            rowId="about-text-row" // Placeholder for future DB
          />
        </div>
      </section>

      {/* ------------------------------------------------ */}
      {/*              DISABLED SECTIONS (UNCHANGED)       */}
      {/* ------------------------------------------------ */}

      <section className="p-6 bg-neutral-900 opacity-50 pointer-events-none rounded-xl">
        <h2 className="text-2xl font-bold mb-2">Performances (Disabled)</h2>
        <p>Will build after database design.</p>
      </section>

      <section className="p-6 bg-neutral-900 opacity-50 pointer-events-none rounded-xl">
        <h2 className="text-2xl font-bold mb-2">Gallery (Disabled)</h2>
        <p>Will build after database design.</p>
      </section>
    </div>
  );
}
