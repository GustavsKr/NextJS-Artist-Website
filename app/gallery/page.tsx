// app/gallery/page.tsx
import fs from "fs";
import path from "path";
import GalleryClient from "./GalleryClient";

export const metadata = {
  title: "Gallery - Elzana Sharipova",
  description: "Photo gallery of pianist and composer Elzana Sharipova",
};

export default function GalleryServer() {
  const galleryDir = path.join(process.cwd(), "public/gallery");
  let files = fs.readdirSync(galleryDir);

  // Filter out hidden files like .DS_Store
  files = files.filter((file) => !file.startsWith("."));

  const photos = files.map((file) => ({
    src: `/gallery/${file}`,
    alt: file,
  }));

  return (
    <>
      <GalleryClient photos={photos} />
    </>
  );
}
