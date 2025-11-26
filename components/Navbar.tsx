"use client";

import Image from "next/image";
import Link from "next/link"

export default function Navbar() {
  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Gallery", href: "gallery" },
    { label: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    { src: "/svg/spotify.svg", alt: "Spotify", href: "https://open.spotify.com/artist/2epOrY6QkzNuFOPeBU13nS" },
    { src: "/svg/applemusic.svg", alt: "Apple Music", href: "https://music.apple.com/us/artist/e%C4%BCzana-%C5%A1aripova/1786692183" },
    { src: "/svg/instagram.svg", alt: "Instagram", href: "https://www.instagram.com/piterpen_69/" },
    { src: "/svg/facebook.svg", alt: "Facebook", href: "https://www.facebook.com/profile.php?id=100048763584084" },
    { src: "/svg/youtube.svg", alt: "YouTube", href: "https://www.youtube.com/@%D0%AD%D0%BB%D1%8C%D0%B7%D0%B0%D0%BD%D0%B0%D0%A8%D0%B0%D1%80%D0%B8%D0%BF%D0%BE%D0%B2%D0%B0" },
  ];

  return (
    <nav className="absolute top-0 left-0 w-full py-10 px-8 sm:px-16 text-white z-20">
      <div className="relative w-full flex items-center justify-between">

        {/* Left nav links (desktop only) */}
        <div className="hidden md:flex gap-8 z-10">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}     // ← no onClick at all
              className="transition-opacity duration-200 hover:opacity-70 cursor-pointer"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Center title */}
        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 text-center text-2xl sm:text-3xl 
                    font-semibold tracking-widest top-4 sm:top-1/2 sm:-translate-y-1/2 
                    z-0 cursor-pointer"
        >
          <span className="block sm:inline">ELZANA </span>
          <span className="block sm:inline">SHARIPOVA</span>
        </Link>

        {/* Social icons (desktop only) */}
        <div className="hidden md:flex gap-5 z-10">
          {socialLinks.map((item, i) => (
            <a
              key={i}
              href={item.href}
              target="_blank"
              className="transition-opacity duration-200 hover:opacity-70"
            >
              <Image src={item.src} alt={item.alt} width={20} height={20} />
            </a>
          ))}
        </div>

      </div>
    </nav>
  );
}
