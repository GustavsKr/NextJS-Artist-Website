"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const socialLinks = [
    { src: "/svg/spotify.svg", alt: "Spotify", href: "https://open.spotify.com/artist/2epOrY6QkzNuFOPeBU13nS" },
    { src: "/svg/applemusic.svg", alt: "Apple Music", href: "https://music.apple.com/us/artist/e%C4%BCzana-%C5%A1aripova/1786692183" },
    { src: "/svg/instagram.svg", alt: "Instagram", href: "https://www.instagram.com/piterpen_69/" },
    { src: "/svg/facebook.svg", alt: "Facebook", href: "https://www.facebook.com/profile.php?id=100048763584084" },
    { src: "/svg/youtube.svg", alt: "YouTube", href: "https://www.youtube.com/@%D0%AD%D0%BB%D1%8C%D0%B7%D0%B0%D0%BD%D0%B0%D0%A8%D0%B0%D1%80%D0%B8%D0%BF%D0%BE%D0%B2%D0%B0" },
  ];

  return (
    <footer className="w-full py-6 bg-black flex flex-col md:flex-row items-center justify-between px-6 md:px-16 text-gray-500 text-sm">
      
      {/* Copyright */}
      <div>© {new Date().getFullYear()} Elzana Sharipova - All Rights Reserved</div>

      {/* Social icons on right */}
      <div className="flex gap-3 mt-2 md:mt-0">
        {socialLinks.map((item, i) => (
          <Link
            key={i}
            href={item.href}
            target="_blank"
            className="transition-opacity duration-200 hover:opacity-70"
          >
            <Image
              src={item.src}
              alt={item.alt}
              width={18} // smaller than navbar
              height={18}
              className="select-none"
            />
          </Link>
        ))}
      </div>

    </footer>
  );
}
