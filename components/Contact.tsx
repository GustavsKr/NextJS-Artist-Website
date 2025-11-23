"use client";

export default function Contact({ id }: { id?: string }) {
  return (
    <section id={id} className="relative w-full bg-white text-black py-20">
      {/* Top diagonal */}
      <div className="absolute top-0 w-full h-20 bg-white clip-diagonal-top-alt"></div>

      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">Contact</h2>

        <p className="text-lg mb-6">
          For bookings, collaborations or sheet music inquiries:
        </p>

        <a
          href="mailto:elzana300604@gmail.com"
          className="text-xl font-semibold underline underline-offset-4"
        >
          elzana300604@gmail.com
        </a>
      </div>

    </section>
  );
}
