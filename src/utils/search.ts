import {
  type Product,
  getProductCategoryName,
  getProductSubcategoryName,
} from "@/data/products";

/**
 * Remove accents and normalize string for robust search
 */
export function normalizeSearchText(text: string): string {
  return (text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ä/g, "a")
    .replace(/ö/g, "o")
    .replace(/ü/g, "u")
    .replace(/ß/g, "ss")
    .trim();
}

/**
 * Filter and score products by a multi-keyword query
 */
export function searchProducts(query: string, products: Product[]): Product[] {
  const trimmed = query.trim();
  if (!trimmed) return products;

  const normalizedQuery = normalizeSearchText(trimmed);
  const queryTokens = normalizedQuery.split(/\s+/).filter(Boolean);

  if (queryTokens.length === 0) return products;

  interface ScoredProduct {
    product: Product;
    score: number;
  }

  const scored: ScoredProduct[] = [];

  for (const product of products) {
    const normTitle = normalizeSearchText(product.title);
    const normBrand = normalizeSearchText(product.brand);
    const normCat = normalizeSearchText(product.category);
    const normCatName = normalizeSearchText(getProductCategoryName(product.category));
    const normSubCat = normalizeSearchText(product.categoryLabel);
    const normSubCatName = normalizeSearchText(getProductSubcategoryName(product.categoryLabel));
    const normDesc = normalizeSearchText(product.description || "");

    const specsText = product.specs
      ? normalizeSearchText(Object.values(product.specs).join(" "))
      : "";
    const detailsText = product.details
      ? normalizeSearchText(product.details.map((d) => `${d.label} ${d.value}`).join(" "))
      : "";
    const motorText = normalizeSearchText(product.motorTorque || "");
    const batteryText = normalizeSearchText(product.batteryCapacity || "");

    const fullSearchHaystack = [
      normTitle,
      normBrand,
      normCat,
      normCatName,
      normSubCat,
      normSubCatName,
      normDesc,
      specsText,
      detailsText,
      motorText,
      batteryText,
    ].join(" ");

    // Check if ALL query tokens are present in the product data
    const allTokensMatch = queryTokens.every((token) =>
      fullSearchHaystack.includes(token)
    );

    if (!allTokensMatch) {
      continue;
    }

    // Calculate relevance score
    let score = 0;

    // Exact title match gets huge score
    if (normTitle === normalizedQuery) {
      score += 1000;
    } else if (normTitle.startsWith(normalizedQuery)) {
      score += 500;
    } else if (normTitle.includes(normalizedQuery)) {
      score += 300;
    }

    // Exact brand match
    if (normBrand === normalizedQuery) {
      score += 400;
    } else if (normBrand.includes(normalizedQuery)) {
      score += 200;
    }

    // Token occurrences in title
    for (const token of queryTokens) {
      if (normTitle.includes(token)) score += 50;
      if (normBrand.includes(token)) score += 40;
      if (normSubCatName.includes(token) || normSubCat.includes(token)) score += 30;
      if (normCatName.includes(token) || normCat.includes(token)) score += 25;
      if (normDesc.includes(token)) score += 10;
      if (motorText.includes(token) || batteryText.includes(token)) score += 15;
    }

    scored.push({ product, score });
  }

  // Sort by score descending
  scored.sort((a, b) => b.score - a.score);

  return scored.map((item) => item.product);
}
