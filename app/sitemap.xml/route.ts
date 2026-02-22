// app/sitemap.xml/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = "https://elzanasaripova.com";

  // list all static pages
  const urls = [
    { path: "", priority: 1.0 },           // homepage
    { path: "/about", priority: 1.0 },
    { path: "/gallery", priority: 0.8 },
    { path: "/performances", priority: 0.8 },
    { path: "/etudes", priority: 0.8 },
  ];

  // generate XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
    .map(
      ({ path, priority }) => `
  <url>
    <loc>${baseUrl}${path}</loc>
    <priority>${priority}</priority>
  </url>`
    )
    .join("")}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
