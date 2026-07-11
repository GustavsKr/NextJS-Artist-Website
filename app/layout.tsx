import type { Metadata } from "next";
import { Bodoni_Moda } from "next/font/google";
import "./globals.css";

const bodoniModa = Bodoni_Moda({
  subsets: ['latin'],
  display: 'swap',
  style: ['normal', 'italic']
})
export const metadata: Metadata = {
  title: "Eļzana Šaripova",
  description: "Official artist website of Eļzana Šaripova",
  keywords: ["Eļzana Šaripova", "Elzana Sharipova", "Эльзана Шарипова", "Portfolio", "Pianist", "Composer", "Artist", "Music"],
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
      <body className={`${bodoniModa.className} overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
