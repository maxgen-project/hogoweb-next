/**
 * HOGONN India — Centralized Product Category Service
 *
 * Fully dynamic — all category data comes from the backend API.
 * No hardcoded category names, descriptions, slugs, or content.
 *
 * API: GET https://apidata.hogonnindia.com/category/
 * API response: { "success": true, "count": N, "data": [...] }
 *
 * Category object fields used:
 *   id, name, slug, description, breadcrumb, schema,
 *   meta_title, meta_description, meta_keywords, hashtag, status
 *
 * NOTE: status is boolean (true = active, false = inactive).
 * NOTE: breadcrumb, schema, meta_title, meta_description, meta_keywords, hashtag
 *       may all be empty strings ("") — all are handled gracefully.
 */

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://apidata.hogonnindia.com";

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Strip HTML tags from a description string for use in card previews.
 * Returns plain text up to `maxLen` characters.
 * @param {string} html
 * @param {number} maxLen
 * @returns {string}
 */
function stripHtml(html, maxLen = 180) {
  if (!html || typeof html !== "string") return "";
  const text = html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > maxLen ? text.slice(0, maxLen).trimEnd() + "…" : text;
}

/**
 * Safely parse a JSON-LD schema string from the backend.
 * Handles:
 *   1. Empty / blank string → return null
 *   2. Valid JSON string → JSON.parse directly
 *   3. Backslash-escaped JSON → unescape, then parse
 *   4. Still fails → log a warning, return null (never throws)
 *
 * @param {string} schemaStr
 * @returns {Object|null}
 */
