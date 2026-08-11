/**
 * HOGONN India — Centralized Product Category Service
 *
 * Provides API Integration with https://apidata.hogonnindia.com/category/
 * Handles frontend-to-backend slug mapping, category status filtering,
 * CMS HTML description fallbacks, and SEO metadata resolution.
 */

import { productCategories as staticCategories } from "../data/productCategories.js";
import { CATEGORY_CMS_DESCRIPTIONS } from "../data/categoryCmsDescriptions.js";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://apidata.hogonnindia.com";

// ─────────────────────────────────────────────────────────────────────────────
// SLUG MAPPING LAYER
// ─────────────────────────────────────────────────────────────────────────────

const FRONTEND_TO_BACKEND_SLUG_MAP = {
  "paint-protection-film": "paint-protection-films",
  "safety-glaze-window-film": "window-safety-glaze",
  "windshield-ppf": "windshield-protection-film",
  "sunroof-ppf": "sunroof-protection-film",
};

const BACKEND_TO_FRONTEND_SLUG_MAP = {
  "paint-protection-films": "paint-protection-film",
  "ppf-films": "paint-protection-film",
  "window-safety-glaze": "safety-glaze-window-film",
  "windshield-protection-film": "windshield-ppf",
  "sunroof-protection-film": "sunroof-ppf",
};

export function mapFrontendToBackendSlug(frontendSlug) {
  return FRONTEND_TO_BACKEND_SLUG_MAP[frontendSlug] || frontendSlug;
}

export function mapBackendToFrontendSlug(backendSlug) {
  return BACKEND_TO_FRONTEND_SLUG_MAP[backendSlug] || backendSlug;
}

// Helper to get static category definition by frontend slug
function getStaticCategory(frontendSlug) {
  return staticCategories.find((cat) => cat.slug === frontendSlug);
}

// ─────────────────────────────────────────────────────────────────────────────
// API SERVICE METHODS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Fetch all active product categories.
 * Connects to GET https://apidata.hogonnindia.com/category/
 *
 * @returns {Promise<Array>}
 */
export async function getAllCategories() {
  try {
    const response = await fetch(`${API_BASE_URL}/category/`, {
      cache: "no-store", // or next: { revalidate: 60 }
    });

    if (!response.ok) {
      throw new Error(`API error ${response.status}`);
    }

    const json = await response.json();

    if (!json.success || !Array.isArray(json.data)) {
      throw new Error("Invalid categories API response format");
    }

    // Filter active categories only
    const activeApiCategories = json.data.filter(
      (cat) => cat.status !== false
    );

    // Map API categories to frontend category structures
    const categories = activeApiCategories
      .map((apiCat) => {
        const frontendSlug = mapBackendToFrontendSlug(apiCat.slug);
        const staticCat = getStaticCategory(frontendSlug);

        if (!staticCat) {
          // If a new unknown category is returned by API, generate basic structure
          return {
            id: apiCat.id,
            slug: frontendSlug,
            apiSlug: apiCat.slug,
            name: apiCat.name,
            shortDescription: apiCat.meta_description || "",
            productCount: 1,
            productCountLabel: "1 Product",
            url: `/products/${frontendSlug}/`,
            status: apiCat.status,
          };
        }

        return {
          ...staticCat,
          id: apiCat.id,
          apiSlug: apiCat.slug,
          slug: frontendSlug,
          url: `/products/${frontendSlug}/`,
          status: apiCat.status,
          description:
            apiCat.description && apiCat.description.trim().length > 0
              ? apiCat.description
              : CATEGORY_CMS_DESCRIPTIONS[frontendSlug] ||
                staticCat.description ||
                null,
          meta_title: apiCat.meta_title || staticCat.metadata?.title,
          meta_description:
            apiCat.meta_description || staticCat.metadata?.description,
          meta_keywords: apiCat.meta_keywords || null,
          breadcrumb: apiCat.breadcrumb || staticCat.breadcrumb,
          schema: apiCat.schema || staticCat.schema,
          hashtag: apiCat.hashtag || null,
        };
      })
      .filter(Boolean);

    // Deduplicate by frontend slug to ensure 4 distinct category cards on /products/
    const uniqueCategories = [];
    const seenSlugs = new Set();

    categories.forEach((cat) => {
      if (!seenSlugs.has(cat.slug)) {
        seenSlugs.add(cat.slug);
        uniqueCategories.push(cat);
      }
    });

    // Ensure all 4 core client-required categories exist in the list
    staticCategories.forEach((staticCat) => {
      if (!seenSlugs.has(staticCat.slug)) {
        seenSlugs.add(staticCat.slug);
        uniqueCategories.push({
          ...staticCat,
          description:
            CATEGORY_CMS_DESCRIPTIONS[staticCat.slug] || staticCat.description,
        });
      }
    });

    return uniqueCategories;
  } catch (error) {
    console.error("getAllCategories API call failed, using static fallback:", error);
    // Fallback to static categories if API fails
    return staticCategories.map((cat) => ({
      ...cat,
      description: CATEGORY_CMS_DESCRIPTIONS[cat.slug] || cat.description,
    }));
  }
}

