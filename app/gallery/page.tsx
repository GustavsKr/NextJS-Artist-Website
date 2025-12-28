import { createClient } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";
import GalleryClient from "./GalleryClient";
import Footer from "@/components/Footer";

const getGalleryFiles = unstable_cache(
  async () => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } }
    );

    // Get only files in /gallery
    const { data: files, error } = await supabase.storage
      .from("main")
      .list("gallery", { limit: 500 });

    if (error) {
      console.error("Supabase gallery error:", error);
      throw new Error("Failed to fetch gallery");
    }

    if (!files) return [];


    return files.map((file) => {
      const { data } = supabase.storage
        .from("main")
        .getPublicUrl(`gallery/${file.name}`);

      return {
        src: data.publicUrl,
        alt: file.name,
      };
    });
  },
  ["gallery-cache"],        // cache key
  { revalidate: 3600 }      // cache for 1 hour so supabase free tier doesnt end
);

export default async function GalleryServer() {
  const photos = await getGalleryFiles();

  return (
    <main className="w-full bg-[#111] text-white">
      <GalleryClient photos={photos} />
      <Footer />
    </main>
  );
}
