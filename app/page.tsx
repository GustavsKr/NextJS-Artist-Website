import Image from "next/image";
import Navbar from "@/components/Navbar"; 
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full overflow-x-hidden">
      <section className="relative w-full h-screen bg-black">
        {/* Gradient + Navbar wrapper */}
        <div className="absolute top-0 left-0 w-full z-20 opacity-0 animate-fadeIn delay-500">
          <div className="absolute top-0 left-0 w-full h-60 bg-linear-to-b from-black/90 to-transparent"></div>
          <Navbar />
        </div>

        {/* Hero image */}
        <Image
          src="/hero.jpg"
          alt="Elzana Sharipova"
          fill
          className="object-cover md:object-cover animate-fadeIn"
          priority
        />

        {/* Bottom centered clickable box */}
        <Link
          href="/etudes"
          className="absolute bottom-0 bg-black text-white px-6 py-3 text-lg tracking-wide z-30 animate-fadeIn from-black"
        >
          ETUDES BY ELZANA
        </Link>
      </section>
    </main>
  );
}
