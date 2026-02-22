// app/about/page.tsx

export const revalidate = 600;

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { createClient } from "@supabase/supabase-js";

export const metadata = {
  title: "About - Elzana Sharipova",
  description:
    "Biography and background of pianist and composer Elzana Sharipova",
};

function formatParagraphs(text: string) {
  return text
    .split(/\n+/)
    .map((p, i) => (
      <p
        key={i}
        className="text-lg leading-relaxed text-white/80 mb-6"
      >
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
    .select("content_eng, content_lv")
    .eq("id", 1)
    .single();

  if (error) {
    console.error("Error loading about:", error);
  }

  return (
    <main className="min-h-screen flex flex-col bg-[#111] text-white">
      <Navbar />

      <section className="grow max-w-3xl mx-auto px-6 py-12">
        {/* Top divider */}
        <div className="w-24 h-0.5 bg-white/20 mx-auto mb-12" />

        <article className="prose prose-invert prose-lg max-w-none">
          {/* English content (always shown) */}
          {data?.content_eng && formatParagraphs(data.content_eng)}

          {/* Latvian content (optional) */}
          {data?.content_lv && (
            <>
              <div className="w-24 h-0.5 bg-white/20 mx-auto my-12" />
              {formatParagraphs(data.content_lv)}
            </>
          )}
        </article>
      </section>

      <Footer />
    </main>
  );
}