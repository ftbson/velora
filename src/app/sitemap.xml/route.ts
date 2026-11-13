import { NextResponse } from "next/server";
import { productsData } from "@/data/products";
import { companyConfig, getSiteUrl } from "@/config/company";

const c = companyConfig;
const siteUrl = c.siteUrl.replace(/\/$/, "");

const staticRoutes = [
  { path: "", changefreq: "daily", priority: 1.0 },
  { path: "/produkte", changefreq: "daily", priority: 0.9 },
  { path: "/kategorie", changefreq: "weekly", priority: 0.8 },
  { path: "/kategorie/ville", changefreq: "weekly", priority: 0.7 },
  { path: "/kategorie/vtc", changefreq: "weekly", priority: 0.7 },
  { path: "/kategorie/vtt", changefreq: "weekly", priority: 0.7 },
  { path: "/kategorie/enfants", changefreq: "weekly", priority: 0.7 },
  { path: "/kategorie/vetements", changefreq: "weekly", priority: 0.7 },
  { path: "/kategorie/accessoires", changefreq: "weekly", priority: 0.7 },
  { path: "/warenkorb", changefreq: "monthly", priority: 0.3 },
  { path: "/wunschliste", changefreq: "monthly", priority: 0.3 },
  { path: "/anmelden", changefreq: "monthly", priority: 0.3 },
  { path: "/konto", changefreq: "monthly", priority: 0.3 },
  { path: "/ueber-uns", changefreq: "monthly", priority: 0.6 },
  { path: "/kontakt", changefreq: "monthly", priority: 0.5 },
  { path: "/legal/impressum", changefreq: "yearly", priority: 0.4 },
  { path: "/legal/terms", changefreq: "yearly", priority: 0.4 },
  { path: "/legal/versand-retouren", changefreq: "yearly", priority: 0.5 },
  { path: "/legal/privacy", changefreq: "yearly", priority: 0.4 },
  { path: "/legal/cookies", changefreq: "yearly", priority: 0.3 },
];

export async function GET() {
  const today = new Date().toISOString().split("T")[0];

  // Product URLs
  const productUrls = productsData
    .filter((p) => !p.isDraft)
    .map((product) => ({
      url: `${siteUrl}/produkt/${product.id}`,
      lastmod: today,
      changefreq: "weekly" as const,
      priority: 0.8,
    }));

  // Static page URLs
  const staticUrls = staticRoutes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastmod: today,
    changefreq: route.changefreq,
    priority: route.priority,
  }));

  const allUrls = [...staticUrls, ...productUrls];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${allUrls
  .map((url) => {
    const product = productsData.find((p) => `/produkt/${p.id}` === new URL(url.url).pathname);
    const imageXml = product && product.image
      ? `    <image:image>
      <image:loc>${siteUrl}${product.image}</image:loc>
      <image:title>${escapeXml(product.title)}</image:title>
    </image:image>`
      : "";
    return `  <url>
    <loc>${escapeXml(url.url)}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority.toFixed(1)}</priority>
${imageXml}
  </url>`;
  })
  .join("\n")}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&')
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '"')
    .replace(/'/g, '&apos;');
}