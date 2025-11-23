"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Biography() {
  return (
    <section className="relative w-full bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-16 pb-40 flex flex-col md:flex-row items-center gap-8">
        {/* Left: Album image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <Image
            src="/album.jpg"
            alt="Album cover"
            width={400}
            height={400}
            className="object-contain rounded-lg"
          />
        </div>

        {/* Right: Biography text */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="w-full md:w-1/2"
        >
          <h2 className="text-2xl font-bold mb-4 text-black">Biography</h2>
          <p className="text-lg leading-relaxed text-black">
            A pianist whose fingers live on the keys and soul thrives on the road. 
            I love rhythms, harmonies, and humor in music—because what’s a concert 
            without a smile? Inspired by jazz, classical tunes, and my fridge 
            (especially at night). Always chasing new notes to rock the stage and 
            hearts of listeners.
          </p>
        </motion.div>
      </div>
      
      {/* Bottom diagonal */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-[#eaeaea] clip-diagonal-right"></div>
    </section>
  );
}
