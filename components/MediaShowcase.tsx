"use client";

import Image from "next/image";

export default function MediaShowcase() {
  return (
    <section className="relative w-full bg-[#eaeaea] text-black py-20">

      <div className="max-w-6xl mx-auto px-6 pb-12">
        <h2 className="text-3xl font-bold mb-10">Performances & Compositions</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* YouTube video placeholder */}
          <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.youtube.com/embed/example"
              className="w-full h-full"
              allowFullScreen
            ></iframe>
          </div>

        {/* Photo 1 */}
        <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg">
        <Image
            src="/album.jpg"
            alt="Performance"
            fill
            className="object-cover"
        />
        </div>

        {/* Photo 2 */}
        <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg">
        <Image
            src="/hero.jpg"
            alt="Composition"
            fill
            className="object-cover"
        />
        </div>

        </div>
      </div>

      {/* Bottom diagonal */}
      <div className="absolute bottom-0 w-full h-15 bg-white clip-diagonal-bottom-left"></div>
    </section>
  );
}
