import Image from "next/image";
import Navbar from "@/components/Navbar"; 

export default function Hero() {
  return (
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
  );
}
