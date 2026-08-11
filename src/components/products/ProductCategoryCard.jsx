import Link from "next/link";
import { themes } from "../../config/themeConfig";

/**
 * ProductCategoryCard — Displays a single product within a category page.
 * Data-driven: all content comes from the product object.
 *
 * @param {{ product: Object, headingLevel?: string }} props
 *   headingLevel: "h3" (default) for use under an H2 section
 */
export default function ProductCategoryCard({ product, headingLevel = "h3" }) {
  const HeadingTag = headingLevel;

  return (
    <Link
      href={product.url}
      className="group block h-full"
      aria-label={`View details for ${product.name}`}
    >
      <div
        className="
          relative h-full rounded-xl border border-white/10
          transition-all duration-300
          hover:border-[var(--primary)] hover:-translate-y-1 hover:shadow-xl
          overflow-hidden flex flex-col
        "
        style={{ backgroundColor: "#0a0a2a" }}
      >
        {/* Left accent bar on hover */}
        <div
          className="absolute left-0 top-0 bottom-0 w-[3px] transition-all duration-300 opacity-0 group-hover:opacity-100"
          style={{ backgroundColor: themes.primary }}
        />

        <div className="p-5 sm:p-6 flex flex-col flex-1 pl-6">
          {/* Product name as heading */}
          <HeadingTag
            className="text-base sm:text-lg font-bold mb-2 leading-snug transition-colors duration-200"
            style={{
              color: themes.textWhite,
              fontFamily: themes.fontPrimary,
            }}
          >
            {product.h3 || product.name}
          </HeadingTag>

          {/* Short description */}
          {product.shortDescription && (
            <p
              className="text-xs sm:text-sm leading-relaxed flex-1 mb-4"
              style={{ color: "#a0a0b8" }}
            >
              {product.shortDescription}
            </p>
          )}

          {/* Warranty badge */}
          <div className="flex items-center justify-between mt-auto">
            <span
              className="inline-block text-xs font-semibold px-3 py-1 rounded-full"
              style={{
                backgroundColor: `${themes.primary}22`,
                color: themes.primary,
                border: `1px solid ${themes.primary}44`,
              }}
            >
              {product.warranty}
            </span>

            <span
              className="text-xs font-medium flex items-center gap-1 transition-colors duration-200"
              style={{ color: "#a0a0b8" }}
            >
              View Details
              <span
                className="transition-transform duration-300 group-hover:translate-x-1 inline-block"
                style={{ color: themes.primary }}
              >
                →
              </span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
