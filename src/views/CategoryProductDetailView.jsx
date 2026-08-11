"use client";

import Link from "next/link";
import InnerBanner from "../components/InnerBanner";
import { themes } from "../config/themeConfig";

const serviceBanner = "/images/serviceBanner.jpg";

/**
 * CategoryProductDetailView — Renders a product detail page for a category product.
 *
 * This is a placeholder view that uses static data. It will be replaced with
 * a richer implementation once product-specific content and images are available
 * from the backend API.
 *
 * @param {{ category: Object, product: Object }} props
 */
export default function CategoryProductDetailView({ category, product }) {
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: themes.backgroundBlack }}
    >
      {/* Banner with 3-level breadcrumb: Home > Products > Category > Product */}
      <InnerBanner
        title={product.name}
        parent={category.name}
        parentLink={category.url}
        current={product.name}
        bg={serviceBanner}
      />

      {/* Product detail content */}
      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-18"
        style={{ backgroundColor: themes.backgroundBlack }}
      >
        {/* Back breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-10">
          <ol className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
            <li>
              <Link href="/" style={{ color: "#666680" }} className="hover:opacity-80 transition">
                Home
              </Link>
            </li>
            <li style={{ color: "#666680" }}>›</li>
            <li>
              <Link href="/products/" style={{ color: "#666680" }} className="hover:opacity-80 transition">
                Products
              </Link>
            </li>
            <li style={{ color: "#666680" }}>›</li>
            <li>
              <Link href={category.url} style={{ color: "#666680" }} className="hover:opacity-80 transition">
                {category.name}
              </Link>
            </li>
            <li style={{ color: "#666680" }}>›</li>
            <li style={{ color: themes.textWhite }} aria-current="page">
              {product.name}
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left: Product info */}
          <div>
            {/* Warranty badge */}
            <span
              className="inline-block text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-4"
              style={{
                backgroundColor: `${themes.primary}22`,
                color: themes.primary,
                border: `1px solid ${themes.primary}44`,
              }}
            >
              {product.warranty}
            </span>

            <h1
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 leading-tight"
              style={{
                color: themes.textWhite,
                fontFamily: themes.fontPrimary,
              }}
            >
              {product.name}
            </h1>

            {product.shortDescription && (
              <p
                className="text-sm sm:text-base leading-relaxed mb-8"
                style={{ color: "#a0a0b8" }}
              >
                {product.shortDescription}
              </p>
            )}

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="
                  inline-flex items-center gap-2 px-6 py-3 rounded-lg
                  font-semibold text-sm transition-all duration-300
                  hover:opacity-90 hover:-translate-y-0.5
                "
                style={{
                  backgroundColor: themes.primary,
                  color: themes.textWhite,
                }}
              >
                Get a Quote
              </Link>
              <Link
                href={category.url}
                className="
                  inline-flex items-center gap-2 px-6 py-3 rounded-lg
                  font-semibold text-sm transition-all duration-300
                  border hover:border-[var(--primary)] hover:-translate-y-0.5
                "
                style={{
                  borderColor: "rgba(255,255,255,0.2)",
                  color: themes.textWhite,
                }}
              >
                ← Back to {category.name}
              </Link>
            </div>
          </div>

          {/* Right: Specifications (if available from parent category) */}
          {category.specifications && (
            <div>
              <h2
                className="text-xl sm:text-2xl font-bold mb-6"
                style={{
                  color: themes.textWhite,
                  fontFamily: themes.fontPrimary,
                }}
              >
                Specifications
              </h2>
              <div className="space-y-3">
                {category.specifications.map((spec, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center px-4 py-3 rounded-lg border border-white/10"
                    style={{
                      backgroundColor: i % 2 === 0 ? "#0a0a2a" : "#0d0d30",
                    }}
                  >
                    <span
                      className="text-xs uppercase tracking-wider font-medium"
                      style={{ color: "#666680" }}
                    >
                      {spec.label}
                    </span>
                    <span
                      className="text-sm font-semibold"
                      style={{ color: themes.textWhite }}
                    >
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Right: PPF comparison row for this product */}
          {category.comparison && (() => {
            const row = category.comparison.rows.find(
              (r) => r.slug === product.slug
            );
            if (!row) return null;
            const specEntries = [
              { label: "Warranty", value: row.warranty },
              { label: "Thickness", value: row.thickness },
              { label: "TPU", value: row.tpu },
              { label: "Adhesive", value: row.adhesive },
              { label: "Anti-Yellowing", value: row.antiYellow },
              { label: "Elongation", value: row.elongation },
              { label: "Tear Strength", value: row.tearStrength },
            ];
            return (
              <div>
                <h2
                  className="text-xl sm:text-2xl font-bold mb-6"
                  style={{
                    color: themes.textWhite,
                    fontFamily: themes.fontPrimary,
                  }}
                >
                  Specifications
                </h2>
                <div className="space-y-3">
                  {specEntries.map((spec, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center px-4 py-3 rounded-lg border border-white/10"
                      style={{
                        backgroundColor: i % 2 === 0 ? "#0a0a2a" : "#0d0d30",
                      }}
                    >
                      <span
                        className="text-xs uppercase tracking-wider font-medium"
                        style={{ color: "#666680" }}
                      >
                        {spec.label}
                      </span>
                      <span
                        className="text-sm font-semibold"
                        style={{
                          color:
                            spec.value === "Not Applicable"
                              ? "#666680"
                              : themes.textWhite,
                        }}
                      >
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* Back to category and products hub */}
      <section
        className="py-10 border-t border-white/10"
        style={{ backgroundColor: "#07071a" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-wrap gap-6 justify-between items-center">
          <Link
            href={category.url}
            className="text-sm font-medium hover:opacity-80 transition flex items-center gap-2"
            style={{ color: "#a0a0b8" }}
          >
            ← Back to {category.name}
          </Link>
          <Link
            href="/products/"
            className="text-sm font-medium hover:opacity-80 transition flex items-center gap-2"
            style={{ color: "#a0a0b8" }}
          >
            View All Products →
          </Link>
        </div>
      </section>
    </div>
  );
}
