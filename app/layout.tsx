import type { Metadata } from "next";
import { Roboto_Slab } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer"; // ⬅ adjust the path

const montserrat = Roboto_Slab({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Elzana Sharipova",
  description: "Official artist website of Elzana Sharipova",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
