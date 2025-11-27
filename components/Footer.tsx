// components/Footer.tsx
"use client";

import SocialLinks from "./SocialLinks";

export default function Footer() {
  return (
    <footer className="w-full py-6 bg-black flex flex-col md:flex-row items-center justify-between px-6 md:px-16 text-gray-500 text-sm">
      
      {/* Copyright */}
      <div>
        © {new Date().getFullYear()} Elzana Sharipova - All Rights Reserved
      </div>

      {/* Reusable Social Links */}
      <SocialLinks size={18} className="mt-2 md:mt-0" />

    </footer>
  );
}
