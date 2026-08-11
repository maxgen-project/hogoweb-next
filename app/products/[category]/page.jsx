import { notFound } from "next/navigation";
import {
  getCategoryBySlug,
  getAllCategorySlugs,
} from "../../../src/service/productCategoryService";
import CategoryDetailView from "../../../src/views/CategoryDetailView";
import SchemaOrg, {
  buildCollectionPageSchema,
  buildProductSchema,
  buildBreadcrumbSchema,
  buildFAQSchema,
} from "../../../src/components/products/SchemaOrg";

// ─────────────────────────────────────────────────────────────────────────────
// Static params for SSG (optional — removes the need for on-demand rendering)
// ─────────────────────────────────────────────────────────────────────────────
export async function generateStaticParams() {
  return getAllCategorySlugs();
}

// ─────────────────────────────────────────────────────────────────────────────
// Dynamic metadata per category
// ─────────────────────────────────────────────────────────────────────────────
export async function generateMetadata({ params }) {
  const { category: slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return {
      title: "Category Not Found — HOGONN India",
    };
  }

  const title = category.meta_title || category.metadata?.title || category.name;
  const description = category.meta_description || category.metadata?.description || "";
  const canonical = category.metadata?.canonical || `https://www.hogonnindia.com/products/${slug}/`;

  return {
    title,
    description,
    keywords: category.meta_keywords || undefined,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
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
  const category = await getCategoryBySlug(slug);

  // Handle unknown or inactive category slugs — triggers Next.js 404
  if (!category || category.status === false) {
    notFound();
  }

  // Build schema array based on API schema or category type
  const schemas = [];

  if (category.schema) {
    try {
      const parsedSchema =
        typeof category.schema === "string"
          ? JSON.parse(category.schema)
          : category.schema;
      schemas.push(parsedSchema);
    } catch (err) {
      console.error("Failed to parse API schema JSON:", err);
    }
  } else {
    if (category.type === "collection") {
      schemas.push(buildCollectionPageSchema(category));
    } else {
      schemas.push(buildProductSchema(category));
    }
  }

  if (category.breadcrumb) {
    schemas.push(buildBreadcrumbSchema(category.breadcrumb));
  }

  if (category.faqs && category.faqs.length > 0) {
    schemas.push(buildFAQSchema(category.faqs));
  }

  return (
    <>
      {/* JSON-LD structured data */}
      <SchemaOrg schemas={schemas} />

      {/* Category page view */}
      <CategoryDetailView category={category} />
    </>
  );
}
