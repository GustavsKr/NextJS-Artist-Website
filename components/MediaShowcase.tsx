"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface MediaItem {
  type: "video" | "photo";
  src: string;
  caption: string;
}

export default function MediaShowcase() {
  // Only the first two items for preview
  const mediaItems: MediaItem[] = [
    {
      type: "video",
      src: "https://www.youtube.com/embed/rsOv2pgC9ik",
      caption: "Variations by Elzana",
    },
    {
      type: "video",
      src: "https://www.youtube.com/embed/9xgmC2U2154",
      caption: "Tētis Šoferis. Veltījums CSDD",
    },
  ];

  return (
    <section className="relative w-full bg-[#111] text-white py-20 scroll-mt-40">
      <div className="max-w-4xl mx-auto px-6 pb-12">
        <motion.h2
          className="text-3xl font-bold mb-10 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8}}
        >
          Performances & Compositions
        </motion.h2>

        <div className="flex flex-col gap-12">
          {mediaItems.map((item, index) => (
            <motion.div
              key={index}
              className="w-full"
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
            >
              {item.type === "video" && (
                <div className="w-full aspect-video bg-black shadow-lg rounded-none">
                  <iframe
                    src={item.src}
                    className="w-full h-full"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
              {item.type === "photo" && (
                <div className="relative w-full aspect-video shadow-lg rounded-none">
                  <Image src={item.src} alt={item.caption} fill className="object-cover" />
                </div>
              )}
              <p className="mt-2 text-center text-sm">{item.caption}</p>
            </motion.div>
          ))}
        </div>

        {/* Link to full performances page */}
        <div className="flex justify-center mt-12">
          <Link
            href="/performances"
            className="inline-block px-6 py-3 border border-white text-white bg-[#111] font-semibold transition-all duration-300 hover:bg-white hover:text-black hover:scale-[1.03] hover:shadow-[0_0_15px_rgba(0,0,0,0.6)] select-none"
          >
            View More Performances
          </Link>
        </div>
      </div>
    </section>
  );
}
