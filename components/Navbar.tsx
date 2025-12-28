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
    { label: "Contact", href: "/contact" },
  ];

  // Lock scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Close menu on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <nav className="w-full text-white z-40 px-6 sm:px-12 md:pt-5 xl:pt-1">
      <div className="flex items-center justify-between py-10 relative">
        {/* LEFT: Hamburger / Desktop Nav */}
        <div className="flex items-center gap-6 xl:gap-10">
          {/* Hamburger */}
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
              animate={{ rotate: menuOpen ? 180 : 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 xl:w-14 xl:h-14"
            >
              <rect x="3" y="5" width="18" height="2" rx="1" fill="currentColor" />
              <rect x="3" y="11" width="18" height="2" rx="1" fill="currentColor" />
              <rect x="3" y="17" width="18" height="2" rx="1" fill="currentColor" />
            </motion.svg>
          </button>

          {/* Desktop nav links */}
          <div className="hidden xl:flex gap-8 text-md">
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
        </div>

        {/* CENTER: Title */}
        <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
          <Link
            href="/"
            className="text-2xl pt-0 sm:text-3xl md:text-4xl xl:text-3xl font-semibold tracking-widest text-center"
          >
            <span className="block sm:inline">ELZANA </span>
            <span className="block sm:inline">SHARIPOVA</span>
          </Link>

          {/* Mobile/Tablet social icons */}
          <div className="xl:hidden mt-3 md:mt-5 md:gap-7">
            <SocialLinks size={24} className="flex gap-5" />
          </div>
        </div>

        {/* RIGHT: Desktop social icons */}
        <div className="hidden xl:flex z-20">
          <SocialLinks size={20} className="flex gap-6" />
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            {/* Background overlay */}
            <div
              className="absolute inset-0 bg-black/90"
              onClick={() => setMenuOpen(false)}
            />

            {/* Centered menu links */}
            <motion.div
              className="relative z-40 flex flex-col items-center justify-center min-h-screen gap-12 pointer-events-none"
              initial={{ y: -100 }}
              animate={{ y: 0 }}
              exit={{ y: -100 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-3xl hover:opacity-70 transition-opacity duration-200 pointer-events-auto"
                >
                  {item.label}
                </Link>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </nav>
  );
}
