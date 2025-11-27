import Navbar from "@/components/Navbar";
import News from "@/components/News";
import MediaShowcase from "@/components/MediaShowcase";
import Contact from "@/components/Contact";
import Image from "next/image";

export default function Home() {
  return (
    <main className="w-full text-white overflow-x-hidden">

      {/* Hero section */}
<section className="relative w-full h-[117vh] bg-black">
  {/* Hero image */}
  <Image
    src="/hero.jpg"
    alt="Elzana Sharipova"
    fill
    className="object-cover animate-fadeIn"
    priority
  />

  {/* Gradient + Navbar wrapper */}
  <div className="absolute top-0 left-0 w-full z-20 opacity-0 animate-fadeIn delay-500">
    <div className="absolute top-0 left-0 w-full h-60 bg-linear-to-b from-black/90 to-transparent"></div>
    <Navbar />
  </div>

  {/* Diagonal SVG at bottom */}
<svg
  className="absolute -bottom-2 w-full h-20 z-10"
  viewBox="0 0 100 100"
  preserveAspectRatio="none"
>
  <polygon points="0,0 100,50 100,100 0,100" fill="#eaeaea" />
</svg>


</section>

{/* Next section background matches SVG */}
<section className="bg-[#eaeaea]">
  <News />
  <MediaShowcase />
  <Contact />
</section>

    </main>
  );
}
