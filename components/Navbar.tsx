"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import SocialLinks from "./SocialLinks";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: "About", href: "/about" },
    { label: "Performances", href: "/performances" },
    { label: "Gallery", href: "/gallery" },
  ];

  // Disable body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <nav className="w-full text-white z-40 px-6 sm:px-12">
      <div className="flex items-center justify-between py-10 relative">
        {/* LEFT: Hamburger / Desktop nav */}
        <div className="flex items-center gap-6 xl:gap-10">
          {/* Hamburger / Menu SVG */}
          <button
            className="xl:hidden relative z-50"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <motion.svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              animate={{ rotate: menuOpen ? 180 : 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 xl:w-14 xl:h-14"
            >
              <rect x="3" y="5" width="18" height="2" rx="1" fill="currentColor" />
              <rect x="3" y="11" width="18" height="2" rx="1" fill="currentColor" />
              <rect x="3" y="17" width="18" height="2" rx="1" fill="currentColor" />
            </motion.svg>
          </button>

          {/* Desktop nav links */}
          <div className="hidden xl:flex gap-10 2xl:text-l">
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
        </div>

        {/* CENTER: Title */}
        <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
          <Link
            href="/"
            className="text-2xl pt-0 sm:text-3xl md:text-4xl xl:text-4xl 2xl:text-4xl font-semibold tracking-widest text-center
                       [@media(min-width:1024px) and (max-width:1366px)]:text-[5.5rem]"
          >
            <span className="block sm:inline">ELZANA </span>
            <span className="block sm:inline">SHARIPOVA</span>
          </Link>

          {/* Social icons for mobile/tablet under title */}
          <div className="xl:hidden mt-3
                          [@media(min-width:1024px) and (max-width:1366px)]:mt-5
                          [@media(min-width:1024px) and (max-width:1366px)]:gap-7">
            <SocialLinks size={24} className="flex gap-5" />
          </div>
        </div>

        {/* RIGHT: Desktop social icons */}
        <div className="hidden xl:flex gap-5 z-20">
          <SocialLinks size={22} className="flex gap-6" />
        </div>
      </div>

      {/* Fullscreen mobile/tablet menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-30 flex flex-col items-center justify-center text-3xl gap-12"
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="hover:opacity-70 transition-opacity duration-200"
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
