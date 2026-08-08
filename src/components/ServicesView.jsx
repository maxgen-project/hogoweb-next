"use client";

import { useScrollAnimation } from "../hooks/useScrollAnimation";
import DecoratedTitle from "./DecoratedTitle";
import SectionHeading from "./SectionHeading";
import { themes } from "../config/themeConfig";
import ServiceCard from "../views/ServiceCard";

// Images
const s1 = "/images/service1.jpg";
const s2 = "/images/service2.jpg";
const s3 = "/images/service3.jpg";
const s4 = "/images/service4.png";
const s5 = "/images/service5.jpg";
const s6 = "/images/service6.png";

const b1 = "/images/brand1.svg";
const b2 = "/images/brand2.jpg";
const b3 = "/images/brand3.png";
const b4 = "/images/brand4.jpg";
const b5 = "/images/brand5.png";
const b6 = "/images/brand6.jpg";
const b7 = "/images/brand7.png";
const b8 = "/images/brand8.jpg";

// Data
const services = [
  { id: "01", title: "Self healing property", img: s1 },
  { id: "02", title: "High gloss film", img: s2 },
  { id: "03", title: "Super hydrophobic property", img: s3 },
  { id: "04", title: "Excellent stain resistance", img: s4 },
  { id: "05", title: "Good optical clarity", img: s5 },
  { id: "06", title: "Anti-yellowing property", img: s6 },
];

const brands = [b1, b2, b3, b4, b5, b6, b7, b8];

export default function ServicesView() {
  const [headerRef, headerVisible] = useScrollAnimation();
  const [gridRef, gridVisible] = useScrollAnimation();

  return (
    <>
      <section
        style={{
          background: themes.backgroundBlack,
          color: themes.textWhite,
        }}
      >
        <div className="max-w-[1200px] mx-auto px-6">
          {/* HEADER */}
          <div ref={headerRef} className="text-center mb-14 pt-14">
            <div
              className={`transition-all duration-700 ease-out
                ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
              `}
            >
              <DecoratedTitle
                text="WELCOME TO Hogonn India"
                style={{ color: themes.backgroundBlack }}
              />
            </div>

            <div
              className={`mt-4 transition-all duration-700 ease-out delay-150
                ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
              `}
            >
              <SectionHeading style={{ color: themes.textWhite }}>
                Premium Car Detailing
              </SectionHeading>
            </div>

            <p
              className={`max-w-2xl mx-auto mt-4 transition-all duration-700 ease-out delay-300
                ${headerVisible ? "opacity-80 translate-y-0" : "opacity-0 translate-y-10"}
              `}
            >
              Ensuring superior shine, long-term performance, and reliable protection for your vehicle in every condition.
            </p>
          </div>

          {/* SERVICES GRID */}
          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((item, index) => (
              <ServiceCard
                key={item.id}
                item={item}
                visible={gridVisible}
                delay={index * 450}
              />
            ))}
          </div>
        </div>
      </section>

      <BrandBand />
    </>
  );
}

/* ================= BRAND BAND ================= */

function BrandBand() {
  return (
    <div
      className="relative overflow-hidden py-16"
      style={{ backgroundColor: themes.backgroundBlack }}
    >
      <div className="flex gap-10 sm:gap-16 md:gap-24 w-max animate-marquee">
        {[...brands, ...brands].map((logo, i) => (
          <img
            key={i}
            src={logo}
            className="h-12 sm:h-16 md:h-20 opacity-70 hover:opacity-100 transition"
            alt="brand"
          />
        ))}
      </div>
    </div>
  );
}