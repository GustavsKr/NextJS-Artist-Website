// app/error.tsx
"use client";

import { useEffect } from "react";

export default function Error({ error }: { error: Error }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center bg-[#111] text-white text-center p-4">
      <h1 className="text-[5rem] font-bold mb-4">Something went wrong</h1>
      <p className="text-lg mb-6">
        An unexpected error occurred. Please try again later.
      </p>
    </main>
  );
}
