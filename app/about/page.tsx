// app/about/page.tsx

import Navbar from "@/components/Navbar";
import Image from "next/image";

export const metadata = {
  title: "About - Elzana Sharipova", 
  description: "Biography and background of pianist and composer Elzana Sharipova",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="w-full bg-[#111] text-white px-6 py-45">
        <section className="max-w-6xl mx-auto flex flex-col md:flex-row items-start gap-10">
          
          {/* Left: Bigger Biography image */}
          <div className="w-full md:w-1/2"> {/* increased width */}
            <Image
              src="/biography.jpg"
              alt="Elzana Sharipova"
              width={1600}
              height={2400}  // taller image
              className="w-full h-auto object-cover shadow-lg"
            />
          </div>

          {/* Right: Text content */}
          <div className="flex-1 space-y-6 leading-relaxed">
            <h1 className="text-4xl font-bold mb-4">Biography</h1>
            <p>
              Elzana Sharipova, born in 2004, is an aspiring pianist and composer from Latvia.  
              She currently studies at the <strong>Jāzeps Vītols Latvian Academy of Music</strong>, and has graduated from the <strong>Emīls Dārziņš Music School</strong>.  
            </p>
            <p>
              Music has always been her passion. She draws inspiration from jazz, classical music, and everyday life.
              In 2024, Elzana achieved several milestones: she won [<em>replace with award name</em>] and placed 1st in [<em>replace with competition name</em>], marking the beginning of what promises to be a vibrant musical career.
            </p>
            <p>
              Dedicated to exploring rhythms, harmonies, and evocative compositions, Elzana continues to work on new pieces, with a released new EP - <strong>ETUDES BY ELZANA</strong>.
            </p>
          </div>

        </section>
      </main>
    </>
  );
}
