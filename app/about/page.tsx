// app/about/page.tsx
export const revalidate = 600;

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutContent from "./AboutContent";
import { createClient } from "@supabase/supabase-js";

export const metadata = {
  title: "About - Eļzana Šaripova",
  description: "Biography and background of pianist and composer Elzana Sharipova",
};

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
    <main className="min-h-screen flex flex-col bg-[#0a0a0a] text-white">
      <Navbar />

      {/* Tightened top padding to bring content closer to navbar */}
      <section className="grow max-w-3xl mx-auto px-6 pt-8 pb-16">
        <AboutContent 
          contentEng={data?.content_eng} 
          contentLv={data?.content_lv} 
        />
      </section>

      <Footer />
    </main>
  );
}