"use client";

import { useEffect, useRef, useState } from "react";
import InnerBanner from "../components/InnerBanner";
import CategoryCard from "../components/products/CategoryCard";
import { themes } from "../config/themeConfig";

const serviceBanner = "/images/serviceBanner.jpg";

/**
 * ProductsHubView — The /products/ hub page.
 * Displays all four categories as cards.
 *
 * @param {{ categories: Array }} props
 */
export default function ProductsHubView({ categories }) {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: themes.backgroundBlack }}
    >
      {/* Banner with breadcrumb */}
      <InnerBanner
        title="Our Products"
        current="Products"
        bg={serviceBanner}
      />

      {/* Intro section */}
      <section
        className="py-12 sm:py-16"
        style={{ backgroundColor: "#07071a" }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p
            className="text-base sm:text-lg leading-relaxed"
            style={{ color: "#a0a0b8" }}
          >
            HOGONN India manufactures premium protective films for vehicles —
            from paint protection film and window film to specialised windshield
            and sunroof protection. All films are made in India and are backed
            by industry-leading warranties.
          </p>
        </div>
      </section>

      {/* Categories grid */}
      <section
        ref={sectionRef}
        className={`
          max-w-7xl mx-auto px-4 sm:px-6
          py-12 sm:py-16 md:py-20
          transition-all duration-700 ease-out
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
        `}
      >
        <div className="mb-10 sm:mb-12 text-center">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold"
            style={{
              color: themes.textWhite,
              fontFamily: themes.fontPrimary,
            }}
          >
            Product Categories
          </h2>
          <div
            className="mx-auto mt-4 h-[2px] w-16"
            style={{ backgroundColor: themes.primary }}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section
        className="py-12 sm:py-16 border-t border-white/10"
        style={{ backgroundColor: "#07071a" }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p
            className="text-sm sm:text-base leading-relaxed mb-6"
            style={{ color: "#a0a0b8" }}
          >
            HOGONN films are supplied to detailing studios and installation
            centres across India. All body protection films carry anti-yellowing
            coverage for their full warranty term on clear and matte grades.
          </p>
          <a
            href="/contact"
            className="
              inline-flex items-center gap-2
              px-6 py-3 rounded-lg font-semibold text-sm
              transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5
            "
            style={{
              backgroundColor: themes.primary,
              color: themes.textWhite,
              fontFamily: themes.fontPrimary,
            }}
          >
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  );
}
