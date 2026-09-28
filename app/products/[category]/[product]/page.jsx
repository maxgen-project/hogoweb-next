import { notFound } from "next/navigation";
import {
  getCategoryBySlug,
  getProductBySlug,
  getAllProductSlugs,
} from "../../../../src/service/productCategoryService";
import CategoryProductDetailView from "../../../../src/views/CategoryProductDetailView";
import SchemaOrg, {
  buildBreadcrumbSchema,
} from "../../../../src/components/products/SchemaOrg";

// ─────────────────────────────────────────────────────────────────────────────
// Static params for SSG
// ─────────────────────────────────────────────────────────────────────────────
export async function generateStaticParams() {
  return getAllProductSlugs();
}

// ─────────────────────────────────────────────────────────────────────────────
// Dynamic metadata per product
// ─────────────────────────────────────────────────────────────────────────────
export async function generateMetadata({ params }) {
  const { category: categorySlug, product: productSlug } = await params;
  const category = await getCategoryBySlug(categorySlug);
  const product = await getProductBySlug(categorySlug, productSlug);

  if (!category || !product) {
    return { title: "Product Not Found — HOGONN India" };
  }

  return {
    title: `${product.name} — ${category.name} | HOGONN India`,
    description:
      product.shortDescription ||
      `${product.name} — ${product.warranty}. Part of the HOGONN ${category.name} range.`,
    alternates: {
      canonical: `https://www.hogonnindia.com${product.url}`,
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Page component
// ─────────────────────────────────────────────────────────────────────────────
export default async function ProductDetailPage({ params }) {
  const { category: categorySlug, product: productSlug } = await params;

  const category = await getCategoryBySlug(categorySlug);
  const product = await getProductBySlug(categorySlug, productSlug);

  // Handle unknown slugs
  if (!category || !product) {
    notFound();
  }

  // Breadcrumb for this product page
  const breadcrumb = [
    { name: "Home", url: "/" },
    { name: "Products", url: "/products/" },
    { name: category.name, url: category.url },
    { name: product.name, url: product.url },
  ];

  return (
    <>
      {/* JSON-LD BreadcrumbList */}
      <SchemaOrg schemas={[buildBreadcrumbSchema(breadcrumb)]} />

      {/* Product detail view */}
      <CategoryProductDetailView category={category} product={product} />
    </>
  );
}
