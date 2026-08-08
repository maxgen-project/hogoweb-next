"use client";

import { useEffect, useRef, useState } from "react";
import InnerBanner from "../components/InnerBanner";
import { themes } from "../config/themeConfig";
import ShopSidebar from "../components/ShopSidebar";
import ProductGrid from "../components/ProductGrid";

const serviceBanner = "/images/serviceBanner.jpg";

export default function ShopView() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

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
      style={{ background: themes.backgroundBlack }}
      className="min-h-screen"
    >
      {/* Banner */}
      <InnerBanner
        title="Product"
        current="Shop"
        bg={serviceBanner}
      />

      {/* Shop Section */}
      <section
        ref={sectionRef}
        className={`
        max-w-7xl
        mx-auto
        px-4 sm:px-6
        py-10 sm:py-14 md:py-16
        grid
        grid-cols-1
        lg:grid-cols-4
        gap-8 lg:gap-10
        transition-all
        duration-700
        ease-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
      `}
      >
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <ShopSidebar
            categories={categories}
            setSelectedCategory={setSelectedCategory}
          />
        </div>

        {/* Products */}
        <div className="lg:col-span-3">
          <ProductGrid
            selectedCategory={selectedCategory}
            setCategories={setCategories}
          />
        </div>
      </section>
    </div>
  );
}