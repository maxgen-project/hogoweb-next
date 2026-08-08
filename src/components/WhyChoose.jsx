"use client";

import { useEffect, useRef, useState } from "react";
import { themes } from "../config/themeConfig";
import DecoratedTitle from "./DecoratedTitle";
import SectionHeading from "./SectionHeading";

const cards = [
  {
    title: "Expert Technicians",
  },
  {
    title: "Premium Products",
  },
  {
    title: "Affordable Pricing",
  },
  {
    title: "Customer Satisfaction",
  },
];

export default function WhyChoose() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="relative w-full min-h-[10vh] py-12 md:py-16"
      style={{
        backgroundColor: themes.backgroundGray,
        fontFamily: themes.fontPrimary,
      }}
    >
      {/* ===== TOP CONTENT ===== */}
      <div
        className="
          max-w-7xl mx-auto
          px-4 sm:px-6 md:px-8
          flex flex-col items-center justify-center text-center gap-6
        "
      >
        <DecoratedTitle
          text="Trusted & Affordable"
          color={themes.backgroundBlack}
        />

        <div className="">
          <SectionHeading
            style={{ color: themes.backgroundBlack }}
          >
            WHY CHOOSE HOGONN INDIA?
          </SectionHeading>

          <p
            className="max-w-3xl mx-auto"
            style={{ color: themes.backgroundBlack, opacity: 0.8 }}
          >
            Hogonn India delivers a complete Paint Protection films range for premium-quality protection with advanced technology, exceptional durability, and trusted OEM heritage ensuring superior shine, long-term performance, and reliable protection for your vehicle in every condition. </p>
        </div>
      </div>

      {/* ===== CARDS SECTION (DYNAMIC) ===== */}
      <div
        className="
          relative z-10 max-w-7xl mx-auto
          px-4 sm:px-6 md:px-8
          pt-12 sm:pt-10 md:pt-8 lg:pt-6
          pb-12 md:pb-16
 
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          gap-4 sm:gap-5 md:gap-6
        "
      >
        {cards.map((card, index) => (
          <div
            ref={ref}
            key={index}
            className="p-7 sm:p-8 rounded-lg transition-all duration-300"
            style={{ backgroundColor: themes.backgroundBlack }}
          >
            <h3
              className="text-lg sm:text-xl font-semibold mb-2 text-center justify-center"
              style={{ color: themes.textWhite }}
            >
              {card.title}
            </h3>
            <p
              className={`
    text-sm sm:text-base
    transition-all duration-2000 ease-out
    ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
  `}
              style={{ color: themes.textWhite }}
            >
              {card.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
