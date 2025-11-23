"use client";

export default function Contact() {
  return (
    <section id="contact" className="relative w-full bg-white text-black py-24">

      {/* Top diagonal */}
      <div className="absolute top-0 w-full h-24 bg-white clip-diagonal-top-alt"></div>

      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">Contact</h2>

        <p className="text-lg mb-6">
          For bookings, collaborations or sheet music inquiries:
        </p>

        <a
          href="mailto:your-email@example.com"
          className="text-xl font-semibold underline underline-offset-4"
        >
          your-email@example.com
        </a>
      </div>

    </section>
  );
}
