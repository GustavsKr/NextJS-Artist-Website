"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "ETUDES BY ELZANA",
  description: "Newest release of pianist and composer Elzana Sharipova",
};

export default function Compositions() {
  return (
    <main className="relative w-full min-h-screen bg-black overflow-hidden text-white">

      {/* TOP LEFT BACK BUTTON */}
      <Link
        href="/"
        className="
          absolute top-6 left-6 z-50 
          p-3 rounded-full backdrop-blur-md
          border border-white/20
          hover:bg-white/10 
          transition-all duration-300
          hover:scale-110
        "
      >
        {/* SVG Arrow */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </Link>

      {/* BACKGROUND — Blur using Tailwind */}
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className="absolute inset-0 w-full h-full overflow-hidden"
      >
        <Image
          src="/album.jpg"
          alt="Blurred Etudes Background"
          fill
          priority
          className="
            object-cover 
            blur-xl 
            opacity-50 
            scale-110 
            brightness-[0.5]
          "
        />
      </motion.div>

      {/* DARK VIGNETTE OVERLAY */}
      <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/40 to-black/90 z-10"></div>

      {/* CONTENT */}
      <section className="relative z-20 flex flex-col items-center justify-center min-h-screen text-center px-6">

        {/* Album Cover */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative"
        >
          <div className="absolute -inset-6 bg-white/10 blur-2xl rounded-xl opacity-50 animate-pulse"></div>

          <Image
            src="/album.jpg"
            alt="Etudes by Elzana"
            width={420}
            height={420}
            className="relative z-10 shadow-2xl rounded-xl object-cover"
          />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-10 text-4xl md:text-6xl font-bold tracking-wide"
        >
          ETUDES BY ELZANA
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-4 text-lg md:text-xl max-w-2xl leading-relaxed text-gray-200"
        >
          Four original piano études blending expressive artistry with technical mastery.
          A cinematic journey into the mind of a modern composer.
        </motion.p>

        {/* Button */}
        <motion.a
          href="https://open.spotify.com/album/3REQNyNlUNAT6W6YZKDjIv"
          target="_blank"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="
            relative mt-10 px-10 py-4 text-lg font-semibold border border-white 
            rounded-full overflow-hidden
            transition-all duration-200
            hover:scale-105
            hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]
          "
        >
          <span className="relative z-20">Listen Now</span>

          {/* Spotlight effect */}
          <span
            className="
              absolute inset-0 bg-linear-to-r from-white/10 to-white/0 
              -translate-x-full hover:translate-x-full
              transition-transform duration-700 ease-out
            "
          />
        </motion.a>
      </section>

      {/* Bottom animated border */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-white/40 to-transparent animate-pulse"></div>
      
    </main>
  );
}
