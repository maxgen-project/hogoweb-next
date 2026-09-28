"use client";

import { useEffect, useRef, useState } from "react";
import InnerBanner from "../components/InnerBanner";
import CategoryProductsSection from "../components/products/CategoryProductsSection";
import CategoryCrossLinks from "../components/products/CategoryCrossLinks";
import { themes } from "../config/themeConfig";
import { sanitizeHtml } from "../utils/sanitizeHtml";

const serviceBanner = "/images/serviceBanner.jpg";

/**
 * CategoryDetailView — Renders a category page using the backend/CMS HTML description,
 * followed by dynamic products belonging to the category, and category cross-links.
 *
 * @param {{ category: Object, products?: Array, crossLinks: Array }} props
 */
export default function CategoryDetailView({
  category,
  products = null,
  crossLinks = [],
}) {
  const contentRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setVisible(true);
        });
      },
      { threshold: 0.05 }
    );
    if (contentRef.current) observer.observe(contentRef.current);
    return () => observer.disconnect();
  }, []);

  const hasH1InDescription =
    typeof category.description === "string" &&
    /(<h1\b[^>]*>)/i.test(category.description);

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: themes.backgroundBlack }}
    >
      {/* ── BANNER + BREADCRUMB ─────────────────────────────────────── */}
      <InnerBanner
        title={category.h1 || category.name}
        parent="Products"
        parentLink="/product"
        current={category.name}
        bg={serviceBanner}
        isH1={!hasH1InDescription}
      />

      {/* ── FADE-IN WRAPPER ─────────────────────────────────────────── */}
      <div
        ref={contentRef}
        className={`transition-all duration-700 ease-out ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* ── CMS DESCRIPTION HTML ──────────────────────────────────── */}
        {category.description ? (
          <div
            dangerouslySetInnerHTML={{
              __html: sanitizeHtml(category.description),
            }}
          />
        ) : (
          // Fallback: show the category name if no description available yet
          <section
            className="py-20 text-center"
            style={{ backgroundColor: "#07071a" }}
          >
            <p style={{ color: "#a0a0b8" }}>
              Content coming soon for {category.name}.
            </p>
          </section>
        )}

        {/* ── DYNAMIC CATEGORY PRODUCTS ───────────────────────────────── */}
        <CategoryProductsSection
          category={category}
          initialProducts={products}
        />

        {/* ── CROSS LINKS ─────────────────────────────────────────────── */}
        <CategoryCrossLinks
          crossLinks={crossLinks}
          currentSlug={category.slug}
        />
      </div>
    </div>
  );
}
