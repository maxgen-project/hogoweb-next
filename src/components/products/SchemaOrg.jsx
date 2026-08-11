/**
 * SchemaOrg — Injects JSON-LD structured data into the page.
 * Accepts an array of schema objects and renders them as individual
 * <script type="application/ld+json"> tags.
 *
 * Usage (Server Component — no "use client" needed):
 *   <SchemaOrg schemas={[collectionPageSchema, breadcrumbSchema, faqSchema]} />
 */

/**
 * Generates a CollectionPage schema from a category object.
 * @param {Object} category
 * @returns {Object}
 */
export function buildCollectionPageSchema(category) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: category.h1,
    description: category.metadata.description,
    url: category.metadata.canonical,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: category.breadcrumb.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: `https://www.hogonnindia.com${item.url}`,
      })),
    },
  };
}

/**
 * Generates a Product schema from a single-product category object.
 * @param {Object} category
 * @returns {Object}
 */
export function buildProductSchema(category) {
  const product = category.products[0];
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: category.h1,
    description: category.metadata.description,
    url: category.metadata.canonical,
    brand: {
      "@type": "Brand",
      name: "HOGONN",
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "INR",
      seller: {
        "@type": "Organization",
        name: "HOGONN India Pvt. Ltd.",
      },
    },
  };
}

/**
 * Generates a BreadcrumbList schema from a category breadcrumb array.
 * @param {Array} breadcrumb
 * @returns {Object}
 */
export function buildBreadcrumbSchema(breadcrumb) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumb.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://www.hogonnindia.com${item.url}`,
    })),
  };
}

/**
 * Generates a FAQPage schema from an array of FAQ objects.
 * The answer text must match the visible FAQ content exactly.
 * @param {Array<{q: string, a: string}>} faqs
 * @returns {Object}
 */
export function buildFAQSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}

/**
 * SchemaOrg component — renders JSON-LD scripts.
 * Can be used in Server Components (no "use client").
 *
 * @param {{ schemas: Object[] }} props
 */
export default function SchemaOrg({ schemas = [] }) {
  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
