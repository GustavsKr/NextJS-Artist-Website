import Hero from "@/components/Hero";
import News from "@/components/News";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="w-full overflow-x-hidden">
      <Hero />
      <News />
      <Contact />
    </main>
  );
}
