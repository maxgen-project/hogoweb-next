"use client";

import Link from "next/link";
import { themes } from "../config/themeConfig";
import { BASE } from "../service/api";
import { useEffect, useRef, useState } from "react";

export default function ProductCard({ product }) {
  const [visible, setVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) observer.observe(cardRef.current);

    return () => observer.disconnect();
  }, []);

  const imageUrl = product?.thumbnail_image
    ? product.thumbnail_image.startsWith("http")
      ? product.thumbnail_image
      : `${BASE}${product.thumbnail_image}`
    : "/images/serviceBanner.jpg";

  const cleanedName = (product?.product_name || "")
    .replace(/\s+/g, " ")
    .trim();

  return (
    <Link href={`/product/${product.slug}`} className="block h-full w-full">
      <div
        ref={cardRef}
        className={`group rounded-xl overflow-hidden shadow-lg border border-white/20
          transition-all duration-700 ease-out
          flex flex-col h-[380px] w-full
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
          hover:-translate-y-2 hover:shadow-2xl`}
        style={{ background: themes.textWhite }}
      >
        {/* Image - fixed height, prevents shrinking */}
        <div className="h-[200px] sm:h-[200px] md:h-[300px] overflow-hidden flex items-center justify-center bg-[#f7f7f7] flex-shrink-0">
          <img
            src={imageUrl}
            alt={cleanedName}
            className="max-h-full object-contain transition duration-500 group-hover:scale-110"
          />
        </div>

        {/* Content - reduced padding */}
        <div
          className="p-2 sm:p-3 md:p-4 text-center flex-1 flex flex-col justify-center"
          style={{ background: themes.backgroundBlack }}
        >
          <h3 className="text-sm sm:text-base md:text-lg font-semibold text-white leading-snug line-clamp-2 px-6">
            {cleanedName}
          </h3>
        </div>
      </div>
    </Link>
  );
}