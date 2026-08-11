import Link from "next/link";
import { themes } from "../../config/themeConfig";

/**
 * CategoryCrossLinks — Renders "Explore Other Products" section with links
 * to sibling categories. Used at the bottom of every category page.
 *
 * @param {{ crossLinks: Array<{slug, name, shortDescription, productCountLabel, url}>, currentSlug: string }} props
 */
export default function CategoryCrossLinks({ crossLinks = [], currentSlug }) {
  if (!crossLinks || crossLinks.length === 0) return null;

  return (
    <section
      className="py-16 sm:py-20"
      style={{ backgroundColor: "#07071a" }}
      aria-label="Explore other HOGONN products"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="mb-10 sm:mb-12 text-center">
          <h2
            className="text-2xl sm:text-3xl font-bold"
            style={{
              color: themes.textWhite,
              fontFamily: themes.fontPrimary,
            }}
          >
            Explore Other HOGONN Products
          </h2>
          <div
            className="mx-auto mt-4 h-[2px] w-16"
            style={{ backgroundColor: themes.primary }}
          />
        </div>

        {/* Cross-links grid */}
        <div
          className={`
            grid gap-4
            grid-cols-1
            sm:grid-cols-2
            ${crossLinks.length >= 3 ? "lg:grid-cols-3" : ""}
          `}
        >
          {crossLinks.map((cat) => (
            <Link
              key={cat.slug}
              href={cat.url}
              className="group block"
              aria-label={`Explore ${cat.name}`}
            >
              <div
                className="
                  rounded-xl border border-white/10 p-5 sm:p-6
                  flex items-center gap-4
                  transition-all duration-300
                  hover:border-[var(--primary)]/50 hover:shadow-lg hover:-translate-y-0.5
                "
                style={{ backgroundColor: "#0a0a2a" }}
              >
                {/* Arrow icon */}
                <div
                  className="
                    flex-shrink-0 w-10 h-10 rounded-full
                    flex items-center justify-center
                    transition-transform duration-300 group-hover:translate-x-1
                  "
                  style={{
                    backgroundColor: `${themes.primary}22`,
                    border: `1px solid ${themes.primary}44`,
                  }}
                >
                  <span
                    className="text-base font-bold"
                    style={{ color: themes.primary }}
                    aria-hidden="true"
                  >
                    →
                  </span>
                </div>

                <div className="min-w-0">
                  <p
                    className="font-semibold text-sm sm:text-base leading-snug mb-0.5 truncate"
                    style={{
                      color: themes.textWhite,
                      fontFamily: themes.fontPrimary,
                    }}
                  >
                    {cat.name}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: themes.primary }}
                  >
                    {cat.productCountLabel}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Back to all products */}
        <div className="mt-8 text-center">
          <Link
            href="/products/"
            className="
              inline-flex items-center gap-2 text-sm font-medium
              transition-colors duration-200
              hover:opacity-80
            "
            style={{ color: "#a0a0b8" }}
          >
            ← View All Product Categories
          </Link>
        </div>
      </div>
    </section>
  );
}
