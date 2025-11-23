import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Biography from "@/components/Biography";
import Image from "next/image";

export default function Home() {
  return (
    <main className="w-full text-white">

      {/* Hero section */}
      <section className="relative w-full h-[117vh] overflow-hidden bg-black">
        {/* Hero image */}
        <Image
          src="/hero.jpg"
          alt="Elzana Sharipova"
          fill
          className="object-cover animate-fadeIn"
          priority
        />

        {/* Gradient + Navbar wrapper to fade in together */}
        <div className="absolute top-0 left-0 w-full z-20 opacity-0 animate-fadeIn delay-500">
          {/* Top dark gradient */}
          <div className="absolute top-0 left-0 w-full h-48 bg-linear-to-b from-black/90 to-transparent"></div>
          
          {/* Navbar */}
          <Navbar />
        </div>

        {/* Diagonal at bottom */}
        <div className="absolute bottom-0 w-full h-15 bg-gray-50 clip-diagonal-bottom"></div>
      </section>

      {/* Biography section */}
      <Biography />

      {/* Footer */}
      <Footer />
    </main>
  );
}
