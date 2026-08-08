"use client";

import { useEffect, useRef, useState } from "react";
import { themes } from "../config/themeConfig";
import { apiInfo } from "../service/api";

export default function ShopSidebar({ setSelectedCategory }) {
  const [active, setActive] = useState("");
  const [visible, setVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const sidebarRef = useRef(null);

  const handleCategory = (cat) => {
    setActive(cat);
    setSelectedCategory(cat);
  };

  // FETCH CATEGORY FROM API
  useEffect(() => {
    apiInfo
      .get("/category/")
      .then((res) => {
        setCategories(res.data.data || []);
      })
      .catch((err) => {
        console.error("Category fetch error:", err);
      });
  }, []);

  // animation observer
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

    if (sidebarRef.current) observer.observe(sidebarRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sidebarRef}
      className={`w-full lg:sticky lg:top-28 transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
      }`}
    >
      <div
        className="p-5 sm:p-6 rounded-xl border border-white/10 transition duration-300 hover:border-white/30"
        style={{ background: themes.sidebar }}
      >
        <h3 className="mb-5 text-lg sm:text-xl font-bold text-white">
          Categories
        </h3>

        <div className="space-y-3 text-sm sm:text-base text-gray-300">
          {/* All */}
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="radio"
              name="category"
              className="accent-red-500"
              defaultChecked
              onChange={() => handleCategory("")}
            />
            <span
              className={`transition-all duration-300 group-hover:text-white ${
                active === "" ? "text-white font-semibold scale-105" : ""
              }`}
            >
              All
            </span>
          </label>

          {/* Dynamic from API */}
          {categories.map((cat) => (
            <label
              key={cat.id}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="radio"
                name="category"
                className="accent-red-500"
                onChange={() => handleCategory(cat.name)}
              />

              <span
                className={`transition-all duration-300 group-hover:text-white ${
                  active === cat.name
                    ? "text-white font-semibold scale-105"
                    : ""
                }`}
              >
                {cat.name}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}