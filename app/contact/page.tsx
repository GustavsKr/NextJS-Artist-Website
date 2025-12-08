"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ContactPage() {
  const [copied, setCopied] = useState(false);

  // split email into parts
  const emailParts = ["elzana300604", "@", "gmail.com"];
  const email = emailParts.join("");

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
  };
  return (
    <main className="w-full min-h-screen bg-[#111] text-white flex flex-col">
      <Navbar />

      <section className="flex-1 flex items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="bg-black/70 backdrop-blur-md p-12 rounded-2xl shadow-xl max-w-lg w-full cursor-pointer"
          onClick={handleCopy}
        >
          <p className="text-lg md:text-xl leading-relaxed">
            For collaborations, sheet music, or general inquiries, you can reach me at:
          </p>

          <p className="mt-6 text-lg md:text-xl font-semibold text-white underline">
            {email}
          </p>

          {copied && (
            <p className="mt-2 text-sm text-green-400 animate-fadeIn">
              Email copied to clipboard!
            </p>
          )}
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
