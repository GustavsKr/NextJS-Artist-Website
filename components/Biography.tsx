"use client";

import { motion } from "framer-motion";

export default function Biography({ id }: { id?: string }) {
  return (
    <section id={id} className="relative w-full bg-neutral-900">
      <div className="max-w-6xl mx-auto px-6 py-16 pb-40 flex flex-col md:flex-row items-center gap-8">
        {/* Left: Spotify album embed */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="w-full max-w-[400px] aspect-square md:aspect-auto">
            <iframe
              src="https://open.spotify.com/embed/album/3REQNyNlUNAT6W6YZKDjIv?utm_source=generator&theme=1"
              width="100%"
              height="380"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="rounded-lg shadow-lg"
            ></iframe>
          </div>
        </div>

        {/* Right: Biography text */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="w-full md:w-1/2"
        >
          <h2 className="text-2xl font-bold mb-4 text-white">Biography</h2>
          <p className="text-lg leading-relaxed text-white">
            A pianist whose fingers live on the keys and soul thrives on the road. 
            I love rhythms, harmonies, and humor in music - because what’s a concert 
            without a smile? Inspired by jazz, classical tunes, and my fridge 
            (especially at night). Always chasing new notes to rock the stage and 
            hearts of listeners.
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illum, minus perferendis? Quia totam unde vel quam debitis accusantium, alias molestias cumque quod qui omnis ipsa velit! Aliquid autem est, mollitia cum nesciunt aut velit voluptatibus, officia qui consequatur reiciendis nobis incidunt quas, ab nemo voluptate? Maiores nobis sapiente rem corporis.
          </p>
        </motion.div>
      </div>
      
      {/* Bottom diagonal */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-[#eaeaea] clip-diagonal-right"></div>
    </section>
  );
}
