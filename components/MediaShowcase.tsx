"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface MediaItem {
  type: "video" | "photo" | "spotify";
  src: string;
  caption: string;
}

export default function MediaShowcase() {
  const [showAll, setShowAll] = useState(false);

  const mediaItems: MediaItem[] = [
    {
      type: "video",
      src: "https://www.youtube.com/embed/rsOv2pgC9ik",
      caption: "Amazing Performance 1",
    },
    {
      type: "video",
      src: "https://www.youtube.com/embed/rBntxrDS93A",
      caption: "Collaboration with XYZ",
    },
    {
      type: "photo",
      src: "/album.jpg",
      caption: "Elzana Sharipova at Album Recording",
    },
    {
      type: "photo",
      src: "/hero.jpg",
      caption: "Elzana Sharipova at Concert Hall",
    },
    {
      type: "video",
      src: "https://www.youtube.com/embed/9xgmC2U2154",
      caption: "Live Performance in Riga",
    },
    {
      type: "video",
      src: "https://www.youtube.com/embed/1JpGFNcYRwo",
      caption: "Original Composition Premiere",
    },
    {
      type: "video",
      src: "https://www.youtube.com/embed/1JpGFNcYRwo",
      caption: "Original Composition Premiere",
    },
    {
      type: "photo",
      src: "/album.jpg",
      caption: "Elzana Sharipova at Concert Hall",
    },
    {
      type: "video",
      src: "https://www.youtube.com/embed/rsOv2pgC9ik",
      caption: "Live Performance in Riga",
    },
  ];

  const displayedItems = showAll ? mediaItems : mediaItems.slice(0, 6);

  return (
    <section className="relative w-full bg-neutral-900 text-white py-20 scroll-mt-40">
      <div className="max-w-6xl mx-auto px-6 pb-12">
        <h2 className="text-3xl font-bold mb-10">Performances & Compositions</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {displayedItems.map((item, index) => (
              <motion.div
                key={index}
                className="flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                {item.type === "video" && (
                  <div className="aspect-video bg-black rounded-lg shadow-lg">
                    <iframe
                      src={item.src}
                      className="w-full h-full"
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
                {item.type === "photo" && (
                  <div className="relative w-full aspect-video rounded-lg shadow-lg">
                    <Image
                      src={item.src}
                      alt={item.caption}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                {item.type === "spotify" && (
                  <div className="aspect-video rounded-lg shadow-lg">
                    <iframe
                      src={item.src}
                      className="w-full h-full"
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                    ></iframe>
                  </div>
                )}
                <p className="mt-2 text-center text-sm">{item.caption}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* View More / Collapse Link */}
        {mediaItems.length > 6 && (
        <div className="flex justify-center mt-8">
            <span
            onClick={() => setShowAll(!showAll)}
            className="font-bold underline cursor-pointer"
            >
            {showAll ? "View Less" : "View More"}
            </span>
        </div>
        )}

      </div>
    </section>
  );
}
