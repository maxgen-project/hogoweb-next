"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import DecoratedTitle from "./DecoratedTitle";
import RollingButton from "./RollingButton";
import { themes } from "../config/themeConfig";

const products = [
  {
    number: "01",
    title: "Paint Protection Films",
    description:
      "Premium paint protection films designed to protect your vehicle's paint from scratches, stone chips and everyday road damage.",
    href: "/products/paint-protection-film",
    image: "/images/products/ppf.jpg",
  },
  {
    number: "02",
    title: "Safety Glaze Window Films",
    description:
      "Advanced window protection films offering enhanced safety, heat rejection and a comfortable driving experience.",
    href: "/products/window-safety-glaze",
    image: "/images/products/window-film.jpg",
  },
  {
    number: "03",
    title: "Windshield Protection Film",
    description:
      "High-performance windshield protection film engineered to help protect your windshield from road debris and impact.",
    href: "/products/windshield-protection-film",
    image: "/images/products/windshield-film.jpg",
  },
  {
    number: "04",
    title: "Sunroof Protection Film",
    description:
      "Specialized sunroof films providing protection and improved comfort while maintaining the premium appearance of your vehicle.",
    href: "/products/sunroof-protection-film",
    image: "/images/products/sunroof-film.jpg",
  },
];

export default function AutomotiveProducts() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const router = useRouter();

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-20 md:py-28"
      style={{
        backgroundColor: themes.backgroundBlack,
        color: themes.textWhite,
      }}
    >
      {/* Decorative background */}
      <div className="absolute top-0 right-0 h-72 w-72 rounded-full bg-red-600/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-red-600/5 blur-3xl" />

      <div className="relative mx-auto max-w-[1200px] px-6">
        {/* ================= HEADER ================= */}
        <div
          className={`mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between
          transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
          ${visible
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
            }`}
        >
          <div>
            <DecoratedTitle
              text="Automotive Care Products We Offer"
              color={themes.textWhite}
            />

            <p
              className="mt-5 max-w-2xl text-sm leading-7 md:text-base"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              Discover HOGONN's range of premium automotive protection films,
              engineered to deliver superior protection, comfort and long-term
              performance.
            </p>
          </div>

          <div className="hidden md:block">
            <span className="text-xs uppercase tracking-[0.3em] text-white/40">
              Automotive Solutions
            </span>
          </div>
        </div>

        {/* ================= PRODUCT GRID ================= */}
        <div className="grid grid-cols-1 gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2">
          {products.map((product, index) => (
            <ProductCard
              key={product.number}
              product={product}
              index={index}
              visible={visible}
              onClick={() => router.push(product.href)}
            />
          ))}
        </div>

        {/* ================= BOTTOM CTA ================= */}
        <div
          className={`mt-12 flex justify-center
          transition-all duration-700 delay-500
          ${visible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
            }`}
        >
          {/* <RollingButton
            text="Explore All Products"
            onClick={() => router.push("/products")}
          /> */}
        </div>
      </div>
    </section>
  );
}


/* =========================================================
   PRODUCT CARD
========================================================= */

function ProductCard({ product, index, visible, onClick }) {
  return (
    <div
      className={`group relative min-h-[390px] overflow-hidden bg-[#151515]
      transition-all duration-700
      ${visible
          ? "translate-y-0 opacity-100"
          : "translate-y-12 opacity-0"
        }`}
      style={{
        transitionDelay: `${index * 120}ms`,
      }}
    >
      {/* Product Image */}
      <img
        src={product.image}
        alt={product.title}
        className="absolute inset-0 h-full w-full object-cover
        opacity-25
        transition-all duration-700
        group-hover:scale-105
        group-hover:opacity-45"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20" />

      {/* Red hover line */}
      <div
        className="absolute left-0 top-0 h-[3px] w-0
        bg-red-600 transition-all duration-500
        group-hover:w-full"
      />

      {/* Content */}
      <div className="relative flex h-full flex-col justify-between p-7 md:p-9">
        {/* Number */}
        <div className="flex items-start justify-between">
          <span
            className="text-5xl font-light tracking-tight text-white/20
            transition-all duration-500
            group-hover:text-red-500/70"
          >
            {product.number}
          </span>

          <div
            className="flex h-10 w-10 items-center justify-center
            rounded-full border border-white/20
            transition-all duration-500
            group-hover:border-red-500
            group-hover:bg-red-600"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-white transition-transform duration-500 group-hover:rotate-45"
            >
              <path d="M5 12h14" />
              <path d="M13 6l6 6-6 6" />
            </svg>
          </div>
        </div>

        {/* Bottom content */}
        <div>
          <h3
            className="max-w-sm text-2xl font-semibold leading-tight text-white
            md:text-3xl"
          >
            {product.title}
          </h3>

          <p className="mt-4 max-w-md text-sm leading-6 text-white/60">
            {product.description}
          </p>

          <button
            onClick={onClick}
            className="mt-7 inline-flex items-center gap-3
            text-xs font-medium uppercase tracking-[0.2em]
            text-white transition-all duration-300
            hover:text-red-500"
          >
            Discover More

            <span
              className="h-px w-8 bg-red-600
              transition-all duration-300
              group-hover:w-12"
            />
          </button>
        </div>
      </div>
    </div>
  );
}