import Hero from "@/components/Hero";
import News from "@/components/News";
import MediaShowcase from "@/components/MediaShowcase";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="w-full overflow-x-hidden">
      <Hero />
      <News />
      <MediaShowcase />
      <Contact />
    </main>
  );
}
