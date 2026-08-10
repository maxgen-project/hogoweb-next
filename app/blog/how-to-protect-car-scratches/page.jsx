import ArticleProtectCar from "../../../src/views/ArticleProtectCar";
import Script from "next/script";

export const metadata = {
  title: "How to Protect Your Car From Scratches and Stone Chips",
  description:
    "Stone chips, swirl marks and bird droppings are the four things that age car paint in India. Here is what causes each, what prevents it, and when film is worth it.",
  alternates: {
    canonical:
      "https://www.hogonnindia.com/blog/how-to-protect-car-scratches/",
  },
  openGraph: {
    title: "How to Protect Your Car From Scratches and Stone Chips",
    description: "What actually damages car paint in India - and what stops it.",
    url: "https://www.hogonnindia.com/blog/how-to-protect-car-scratches/",
    siteName: "HOGONN India",
    type: "article",
    images: [
      {
        url: "https://www.hogonnindia.com/images/blog/protect-car-paint-og.jpg",
        width: 1200,
        height: 630,
        alt: "Stone chip damage on a car bonnet",
      },
    ],
  },
};

/**
 * AUTHOR CONFIG
 * ─────────────────────────────────────────────────────────────────
 * TODO (Client): Replace ARTICLE_AUTHOR_NAME with the real
 * author's full name once confirmed. This value appears in the
 * Article structured data schema.
 * ─────────────────────────────────────────────────────────────────
 */
const ARTICLE_AUTHOR_NAME = "HOGONN India Editorial Team";

const PUBLISHED_DATE_ISO = "2026-08-08T00:00:00+05:30";
const MODIFIED_DATE_ISO = "2026-08-08T00:00:00+05:30";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline:
    "How to Protect Your Car From Scratches, Stone Chips and Bird Droppings",
  description:
    "Stone chips, swirl marks and bird droppings are the things that age car paint in India. Here is what causes each, what prevents it, and when film is worth it.",
  url: "https://www.hogonnindia.com/blog/how-to-protect-car-scratches/",
  datePublished: PUBLISHED_DATE_ISO,
  dateModified: MODIFIED_DATE_ISO,
  author: {
    "@type": "Person",
    name: ARTICLE_AUTHOR_NAME,
  },
  publisher: {
    "@type": "Organization",
    name: "HOGONN India Pvt. Ltd.",
    url: "https://www.hogonnindia.com",
    logo: {
      "@type": "ImageObject",
      url: "https://www.hogonnindia.com/images/HOGONN9.png",
    },
  },
  image: {
    "@type": "ImageObject",
    url: "https://www.hogonnindia.com/images/blog/protect-car-paint-og.jpg",
    width: 1200,
    height: 630,
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://www.hogonnindia.com/blog/how-to-protect-car-scratches/",
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
    {
      "@type": "ListItem",
      position: 3,
      name: "How to Protect Your Car From Scratches, Stone Chips and Bird Droppings",
      item: "https://www.hogonnindia.com/blog/how-to-protect-car-scratches/",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What causes most paint damage on Indian roads?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Stone chips from highway driving are the most common cause, followed by swirl marks from washing, acidic etching from bird droppings and tree sap, and UV fading over time. Stone chips are the hardest to repair invisibly because they break through the clear coat.",
      },
    },
    {
      "@type": "Question",
      name: "Can bird droppings really damage car paint?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Bird droppings are acidic and can etch through clear coat within hours in direct sun. The damage is not the stain itself but the chemical reaction underneath, which is why wiping them off late often leaves a permanent dull mark.",
      },
    },
    {
      "@type": "Question",
      name: "Does ceramic coating protect against stone chips?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. A ceramic coating is a thin chemical layer that improves gloss and makes cleaning easier, but it does not absorb impact. Stone chip protection requires a physical film with thickness to it, such as paint protection film.",
      },
    },
    {
      "@type": "Question",
      name: "How thick should paint protection film be?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most quality body films are around 188 microns, which is 7.5 mil. HOGONN body films are 188 microns. Films for glass, such as windshield and sunroof film, are typically thinner at 163 microns.",
      },
    },
    {
      "@type": "Question",
      name: "What is self-healing paint protection film?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Self-healing film has a top coat formulated so that light scratches and swirl marks close up when heat is applied, from sunlight, a warm water rinse or a heat gun. HOGONN films are rated 100% heat healing.",
      },
    },
    {
      "@type": "Question",
      name: "Will paint protection film turn yellow in Indian sun?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Lower-grade films can amber within a couple of seasons. Check whether anti-yellowing is warranted, and for how long. HOGONN clear and matte films carry anti-yellowing cover for the full warranty term, up to 10 years on PPF VAJRA.",
      },
    },
    {
      "@type": "Question",
      name: "Does paint protection film damage the original paint when removed?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Quality film uses an adhesive designed for clean removal and can be taken off without lifting factory paint. Film is often applied specifically to preserve original paint and protect resale value.",
      },
    },
    {
      "@type": "Question",
      name: "How much of the car should be covered?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Front-end coverage such as bonnet, bumper and mirrors addresses the highest-impact areas. Full-body coverage protects everything including doors and rear panels. Discuss coverage options with an installer based on how the vehicle is used.",
      },
    },
  ],
};

export default function ProtectCarArticlePage() {
  return (
    <>
      <Script
        id="schema-article"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Script
        id="schema-breadcrumb-article"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="schema-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ArticleProtectCar />
    </>
  );
}
