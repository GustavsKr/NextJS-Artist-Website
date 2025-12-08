import type { Metadata } from "next";
import { Roboto_Slab } from "next/font/google";
import "./globals.css";

const montserrat = Roboto_Slab({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Elzana Sharipova",
  description: "Official artist website of Elzana Sharipova",
  keywords: ["Elzana Sharipova", "Eļzana Šaripova", "Эльзана Шарипова", "Portfolio", "Pianist", "Composer", "Artist", "Music"],
  authors: [{ name: "Elzana Sharipova" }],
  creator: "Elzana Sharipova",
  openGraph: {
    title: "Elzana Sharipova",
    description: "Official artist website of Elzana Sharipova",
    url: "https://elzanasharipova.com",
    siteName: "Elzana Sharipova",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
