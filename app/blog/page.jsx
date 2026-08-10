import Blog from "../../src/views/Blog";
import Script from "next/script";

export const metadata = {
  title: "Car Care & Paint Protection Blog | HOGONN India",
  description:
    "Guides on protecting your car's paint from stone chips, scratches, bird droppings and UV damage - from HOGONN, a paint protection film manufacturer in India.",
  alternates: {
    canonical: "https://www.hogonnindia.com/blog/",
  },
  openGraph: {
    title: "Car Care & Paint Protection Blog | HOGONN India",
    description:
      "Guides on protecting your car's paint from stone chips, scratches, bird droppings and UV damage - from HOGONN, a paint protection film manufacturer in India.",
    url: "https://www.hogonnindia.com/blog/",
    siteName: "HOGONN India",
    type: "website",
  },
};

const collectionPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Car Care & Paint Protection Blog | HOGONN India",
  description:
    "Guides on protecting your car's paint from stone chips, scratches, bird droppings and UV damage - from HOGONN, a paint protection film manufacturer in India.",
  url: "https://www.hogonnindia.com/blog/",
  publisher: {
    "@type": "Organization",
    name: "HOGONN India Pvt. Ltd.",
    url: "https://www.hogonnindia.com",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.hogonnindia.com/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Blog",
      item: "https://www.hogonnindia.com/blog/",
    },
  ],
};

export default function BlogPage() {
  return (
    <>
      <Script
        id="schema-collection-page"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionPageSchema),
        }}
      />
      <Script
        id="schema-breadcrumb-blog"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Blog />
    </>
  );
}
