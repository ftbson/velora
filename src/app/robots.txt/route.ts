import { NextResponse } from "next/server";
import { companyConfig } from "@/config/company";

const c = companyConfig;
const siteUrl = c.siteUrl.replace(/\/$/, "");

export async function GET() {
  const robots = `# robots.txt for ${c.brandName}
# Generated automatically - do not edit manually

User-agent: *
Allow: /

# Disallow admin and private areas
Disallow: /admin/
Disallow: /api/
Disallow: /warenkorb
Disallow: /wunschliste
Disallow: /anmelden
Disallow: /konto
Disallow: /kasse
Disallow: /checkout
Disallow: /suche

# Sitemap
Sitemap: ${siteUrl}/sitemap.xml

# Host
Host: ${siteUrl.replace(/^https?:\/\//, "")}
`;

  return new NextResponse(robots, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}