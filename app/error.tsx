// app/error.tsx
"use client";

import { useEffect } from "react";
import Navbar from "@/components/Navbar"; // adjust the path if needed

export default function Error({ error }: { error: Error }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="w-full min-h-screen flex flex-col bg-[#111] text-white">
      <Navbar />
      <section className="flex flex-col items-center justify-center flex-1 text-center p-4">
        <h1 className="text-[5rem] font-bold mb-4">Something went wrong</h1>
        <p className="text-lg mb-6">
          An unexpected error occurred. Please try again later.
        </p>
      </section>
    </main>
  );
}
