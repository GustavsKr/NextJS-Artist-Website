"use client";

import Link from "next/link";
import SocialLinks from "./SocialLinks";

export default function Navbar() {
  const navLinks = [
    { label: "About", href: "/about" },
    { label: "Performances", href: "/performances" },
    { label: "Gallery", href: "/gallery" },
  ];

  return (
    <nav className="absolute top-0 left-0 w-full py-10 px-8 sm:px-16 text-white z-20">
      <div className="relative w-full flex items-center justify-between">

        {/* Left nav links (desktop only) */}
        <div className="hidden md:flex gap-8 z-10">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="transition-opacity duration-200 hover:opacity-70 cursor-pointer"
            >
              {item.label}
            </Link>
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
        <SocialLinks size={20} className="hidden md:flex gap-5 z-10" />

      </div>
    </nav>
  );
}
