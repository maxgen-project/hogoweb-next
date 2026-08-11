import { themes } from "../../config/themeConfig";

/**
 * CategoryFeatures — Renders the features grid for a category page.
 * Data-driven: renders from category.features array.
 *
 * @param {{ features: Array<{id, h3, description}>, headingH2: string, headingLevel?: string }} props
 */
export default function CategoryFeatures({
  features = [],
  headingH2 = "Features",
  headingLevel = "h2",
}) {
  const HeadingTag = headingLevel;

  if (!features || features.length === 0) return null;

  return (
    <section
      className="py-16 sm:py-20"
      style={{ backgroundColor: themes.backgroundBlack }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section heading */}
        <div className="mb-10 sm:mb-12 text-center">
          <HeadingTag
            className="text-2xl sm:text-3xl font-bold"
            style={{
              color: themes.textWhite,
              fontFamily: themes.fontPrimary,
            }}
          >
            {headingH2}
          </HeadingTag>
          <div
            className="mx-auto mt-4 h-[2px] w-16"
            style={{ backgroundColor: themes.primary }}
          />
        </div>

        {/* Features grid */}
        <div
          className={`
            grid gap-6
            grid-cols-1
            sm:grid-cols-2
            ${features.length >= 3 ? "lg:grid-cols-2" : ""}
            ${features.length >= 4 ? "xl:grid-cols-4" : ""}
          `}
        >
          {features.map((feature, index) => (
            <div
              key={feature.id || index}
              className="
                relative rounded-xl border border-white/10
                p-6 sm:p-7
                transition-all duration-300
                hover:border-[var(--primary)]/40 hover:shadow-lg
              "
              style={{ backgroundColor: "#0a0a2a" }}
            >
              {/* Number indicator */}
              <div
                className="
                  text-xs font-bold tracking-widest uppercase mb-4
                  w-8 h-8 rounded-full flex items-center justify-center
                "
                style={{
                  backgroundColor: `${themes.primary}22`,
                  color: themes.primary,
                  border: `1px solid ${themes.primary}44`,
                  fontFamily: themes.fontPrimary,
                }}
              >
                {String(index + 1).padStart(2, "0")}
              </div>

              {/* Feature heading — always h3 semantically */}
              <h3
                className="text-base sm:text-lg font-semibold mb-3 leading-snug"
                style={{
                  color: themes.textWhite,
                  fontFamily: themes.fontPrimary,
                }}
              >
                {feature.h3}
              </h3>

              <p
                className="text-sm leading-relaxed"
                style={{ color: "#a0a0b8" }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
