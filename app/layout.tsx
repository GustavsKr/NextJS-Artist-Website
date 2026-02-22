import type { Metadata } from "next";
import { Roboto_Slab } from "next/font/google";
import "./globals.css";

const montserrat = Roboto_Slab({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Eļzana Šaripova",
  description: "Official artist website of Eļzana Šaripova",
  keywords: ["Eļzana Šaripova", "Eļzana Šaripova", "Эльзана Шарипова", "Portfolio", "Pianist", "Composer", "Artist", "Music"],
  authors: [{ name: "Eļzana Šaripova" }],
  creator: "Eļzana Šaripova",
  openGraph: {
    title: "Eļzana Šaripova",
    description: "Official artist website of Eļzana Šaripova",
    url: "https://elzanasaripova.com",
    siteName: "Eļzana Šaripova",
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