/**
 * Fetch a single category by its frontend slug.
 * Resolves the backend slug, connects to GET https://apidata.hogonnindia.com/category/{backendSlug}/
 *
 * @param {string} frontendSlug
 * @returns {Promise<Object|null>}
 */
export async function getCategoryBySlug(frontendSlug) {
  const staticCat = getStaticCategory(frontendSlug);
  const backendSlug = mapFrontendToBackendSlug(frontendSlug);

  try {
    const response = await fetch(`${API_BASE_URL}/category/${backendSlug}/`, {
      cache: "no-store",
    });

    if (response.status === 404) {
      if (staticCat) {
        // Return static fallback if API 404s for a known frontend slug
        return {
          ...staticCat,
          description:
            CATEGORY_CMS_DESCRIPTIONS[frontendSlug] || staticCat.description,
        };
      }
      return null;
    }

    if (!response.ok) {
      throw new Error(`API error ${response.status}`);
    }

    const json = await response.json();

    if (!json.success || !json.data) {
      throw new Error("Invalid single category API response");
    }

    const apiCat = Array.isArray(json.data) ? json.data[0] : json.data;

    // Check status
    if (apiCat.status === false) {
      return null;
    }

    const descriptionContent =
      apiCat.description && apiCat.description.trim().length > 0
        ? apiCat.description
        : CATEGORY_CMS_DESCRIPTIONS[frontendSlug] || staticCat?.description;

    return {
      ...(staticCat || {}),
      id: apiCat.id || staticCat?.id,
      apiSlug: apiCat.slug,
      slug: frontendSlug,
      url: `/products/${frontendSlug}/`,
      name: staticCat?.name || apiCat.name,
      h1: staticCat?.h1 || apiCat.name,
      status: apiCat.status,
      description: descriptionContent,
      meta_title: apiCat.meta_title || staticCat?.metadata?.title,
      meta_description:
        apiCat.meta_description || staticCat?.metadata?.description,
      meta_keywords: apiCat.meta_keywords || null,
      breadcrumb: apiCat.breadcrumb || staticCat?.breadcrumb,
      schema: apiCat.schema || staticCat?.schema,
      hashtag: apiCat.hashtag || null,
      metadata: {
        title: apiCat.meta_title || staticCat?.metadata?.title,
        description:
          apiCat.meta_description || staticCat?.metadata?.description,
        canonical:
          staticCat?.metadata?.canonical ||
          `https://www.hogonnindia.com/products/${frontendSlug}/`,
      },
    };
  } catch (error) {
    console.error(
      `getCategoryBySlug(${frontendSlug}) API call failed, using static fallback:`,
      error
    );

    if (!staticCat) return null;

    return {
      ...staticCat,
      description:
        CATEGORY_CMS_DESCRIPTIONS[frontendSlug] || staticCat.description,
    };
  }
}

/**
 * Get a single product by category slug and product slug.
 */
export async function getProductBySlug(categorySlug, productSlug) {
  const category = await getCategoryBySlug(categorySlug);
  if (!category || !category.products) return undefined;
  return category.products.find((product) => product.slug === productSlug);
}

/**
 * Get all category slugs for Next.js generateStaticParams
 */
export function getAllCategorySlugs() {
  return staticCategories.map((cat) => ({ category: cat.slug }));
}

/**
 * Get all product slugs across all categories
 */
export function getAllProductSlugs() {
  return staticCategories.flatMap((cat) =>
    (cat.products || []).map((product) => ({
      category: cat.slug,
      product: product.slug,
    }))
  );
}

/**
 * Get cross links for a category slug
 */
export function getCrossLinks(slug) {
  const staticCat = getStaticCategory(slug);
  if (!staticCat || !staticCat.crossLinks) return [];
  return staticCat.crossLinks
    .map((crossSlug) => {
      const linked = staticCategories.find((c) => c.slug === crossSlug);
      if (!linked) return null;
      return {
        id: linked.id,
        slug: linked.slug,
        name: linked.name,
        shortDescription: linked.shortDescription,
        productCountLabel: linked.productCountLabel,
        url: linked.url,
      };
    })
    .filter(Boolean);
}
