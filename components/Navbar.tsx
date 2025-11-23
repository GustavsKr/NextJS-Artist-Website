"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, Youtube, Facebook, Music } from "lucide-react";

export default function Navbar() {
  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Videos", href: "#videos" },
    { label: "Contact", href: "#contact" },
    { label: "Sheet Music", href: "#sheetmusic" },
  ];

  const socialLinks = [
      {
          icon: (
        <Image
          src="/spotify.svg"
          alt="Spotify"
          width={22}
          height={22}
          />
        ),
        href: "#",
    },
    { icon: <Music size={22} />, href: "#" },
    { icon: <Instagram size={22} />, href: "#" },
    { icon: <Facebook size={22} />, href: "#" },
    { icon: <Youtube size={22} />, href: "#" },
  ];

  return (
    <nav className="absolute top-0 left-0 w-full flex items-center justify-between py-8 px-16 text-white z-20 navbar-fade">

      {/* Left nav */}
      <div className="flex gap-8">
        {navLinks.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="transition-colors duration-200 hover:text-gray-300"
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Center title */}
      <h1 className="text-3xl font-semibold tracking-widest absolute left-1/2 -translate-x-1/2 transition-colors duration-200">
        ELZANA SHARIPOVA
      </h1>

      {/* Social icons */}
      <div className="flex gap-5">
        {socialLinks.map((item, i) => (
          <Link
            key={i}
            href={item.href}
            target="_blank"
            className="transition-colors duration-200 hover:text-gray-300"
          >
            {item.icon}
          </Link>
        ))}
      </div>

    </nav>
  );
}
