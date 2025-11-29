// app/about/page.tsx

import Navbar from "@/components/Navbar";

export default function NotFound() {
  return (
    <>
      <main className="w-full min-h-screen bg-[#111] text-white flex flex-col">
        <Navbar />
        <section className="flex flex-col items-center justify-center flex-1 text-center px-4">
          <h1 className="text-[6rem] font-bold mb-4">404</h1>
          <p className="text-xl md:text-2xl mb-6">
            Oops! The page you are looking for does not exist.
          </p>
        </section>
      </main>
    </>
  );
}
