import { notFound } from "next/navigation";
import {
  getCategoryBySlug,
  getAllCategorySlugs,
  getProductsForCategory,
  getCrossLinks,
} from "../../../src/service/productCategoryService";
import CategoryDetailView from "../../../src/views/CategoryDetailView";
import SchemaOrg from "../../../src/components/products/SchemaOrg";

// ─────────────────────────────────────────────────────────────────────────────
// Static params for SSG — resolved from the live API at build time
// ─────────────────────────────────────────────────────────────────────────────
export async function generateStaticParams() {
  return getAllCategorySlugs();
}

// ─────────────────────────────────────────────────────────────────────────────
// Dynamic metadata per category — driven entirely by API fields
// ─────────────────────────────────────────────────────────────────────────────
export async function generateMetadata({ params }) {
  const { category: slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return {
      title: "Category Not Found — HOGONN India",
    };
  }

  // Use API fields with fallbacks; all may be empty strings
  const title =
    (category.meta_title && category.meta_title.trim()) ||
    `${category.name} | HOGONN India`;

  const description =
    (category.meta_description && category.meta_description.trim()) || "";

  const canonical = `https://www.hogonnindia.com/products/${slug}/`;

  return {
    title,
    ...(description ? { description } : {}),
    ...(category.meta_keywords && category.meta_keywords.trim()
      ? { keywords: category.meta_keywords }
      : {}),
    alternates: { canonical },
    openGraph: {
      title,
      ...(description ? { description } : {}),
      url: canonical,
      siteName: "HOGONN India",
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Page component
// ─────────────────────────────────────────────────────────────────────────────
export default async function CategoryPage({ params }) {
  const { category: slug } = await params;

  // Fetch category, products, and cross-links concurrently
  const [category, products, crossLinks] = await Promise.all([
    getCategoryBySlug(slug),
    getProductsForCategory(slug),
    getCrossLinks(slug),
  ]);

  // Handle unknown or inactive category slugs — triggers Next.js 404
  if (!category || category.status !== true) {
    notFound();
  }

  // ── Build schema array ──────────────────────────────────────────────────────
  // Use the safe-parsed schema object from the service (null if empty/invalid)
  const schemas = [];

  if (category.schemaParsed) {
    // API provides a pre-built schema — use it directly
    if (Array.isArray(category.schemaParsed)) {
      schemas.push(...category.schemaParsed);
    } else {
      schemas.push(category.schemaParsed);
    }
  }

  return (
    <>
      {/* JSON-LD structured data (only rendered if schemas array is non-empty) */}
      {schemas.length > 0 && <SchemaOrg schemas={schemas} />}

      {/* Category page view — products & crossLinks fetched server-side */}
      <CategoryDetailView
        category={category}
        products={products}
        crossLinks={crossLinks}
      />
    </>
  );
}
