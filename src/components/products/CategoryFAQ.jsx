"use client";

import { useState } from "react";
import { themes } from "../../config/themeConfig";

/**
 * CategoryFAQ — Keyboard-accessible FAQ accordion for category pages.
 * Data-driven: renders from a faqs array of { q, a } objects.
 *
 * Accessibility:
 *   - Each question is a <button> (not a div) so keyboard users can activate it
 *   - aria-expanded reflects open/closed state
 *   - aria-controls links button to its answer panel
 *   - Answer panel has matching id attribute
 *   - Focus ring visible on focus
 *
 * @param {{ faqs: Array<{q: string, a: string}>, headingLevel?: string }} props
 */
export default function CategoryFAQ({ faqs = [], headingLevel = "h2", title = "Frequently Asked Questions" }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const HeadingTag = headingLevel;

  const toggle = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  if (!faqs || faqs.length === 0) return null;

  return (
    <section
      className="py-16 sm:py-20"
      style={{ backgroundColor: "#07071a" }}
      aria-label="Frequently Asked Questions"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section heading */}
        <div className="mb-10 sm:mb-12">
          <HeadingTag
            className="text-2xl sm:text-3xl font-bold text-center"
            style={{
              color: themes.textWhite,
              fontFamily: themes.fontPrimary,
            }}
          >
            {title}
          </HeadingTag>
          <div
            className="mx-auto mt-4 h-[2px] w-16"
            style={{ backgroundColor: themes.primary }}
          />
        </div>

        {/* FAQ items */}
        <dl className="space-y-3">
          {faqs.map((item, index) => {
            const isOpen = activeIndex === index;
            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-btn-${index}`;

            return (
              <div
                key={index}
                className="rounded-lg border transition-colors duration-200"
                style={{
                  borderColor: isOpen
                    ? `${themes.primary}66`
                    : "rgba(255,255,255,0.1)",
                  backgroundColor: isOpen ? "#0d0d30" : "#0a0a2a",
                }}
              >
                <dt>
                  <button
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(index)}
                    className="
                      w-full flex items-center justify-between
                      px-5 py-4 text-left
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]
                      rounded-lg
                    "
                  >
                    <span
                      className="text-sm sm:text-base font-medium pr-4 leading-snug"
                      style={{ color: themes.textWhite }}
                    >
                      {item.q}
                    </span>
                    <span
                      className={`flex-shrink-0 text-lg transition-transform duration-300 ${
                        isOpen ? "rotate-180" : "rotate-0"
                      }`}
                      aria-hidden="true"
                      style={{ color: themes.primary }}
                    >
                      ▼
                    </span>
                  </button>
                </dt>

                <dd
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <p
                    className="px-5 pb-5 text-sm leading-relaxed"
                    style={{ color: "#a0a0b8" }}
                  >
                    {item.a}
                  </p>
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
