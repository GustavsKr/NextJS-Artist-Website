"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useState } from "react";
import { Clipboard, Check } from "lucide-react";

export default function ContactPage() {
  const [copied, setCopied] = useState(false);

  const email = "elzana300604@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500); // revert to normal after 1.5s
  };

  return (
    <main className="w-full min-h-screen bg-[#111] text-white flex flex-col">
      <Navbar />

      <section className="flex-1 flex items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-black/50 backdrop-blur-md p-10 md:p-16 rounded-3xl shadow-xl max-w-md w-full flex flex-col items-center gap-6"
        >
          <h1 className="text-2xl md:text-3xl font-bold">Get in Touch</h1>

          <p className="text-sm md:text-base text-gray-300">
            For collaborations, sheet music, or general inquiries, click the button below to copy my email.
          </p>

          <motion.button
            onClick={handleCopy}
            layout // enables smooth size animation
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#222] hover:bg-[#333] transition-colors duration-300 shadow-md cursor-pointer text-gray-200"
          >
            {copied ? (
              <motion.div
                key="copied"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-2"
              >
                <Check className="w-5 h-5" />
                <span className="font-medium">Copied!</span>
              </motion.div>
            ) : (
              <motion.div
                key="copy"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-2"
              >
                <Clipboard className="w-5 h-5" />
                <span className="font-medium">Copy Email</span>
              </motion.div>
            )}
          </motion.button>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
