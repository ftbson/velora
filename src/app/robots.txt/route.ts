import { NextResponse } from "next/server";
import { companyConfig } from "@/config/company";

const c = companyConfig;
const baseUrl = c.siteUrl.replace(/\/$/, "");

export async function GET() {
  const robots = `# robots.txt for ${c.brandName}
# Generated automatically

User-agent: *
Allow: /

# Disallow private/admin areas
Disallow: /admin/
Disallow: /api/
Disallow: /konto/
Disallow: /warenkorb
Disallow: /wunschliste
Disallow: /anmelden
Disallow: /kasse
Disallow: /kasse/

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Host
Host: www.veloras.ch
`;

  return new NextResponse(robots, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}