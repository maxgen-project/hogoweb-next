import Link from "next/link";
import { themes } from "../../config/themeConfig";

/**
 * CategoryCard — Displays a product category on the hub page (/products/).
 * Data-driven: all content comes from the category object.
 *
 * @param {{ category: Object }} props
 */
export default function CategoryCard({ category }) {
  return (
    <Link
      href={category.url}
      className="group block h-full"
      aria-label={`View ${category.name}`}
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
        {/* Top accent bar */}
        <div
          className="h-1 w-full transition-all duration-300 group-hover:h-[3px]"
          style={{ backgroundColor: themes.primary }}
        />

        <div className="p-6 sm:p-8 flex flex-col flex-1">
          {/* Product count badge */}
          <span
            className="inline-block text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-4 w-fit"
            style={{
              backgroundColor: `${themes.primary}22`,
              color: themes.primary,
              border: `1px solid ${themes.primary}44`,
            }}
          >
            {category.productCountLabel}
          </span>

          {/* Category name */}
          <h2
            className="text-xl sm:text-2xl font-bold mb-3 leading-tight transition-colors duration-200"
            style={{
              color: themes.textWhite,
              fontFamily: themes.fontPrimary,
            }}
          >
            {category.name}
          </h2>

          {/* Short description */}
          <p
            className="text-sm leading-relaxed flex-1 mb-6"
            style={{ color: "#a0a0b8" }}
          >
            {category.shortDescription}
          </p>

          {/* CTA */}
          <div className="flex items-center gap-2 mt-auto">
            <span
              className="text-sm font-semibold tracking-wide transition-colors duration-200"
              style={{ color: themes.primary }}
            >
              Explore Range
            </span>
            <span
              className="transition-transform duration-300 group-hover:translate-x-1"
              style={{ color: themes.primary }}
            >
              →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