function safeParseSchema(schemaStr) {
  if (!schemaStr || !schemaStr.trim()) return null;

  // Attempt 1: direct parse
  try {
    return JSON.parse(schemaStr);
  } catch (_) {
    // Attempt 2: unescape backslash-escaped quotes then parse
    try {
      const unescaped = schemaStr.replace(/\\"/g, '"').replace(/\\\\/g, "\\");
      return JSON.parse(unescaped);
    } catch (err) {
      console.warn(
        "[productCategoryService] Failed to parse schema JSON — skipping schema injection.",
        err
      );
      return null;
    }
  }
}

/**
 * Map a raw API category object to the shape used by the frontend.
 * @param {Object} apiCat
 * @returns {Object}
 */
function mapApiCategory(apiCat) {
  const slug = apiCat.slug || String(apiCat.id);

  return {
    id: apiCat.id,
    slug,
    name: apiCat.name || "",
    url: `/products/${slug}/`,

    // Short preview for listing card — strip HTML from description
    shortDescription: stripHtml(apiCat.description),

    // Full HTML description for the detail page — render via dangerouslySetInnerHTML as-is
    description: apiCat.description || "",

    // Breadcrumb: keep as string (may be ""); the detail view handles empty fallback
    breadcrumb: apiCat.breadcrumb || "",

    // Schema: safe-parsed object, or null if empty / unparseable
    schemaParsed: safeParseSchema(apiCat.schema || ""),

    // SEO fields (all may be "")
    meta_title: apiCat.meta_title || "",
    meta_description: apiCat.meta_description || "",
    meta_keywords: apiCat.meta_keywords || "",

    // Hashtag (may be "")
    hashtag: apiCat.hashtag || "",

    // Status is boolean
    status: apiCat.status === true,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// FETCH ALL CATEGORIES
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Fetch all active product categories from the API.
 * Filters to status === true only.
 *
 * NOTE: The backend may return "PPF Films" and "Paint Protection Films" as
 * separate entries — this is a known data quality issue to be resolved in the
 * admin panel. Both are returned here as the API sends them.
 *
 * @returns {Promise<Array>}
 */
export async function getAllCategories() {
  try {
    const response = await fetch(`${API_BASE_URL}/category/`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Category API error: HTTP ${response.status}`);
    }

    const json = await response.json();

    if (!json.success || !Array.isArray(json.data)) {
      throw new Error("Category API returned unexpected shape");
    }

    // Filter active categories (status === true) and map to frontend shape
    return json.data
      .filter((cat) => cat.status === true)
      .map(mapApiCategory);
  } catch (error) {
    console.error("[getAllCategories] API call failed:", error.message);
    // Return empty array — the listing page will show an empty state or handle gracefully
    return [];
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// FETCH SINGLE CATEGORY BY SLUG
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Fetch a single active category by its slug.
 * Returns null if not found, inactive, or API errors.
 *
 * @param {string} slug
 * @returns {Promise<Object|null>}
 */
export async function getCategoryBySlug(slug) {
  if (!slug) return null;

  try {
    // Fetch the full list and find by slug — avoids separate /category/{slug}/ endpoint
    // which may not exist for all API configurations
    const response = await fetch(`${API_BASE_URL}/category/`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Category API error: HTTP ${response.status}`);
    }

    const json = await response.json();

    if (!json.success || !Array.isArray(json.data)) {
      throw new Error("Category API returned unexpected shape");
    }

    const apiCat = json.data.find(
      (cat) =>
        cat.slug === slug ||
        (slug === "paint-protection-film" && cat.slug === "paint-protection-films") ||
        (slug === "paint-protection-films" && cat.slug === "paint-protection-film")
    );

    if (!apiCat) return null;

    // Return null for inactive categories (triggers 404 in page component)
    if (apiCat.status !== true) return null;

    return mapApiCategory(apiCat);
  } catch (error) {
    console.error(`[getCategoryBySlug(${slug})] API call failed:`, error.message);
    return null;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// FETCH PRODUCTS FOR A CATEGORY
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Fetch all active products belonging to a specific category.
 * Matches by category_id, category_name, or category slug.
 *
 * @param {Object|string|number} categoryInput
 * @returns {Promise<Array>}
 */
export async function getProductsForCategory(categoryInput) {
  if (!categoryInput) return [];

  try {
    const response = await fetch(`${API_BASE_URL}/products/sequence/?status=true`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Products API error: HTTP ${response.status}`);
    }

    const json = await response.json();
    const allProducts = Array.isArray(json.data) ? json.data : [];

    let targetCatId = null;
    let targetCatName = null;
    let targetSlug = null;

    if (typeof categoryInput === "object" && categoryInput !== null) {
      targetCatId = categoryInput.id;
      targetCatName = categoryInput.name;
      targetSlug = categoryInput.slug;
    } else if (typeof categoryInput === "number") {
      targetCatId = categoryInput;
    } else if (typeof categoryInput === "string") {
      targetSlug = categoryInput;
    }

    return allProducts
      .filter((p) => {
        if (p.status !== true) return false;

        // 1. Match by category_id
        if (
          targetCatId &&
          (p.category_id === targetCatId || Number(p.category_id) === Number(targetCatId))
        ) {
          return true;
        }

        // 2. Match by category_name (case insensitive)
        if (
          targetCatName &&
          p.category_name &&
          p.category_name.trim().toLowerCase() === targetCatName.trim().toLowerCase()
        ) {
          return true;
        }

        // 3. Match by category slug heuristic
        if (targetSlug) {
          const normSlug = targetSlug.toLowerCase().replace(/s$/, "");
          const pCatNameNorm = (p.category_name || "")
            .toLowerCase()
            .replace(/s$/, "")
            .replace(/\s+/g, "-");
          if (pCatNameNorm.includes(normSlug) || normSlug.includes(pCatNameNorm)) {
            return true;
          }
        }

        return false;
      })
      .sort((a, b) => {
        const seqA = a.product_sequence ?? a.course_sequence ?? 9999;
        const seqB = b.product_sequence ?? b.course_sequence ?? 9999;
        return seqA - seqB;
      });
  } catch (error) {
    console.error("[getProductsForCategory] API call failed:", error.message);
    return [];
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// GENERATE STATIC PARAMS (for Next.js SSG)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Returns slug params for generateStaticParams on /products/[category].
 * Falls back to empty array on API error (pages will be server-rendered on demand).
 *
 * @returns {Promise<Array<{category: string}>>}
 */
export async function getAllCategorySlugs() {
  try {
    const categories = await getAllCategories();
    return categories.map((cat) => ({ category: cat.slug }));
  } catch (error) {
    console.error("[getAllCategorySlugs] Failed:", error.message);
    return [];
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// PRODUCT-LEVEL HELPERS (retained for product detail pages)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Get a single product by category slug and product slug.
 * @param {string} categorySlug
 * @param {string} productSlug
 * @returns {Promise<Object|undefined>}
 */
export async function getProductBySlug(categorySlug, productSlug) {
  const category = await getCategoryBySlug(categorySlug);
  if (!category || !category.products) return undefined;
  return category.products.find((product) => product.slug === productSlug);
}

/**
 * Get all product slugs across all categories (for generateStaticParams on product detail pages).
 * Falls back to empty array.
 * @returns {Promise<Array<{category: string, product: string}>>}
 */
export async function getAllProductSlugs() {
  try {
    const categories = await getAllCategories();
    return categories.flatMap((cat) =>
      (cat.products || []).map((product) => ({
        category: cat.slug,
        product: product.slug,
      }))
    );
  } catch {
    return [];
  }
}

/**
 * Get cross-links for a category.
 * Since cross-links are no longer stored as static data, this returns
 * the other active categories (excluding the current one), capped at 3.
 * @param {string} currentSlug
 * @returns {Promise<Array>}
 */
export async function getCrossLinks(currentSlug) {
  try {
    const all = await getAllCategories();
    return all
      .filter((cat) => cat.slug !== currentSlug)
      .slice(0, 3)
      .map((cat) => ({
        id: cat.id,
        slug: cat.slug,
        name: cat.name,
        shortDescription: cat.shortDescription,
        url: cat.url,
      }));
  } catch {
    return [];
  }
}
