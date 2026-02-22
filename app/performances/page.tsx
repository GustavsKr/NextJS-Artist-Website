// app/performances/page.tsx
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { createClient } from "@supabase/supabase-js";

export const metadata = {
  title: "Performances - Eļzana Šaripova",
  description: "Collection of video performances by pianist and composer Eļzana Šaripova",
};

// Cache this page for 10 minutes
export const revalidate = 600;

// Convert YouTube URL → embed URL
function toEmbedUrl(url: string): string {
  try {
    const parsed = new URL(url);
    const v = parsed.searchParams.get("v");
    if (v) return `https://www.youtube.com/embed/${v}`;

    const lastPart = parsed.pathname.split("/").pop();
    return `https://www.youtube.com/embed/${lastPart}`;
  } catch {
    return "";
  }
}

export default async function PerformancesPage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } }
  );

  const { data: performances, error } = await supabase
    .from("performances")
    .select("*")
    .order('"order"', { ascending: true });

  if (error) {
    console.error("Error fetching performances:", error);
    return <div>Error loading performances</div>;
  }

  return (
    <main className="w-full bg-[#111] text-white min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto pb-12 py-24">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          {performances?.map((item) => (
            <div key={item.id}>
              <div className="bg-black aspect-16/8">
                <iframe
                  src={toEmbedUrl(item.links)}
                  className="w-full h-full"
                  allowFullScreen
                ></iframe>
              </div>

              {item.title && item.title.trim() !== "" && (
                <p className="mt-2 text-center text-sm">{item.title}</p>
              )}
            </div>
          ))}
        </div>

      </div>
      <Footer />
    </main>
  );
}
