"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FaShieldAlt, FaSun, FaCarSide, FaCircleNotch } from "react-icons/fa";
import DecoratedTitle from "../DecoratedTitle";
import { themes } from "../../config/themeConfig";

const manufactures = [
  {
    icon: FaShieldAlt,
    title: "Paint Protection Film",
    description:
      "Six grades across gloss, matte, black gloss and black matte at 188 microns, with warranties from 6 to 10 years and anti-yellowing cover for the full term on our clear and matte films.",
    href: "/products/paint-protection-film/",
  },
  {
    icon: FaSun,
    title: "Safety Glaze Window Film",
    description:
      "Safety Glaze YUKI in 50% and 70% VLT, rejecting up to 99.70% of ultraviolet and up to 98.40% of infrared, with a 10-year warranty.",
    href: "/products/safety-glaze-window-film/",
  },
  {
    icon: FaCarSide,
    title: "Windshield Protection Films",
    description:
      "Dedicated 163-micron films engineered for optical clarity on glass, protecting the most exposed surfaces on the vehicle.",
    href: "/products/windshield-ppf/",
  },
  {
    icon: FaCircleNotch,
    title: "Sunroof Films",
    description:
      "A 163-micron film for panoramic and conventional sunroofs, shielding against scratches, minor impacts and UV exposure while maintaining the original appearance of the glass.",
    href: "/products/sunroof-ppf/",
  },
];

export default function WhatWeManufacture() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28"
      style={{ backgroundColor: themes.backgroundBlack, color: themes.textWhite }}
    >
      <div className="mx-auto max-w-[900px] px-6">
        <div
          className={`mb-14 transition-all duration-700 ease-out
          ${visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          <DecoratedTitle text="What Hogonn India Manufactures?" color={themes.textWhite} />
        </div>

        <div className="flex flex-col">
          {manufactures.map((item, index) => (
            <ManufactureRow key={item.title} item={item} index={index} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ManufactureRow({ item, index, visible }) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className={`group flex items-start gap-6 py-8 border-b border-white/10
      transition-all duration-700
      ${visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div
        className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-white/20
        transition-all duration-500 group-hover:border-red-500 group-hover:bg-red-600"
      >
        <Icon size={18} className="text-white/70 transition-colors duration-500 group-hover:text-white" />
      </div>

      <div className="flex-1">
        <h3 className="text-xl font-semibold text-white transition-colors duration-300 group-hover:text-red-500 md:text-2xl">
          {item.title}
        </h3>
        <p className="mt-2 text-sm leading-6 text-white/60 md:text-base">
          {item.description}
        </p>
      </div>

      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="mt-2 flex-shrink-0 text-white/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-red-500"
      >
        <path d="M5 12h14" />
        <path d="M13 6l6 6-6 6" />
      </svg>
    </Link>
  );
}