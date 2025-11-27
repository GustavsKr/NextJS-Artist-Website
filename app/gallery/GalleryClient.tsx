// app/gallery/GalleryClient.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar"; 


interface Photo {
  src: string;
  alt: string;
}

export default function GalleryClient({ photos }: { photos: Photo[] }) {
  return (
    <section className="w-full bg-[#111] text-white">
      <Navbar />
      {/* Masonry container */}
      <div
        className="
          max-w-7xl mx-auto 
          columns-1 lg:columns-2 
          gap-25
          py-24 
          px-6 lg:px-0
        "
      >        
      {photos.map((photo, index) => (
          <motion.div
            key={index}
            className="mb-25 break-inside-avoid"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, delay: index * 0.05 }}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              width={800}
              height={1200}
              className="w-full h-auto object-cover"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
