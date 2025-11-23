"use client";

import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Videos", href: "#videos" },
    { label: "Contact", href: "#contact" },
    { label: "Sheet Music", href: "#sheetmusic" },
  ];

  const socialLinks = [
    { src: "/spotify.svg", alt: "Spotify", href: "https://open.spotify.com/artist/2epOrY6QkzNuFOPeBU13nS" },
    { src: "/applemusic.svg", alt: "Apple Music", href: "https://music.apple.com/us/artist/e%C4%BCzana-%C5%A1aripova/1786692183" },
    { src: "/instagram.svg", alt: "Instagram", href: "https://www.instagram.com/piterpen_69/" },
    { src: "/facebook.svg", alt: "Facebook", href: "https://www.facebook.com/profile.php?id=100048763584084" },
    { src: "/youtube.svg", alt: "YouTube", href: "https://www.youtube.com/@%D0%AD%D0%BB%D1%8C%D0%B7%D0%B0%D0%BD%D0%B0%D0%A8%D0%B0%D1%80%D0%B8%D0%BF%D0%BE%D0%B2%D0%B0" },
  ];

  return (
    <nav className="absolute top-0 left-0 w-full flex items-center justify-between py-8 px-16 text-white z-20 navbar-fade">

      {/* Left nav */}
      <div className="flex gap-8">
        {navLinks.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="transition-opacity duration-200 hover:opacity-70"
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Center title */}
      <h1 className="text-3xl font-semibold tracking-widest absolute left-1/2 -translate-x-1/2">
        ELZANA SHARIPOVA
      </h1>

      {/* Social icons */}
      <div className="flex gap-5">
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
              width={20}
              height={20}
            />
          </Link>
        ))}
      </div>

    </nav>
  );
}
