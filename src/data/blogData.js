/**
 * HOGONN Blog — Local Dummy Data
 * --------------------------------
 * This file provides static dummy data for the blog landing page and
 * article pages when the API returns no results.
 *
 * FUTURE API INTEGRATION:
 * In Blog.jsx, the fetch call is already in place. When the API has data,
 * it will take precedence automatically. This file serves as the fallback.
 *
 * To add more articles, append objects following the same shape.
 *
 * Slug-based articles (like the first article below) have their own
 * dedicated route at: app/blog/[slug]/page.jsx or app/blog/how-to-protect-car-scratches/page.jsx
 * API-based articles route through: app/blog/[id]/page.jsx
 */

export const BLOG_POSTS = [
  {
    id: "how-to-protect-car-scratches",
    slug: "/blog/how-to-protect-car-scratches/",
    title:
      "How to Protect Your Car From Scratches, Stone Chips and Bird Droppings",
    excerpt:
      "Stone chips, swirl marks and bird droppings are the things that age car paint in India. Here is what causes each, what prevents it, and when film is worth it.",
    date: "2026-08-08",
    dateISO: "2026-08-08T00:00:00+05:30",
    dateModified: "2026-08-08T00:00:00+05:30",
    dateFormatted: "08 Aug 2026",
    category: "paint-protection",
    categoryLabel: "Paint Protection",
    categoryUrl: "/blog/category/paint-protection/",
    readTime: "6 min read",
    image: "/images/blog1.jpg",
    altText: "Stone chip damage on a car bonnet",
    imageWidth: 1200,
    imageHeight: 800,
  },
];

/**
 * Blog categories
 * NOTE: Category pages are NOT created until at least 3 articles exist per category.
 * These are used only for the "Browse by Topic" display on the blog landing page.
 */
export const BLOG_CATEGORIES = [
  {
    id: "paint-protection",
    label: "Paint Protection",
    url: "/blog/category/paint-protection/",
    articleCount: 1,
  },
  {
    id: "window-films",
    label: "Window Films",
    url: "/blog/category/window-films/",
    articleCount: 0,
  },
  {
    id: "car-care",
    label: "Car Care Tips",
    url: "/blog/category/car-care/",
    articleCount: 0,
  },
  {
    id: "for-installers",
    label: "For Installers",
    url: "/blog/category/for-installers/",
    articleCount: 0,
  },
];
