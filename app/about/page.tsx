// app/about/page.tsx

export const revalidate = 600; // cache page for 10 minutes

import Navbar from "@/components/Navbar";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";

export const metadata = {
  title: "About - Elzana Sharipova",
  description: "Biography and background of pianist and composer Elzana Sharipova",
};

function formatParagraphs(text: string) {
  return text
    .split(/\n+/)
    .map((p, i) => (
      <p key={i} className="mb-4 leading-relaxed whitespace-pre-wrap">
        {p.trim()}
      </p>
    ));
}

export default async function AboutPage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } }
  );

  const { data, error } = await supabase
    .from("about")
    .select("content")
    .eq("id", 1)
    .single();

  if (error) {
    console.error("Error loading about:", error);
  }

  return (
    <main className="w-full bg-[#111] text-white">
      <Navbar />

      <section className="max-w-6xl mx-auto flex flex-col lg:flex-row items-start gap-10 py-24 px-6">
        <div className="w-full lg:w-1/2 order-2 lg:order-1">
          <Image
            src="/biography.jpg"
            alt="Elzana Sharipova"
            width={1600}
            height={2400}
            className="w-full h-auto object-cover shadow-lg"
          />
        </div>

        <div className="flex-1 space-y-6 order-1 lg:order-2">
          <h1 className="text-4xl font-bold mb-4">Biography</h1>
          {data?.content
            ? formatParagraphs(data.content)
            : <p>Loading biography...</p>}
        </div>
      </section>
    </main>
  );
}
