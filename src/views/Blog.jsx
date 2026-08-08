"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { themes } from "../config/themeConfig";
import InnerBanner from "../components/InnerBanner";
import { BASE } from "../service/api";

const blogBanner = "/images/blogBanner.jpg";

export default function Blog() {
  const heroRef = useRef(null);
  const gridRef = useRef(null);

  const [heroVisible, setHeroVisible] = useState(false);
  const [gridVisible, setGridVisible] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  /* FETCH BLOGS */
  useEffect(() => {
    fetch(`${BASE}/blogs/`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setBlogs(data.data);
          sessionStorage.setItem("blogs", JSON.stringify(data.data));
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  /* SCROLL ANIMATION */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === heroRef.current) setHeroVisible(true);
            if (entry.target === gridRef.current) setGridVisible(true);
          }
        });
      },
      { threshold: 0.3 },
    );

    if (heroRef.current) observer.observe(heroRef.current);
    if (gridRef.current) observer.observe(gridRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* HERO */}
      <InnerBanner title="Blog" current="Blog" bg={blogBanner} />

      {/* BLOG GRID */}
      <section
        className="py-24 px-6"
        style={{ backgroundColor: themes.backgroundGray }}
      >
        <div className="max-w-7xl mx-auto">
          <div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-2xl overflow-hidden animate-pulse"
                  >
                    <div className="h-[260px] bg-gray-700" />
                    <div className="p-6 space-y-4">
                      <div className="h-4 bg-gray-600 w-1/2 rounded" />
                      <div className="h-4 bg-gray-600 w-3/4 rounded" />
                    </div>
                  </div>
                ))
              : blogs.map((item, index) => {
                  const formattedDate = new Date(item.date).toLocaleDateString(
                    "en-GB",
                    {
                      day: "2-digit",
                      month: "short",
                    },
                  );

                  return (
                    <Link
                      key={item.id}
                      href={`/blog/${item.id}`}
                      className={`rounded-2xl overflow-hidden transition-all duration-700 block hover:-translate-y-1 hover:shadow-2xl ${
                        gridVisible
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 translate-x-16"
                      }`}
                      style={{
                        backgroundColor: themes.backgroundBlack,
                        transitionDelay: `${index * 180}ms`,
                        textDecoration: "none",
                      }}
                    >
                      <img
                        src={`${BASE}${item.image}`}
                        alt={item.title}
                        className="w-full h-[260px] object-cover transition-transform duration-700 hover:scale-105"
                        loading="lazy"
                      />

                      <div className="p-6 relative">
                        <div
                          className="absolute -top-8 left-6 w-[60px] h-[70px] rounded-lg flex flex-col items-center justify-center text-center shadow-lg"
                          style={{ backgroundColor: themes.primary }}
                        >
                          <span className="text-xl font-bold text-white">
                            {formattedDate}
                          </span>
                        </div>

                        <h3
                          className="text-lg font-semibold mt-8 leading-snug"
                          style={{ color: themes.textWhite }}
                        >
                          {item.title}
                        </h3>
                      </div>
                    </Link>
                  );
                })}
          </div>
        </div>
      </section>
    </>
  );
}
