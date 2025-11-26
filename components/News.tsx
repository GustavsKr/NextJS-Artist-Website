"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function News() {
  return (
    <section className="relative w-full bg-[#eaeaea] scroll-mt-[120]">
      <div className="max-w-6xl mx-auto px-6 py-16 pb-40 flex flex-col md:flex-row items-center gap-8">

        {/* IMAGE – fades in first */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0 }}
          viewport={{ once: true }}
          className="w-full md:w-1/2 flex justify-center"
        >
          <div className="w-full max-w-[400px]">
            <Image
              src="/album.jpg"
              alt="Etudes by Elzana album cover"
              width={400}
              height={400}
              className="object-cover shadow-lg"
            />
          </div>
        </motion.div>

        {/* TEXT – fades in AFTER the image */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          viewport={{ once: true }}
          className="w-full md:w-1/2"
        >
          <h2 className="text-2xl font-bold mb-4 text-black">ETUDES BY ELZANA</h2>

          <p className="text-lg leading-relaxed text-black mb-6">
            A collection of four original piano études, each crafted to blend technical mastery with expressive storytelling.
            Out now on all music platforms!
          </p>

          {/* BUTTON */}
          <a
            href="https://open.spotify.com/album/3REQNyNlUNAT6W6YZKDjIv"
            target="_blank"
            className="
              inline-block
              px-6 py-3
              border border-black
              text-black
              bg-[#eaeaea]
              font-semibold
              transition-all duration-300
              hover:bg-black hover:text-white
              hover:scale-[1.03]
              hover:shadow-[0_0_15px_rgba(0,0,0,0.4)]
              select-none
            "
          >
            Listen Now
          </a>
        </motion.div>

      </div>

      {/* Bottom diagonal */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-neutral-900 clip-diagonal-right"></div>
    </section>
  );
}
