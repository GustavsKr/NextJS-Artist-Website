// app/performances/page.tsx
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Performances - Elzana Sharipova", 
  description: "Collection of video performances by pianist and composer Elzana Sharipova",
};

interface MediaItem {
  src: string;
  caption: string;
}

// Only YouTube videos
const mediaItems: MediaItem[] = [
  {
    src: "https://www.youtube.com/embed/rsOv2pgC9ik",
    caption: "Amazing Performance 1",
  },
  {
    src: "https://www.youtube.com/embed/rBntxrDS93A",
    caption: "Collaboration with XYZ",
  },
  {
    src: "https://www.youtube.com/embed/9xgmC2U2154",
    caption: "Live Performance in Riga",
  },
  {
    src: "https://www.youtube.com/embed/1JpGFNcYRwo",
    caption: "Original Composition Premiere",
  },
  // add more YouTube videos here
];

export default function PerformancesPage() {
  return (
    <>
      <Navbar />
      <main className="w-full bg-neutral-900 text-white py-45">
        <div className="max-w-4xl mx-auto px-6 pb-12">

          <div className="flex flex-col gap-12">
            {mediaItems.map((item, index) => (
              <div key={index} className="w-full">
                <div className="w-full aspect-video bg-black shadow-lg rounded-none">
                  <iframe
                    src={item.src}
                    className="w-full h-full"
                    allowFullScreen
                  ></iframe>
                </div>
                <p className="mt-2 text-center text-sm">{item.caption}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
