import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// URL Redirect Map - Old URLs to New German URLs
const redirectMap: Record<string, string> = {
  // Cart redirects
  "/panier": "/warenkorb",
  "/cart": "/warenkorb",

  // Auth redirects
  "/connexion": "/anmelden",
  "/login": "/anmelden",
  "/compte": "/konto",

  // About redirects
  "/a-propos": "/ueber-uns",
  "/about": "/ueber-uns",

  // Contact redirects
  "/contact": "/kontakt",

  // Products redirects
  "/products": "/produkte",
  "/shop": "/produkte",

  // Category redirects (French to German)
  "/categorie/ville": "/kategorie/stadt",
  "/categorie/vtc": "/kategorie/trekking",
  "/categorie/vtt": "/kategorie/mountainbike",
  "/categorie/enfants": "/kategorie/kinder",
  "/categorie/vetements": "/kategorie/bekleidung",
  "/categorie/accessoires": "/kategorie/zubehoer",

  // Legal redirects
  "/legal/agb": "/legal/terms",
  "/legal/shipping-returns": "/legal/versand-retouren",
  "/legal/privacy-policy": "/legal/privacy",
  "/legal/cookie-policy": "/legal/cookies",
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check for exact match redirect
  if (redirectMap[pathname]) {
    const newUrl = new URL(redirectMap[pathname], request.url);
    newUrl.search = request.nextUrl.search; // Preserve query params
    return NextResponse.redirect(newUrl, 301);
  }

  // Check for dynamic product redirects (if old format /produkt/... exists, keep it)
  // Our new format is already /produkt/[id] so no redirect needed

  // Check for dynamic category redirects
  if (pathname.startsWith("/categorie/")) {
    const newPath = pathname.replace("/categorie/", "/kategorie/");
    const newUrl = new URL(newPath, request.url);
    return NextResponse.redirect(newUrl, 301);
  }

  // Enforce www subdomain consistency (optional - configure based on preference)
  // const host = request.headers.get("host");
  // if (host && !host.startsWith("www.") && host.includes("veloras.ch")) {
  //   const newUrl = new URL(request.url);
  //   newUrl.host = `www.${host}`;
  //   return NextResponse.redirect(newUrl, 301);
  // }

  // Security headers
  const response = NextResponse.next();

  // Add security headers
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), payment=(self)"
  );

  // HSTS (only in production)
  if (process.env.NODE_ENV === "production") {
    response.headers.set(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains; preload"
    );
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public|img|robots.txt|sitemap.xml|feed).*)",
  ],
};