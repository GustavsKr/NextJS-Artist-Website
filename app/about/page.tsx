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
      <main className="w-full bg-[#111] text-white">
        <Navbar />
        <section className="max-w-6xl mx-auto flex flex-col lg:flex-row items-start gap-10 py-24 px-6">

          {/* Left: Biography image */}
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <Image
              src="/biography.jpg"
              alt="Elzana Sharipova"
              width={1600}
              height={2400}
              className="w-full h-auto object-cover shadow-lg"
            />
          </div>

          {/* Right: Text content */}
          <div className="flex-1 space-y-6 leading-relaxed order-1 lg:order-2">
            <h1 className="text-4xl font-bold mb-4">Biography</h1>

            <p>
              Elzana Sharipova, born in 2004, is an aspiring pianist and composer from Latvia.  
              She currently studies at the <strong>Jāzeps Vītols Latvian Academy of Music</strong>, and has graduated from the <strong>Emīls Dārziņš Music School</strong>.  
            </p>

            <p>
              Music has always been her passion. She draws inspiration from jazz, classical music, and everyday life.
              In 2024, Elzana achieved several milestones: she won [<em>replace with award name</em>] and placed 1st in [<em>replace with competition name</em>].
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
