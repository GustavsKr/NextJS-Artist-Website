// app/gallery/page.tsx
import fs from "fs";
import path from "path";
import GalleryClient from "./GalleryClient";
import Navbar from "@/components/Navbar"; 

export const metadata = {
  title: "Gallery - Elzana Sharipova", 
  description: "Photo gallery of pianist and composer Elzana Sharipova",
};

export default function GalleryServer() {
  const galleryDir = path.join(process.cwd(), "public/gallery");
  let files = fs.readdirSync(galleryDir);

  // Filter out hidden files like .DS_Store
  files = files.filter((file) => !file.startsWith("."));

  // Sort numerically by filename (works for 1.jpeg, 2.jpeg, ...)
  files.sort((a, b) => {
    const numA = parseInt(a.split(".")[0], 10);
    const numB = parseInt(b.split(".")[0], 10);
    return numA - numB;
  });

  const photos = files.map((file) => ({
    src: `/gallery/${file}`,
    alt: file,
  }));

  return (
    <>
      <Navbar />
      <GalleryClient photos={photos} />
    </>
  );
}
