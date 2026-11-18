import { NextResponse } from "next/server";
import { companyConfig } from "@/config/company";

const c = companyConfig;
const baseUrl = c.siteUrl.replace(/\/$/, "");

export async function GET() {
  const staticPages = [
    "",
    "/produkte",
    "/kategorie",
    "/kategorie/stadt",
    "/kategorie/trekking",
    "/kategorie/mountainbike",
    "/kategorie/zubehoer",
    "/kategorie/bekleidung",
    "/kategorie/kinder",
    "/warenkorb",
    "/wunschliste",
    "/anmelden",
    "/konto",
    "/ueber-uns",
    "/kontakt",
    "/legal/impressum",
    "/legal/terms",
    "/legal/privacy",
    "/legal/cookies",
    "/legal/versand-retouren",
  ];

  // Add product URLs from data (in production, fetch from DB)
  // For now, we'll include the static pages. Dynamic products would be fetched from DB.
  const allUrls = staticPages;

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  ${allUrls
    .map((path) => {
      const url = `${baseUrl}${path}`;
      const lastmod = new Date().toISOString().split("T")[0];
      const changefreq = path === "" ? "daily" : path.startsWith("/kategorie") ? "weekly" : "monthly";
      const priority = path === "" ? "1.0" : path.startsWith("/kategorie") || path === "/produkte" ? "0.8" : "0.6";

      return `
    <url>
      <loc>${url}</loc>
      <lastmod>${lastmod}</lastmod>
      <changefreq>${changefreq}</changefreq>
      <priority>${priority}</priority>
      <xhtml:link rel="alternate" hreflang="de-CH" href="${url}" />
      <xhtml:link rel="alternate" hreflang="x-default" href="${url}" />
    </url>`;
    })
    .join("")}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}