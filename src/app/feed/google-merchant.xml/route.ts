import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { products } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { companyConfig } from "@/config/company";

const c = companyConfig;

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&')
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '"')
    .replace(/'/g, '&apos;');
}

async function generateFeed(): Promise<string> {
  const baseUrl = c.siteUrl?.replace(/\/$/, "") || "https://www.veloras.ch";
  const allProducts = await db
    .select()
    .from(products)
    .where(eq(products.isDraft, false))
    .all();

  const excludedProducts: string[] = [];
  const validProducts = allProducts.filter((p) => {
    if (!p.gtin && !p.mpn) {
      excludedProducts.push(`${p.id} (${p.title}) - missing GTIN/MPN`);
      return false;
    }
    if (!p.brand) {
      excludedProducts.push(`${p.id} (${p.title}) - missing brand`);
      return false;
    }
    if (!p.condition) {
      excludedProducts.push(`${p.id} (${p.title}) - missing condition`);
      return false;
    }
    if (!p.availability) {
      excludedProducts.push(`${p.id} (${p.title}) - missing availability`);
      return false;
    }
    if (!p.googleProductCategory && !p.productType) {
      excludedProducts.push(`${p.id} (${p.title}) - missing google_product_category/product_type`);
      return false;
    }
    return true;
  });

  if (excludedProducts.length > 0) {
    console.warn("[Google Merchant Feed] Excluded products:", excludedProducts);
  }

  const xmlHeader = `<?xml version="1.0" encoding="UTF-8"?>`;
  const rssOpen = `<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">`;
  const channelOpen = `<channel>`;
  const channelInfo = `
    <title>${escapeXml(c.brandName || "VELORA")}</title>
    <link>${baseUrl}</link>
    <description>${escapeXml("VELORA - Votre spécialiste vélo électrique en Suisse")}</description>
  `;

  let itemsXml = "";
  for (const product of validProducts) {
    const productUrl = `${baseUrl}/produkt/${product.id}`;
    const imageUrl = product.image ? `${baseUrl}${product.image}` : "";
    const additionalImages = product.additionalImages
      ? product.additionalImages.map((img) => `${baseUrl}${img}`)
      : [];

    const price = (product.price / 100).toFixed(2);
    const salePrice = product.priceVerified && product.compareAtPrice
      ? (product.compareAtPrice / 100).toFixed(2)
      : null;

    const availabilityMap: Record<string, string> = {
      in_stock: "in stock",
      out_of_stock: "out of stock",
      preorder: "preorder",
      backorder: "backorder",
    };
    const availability = availabilityMap[product.availability ?? "in_stock"] || "in stock";

    const conditionMap: Record<string, string> = {
      new: "new",
      used: "used",
      refurbished: "refurbished",
    };
    const condition = conditionMap[product.condition ?? "new"] || "new";

    const identifierExists = product.gtin || product.mpn ? "true" : "false";

    let item = `
      <item>
        <g:id>${escapeXml(product.id)}</g:id>
        <g:title>${escapeXml(product.title)}</g:title>
        <g:description>${escapeXml(product.description || "")}</g:description>
        <g:link>${productUrl}</g:link>
        <g:image_link>${escapeXml(imageUrl)}</g:image_link>
    `;

    for (const img of additionalImages) {
      item += `\n        <g:additional_image_link>${escapeXml(img)}</g:additional_image_link>`;
    }

    item += `
        <g:price>${price} CHF</g:price>
    `;

    if (salePrice) {
      item += `\n        <g:sale_price>${salePrice} CHF</g:sale_price>`;
    }

    item += `
        <g:availability>${availability}</g:availability>
        <g:condition>${condition}</g:condition>
        <g:brand>${escapeXml(product.brand)}</g:brand>
    `;

    if (product.gtin) {
      item += `\n        <g:gtin>${escapeXml(product.gtin)}</g:gtin>`;
    }
    if (product.mpn) {
      item += `\n        <g:mpn>${escapeXml(product.mpn)}</g:mpn>`;
    }

    item += `
        <g:identifier_exists>${identifierExists}</g:identifier_exists>
    `;

    if (product.googleProductCategory) {
      item += `\n        <g:google_product_category>${escapeXml(product.googleProductCategory)}</g:google_product_category>`;
    }
    if (product.productType) {
      item += `\n        <g:product_type>${escapeXml(product.productType)}</g:product_type>`;
    }

    item += `
        <g:shipping>
          <g:country>CH</g:country>
          <g:service>Standard</g:service>
          <g:price>0.00 CHF</g:price>
        </g:shipping>
        <g:shipping>
          <g:country>LI</g:country>
          <g:service>Standard</g:service>
          <g:price>0.00 CHF</g:price>
        </g:shipping>
    `;

    if (product.color) {
      item += `\n        <g:color>${escapeXml(product.color)}</g:color>`;
    }
    if (product.size) {
      item += `\n        <g:size>${escapeXml(product.size)}</g:size>`;
    }
    if (product.gender) {
      item += `\n        <g:gender>${escapeXml(product.gender)}</g:gender>`;
    }
    if (product.ageGroup) {
      item += `\n        <g:age_group>${escapeXml(product.ageGroup)}</g:age_group>`;
    }

    item += `\n      </item>`;
    itemsXml += item;
  }

  const channelClose = `</channel>`;
  const rssClose = `</rss>`;

  return xmlHeader + rssOpen + channelOpen + channelInfo + itemsXml + channelClose + rssClose;
}

export async function GET() {
  try {
    const xml = await generateFeed();

    return new NextResponse(xml, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch (error) {
    console.error("Error generating Google Merchant feed:", error);
    return new NextResponse("Error generating feed", { status: 500 });
  }
}