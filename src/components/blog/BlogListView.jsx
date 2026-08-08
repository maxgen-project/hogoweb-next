"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import DecoratedTitle from "../DecoratedTitle";
import RollingButton from "../RollingButton";
import BlogCard from "./BlogCard";
import { categories, posts } from "./blogData";
import { themes } from "../../config/themeConfig";
import InnerBanner from "../InnerBanner";
const aboutBanner = "/images/carmodify2.png";
export default function BlogListView() {
  const [activeCategory, setActiveCategory] = useState("all");
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
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const filteredPosts =
    activeCategory === "all"
      ? posts
      : posts.filter((p) => p.categorySlug === activeCategory);

  return (
    <>
      {/* HEADER */}
      <InnerBanner
              title="Car Care and Paint Protection Guides"
              current="Blog"
              bg={aboutBanner}
            />
      <section
        className="py-20 md:py-28"
        style={{ backgroundColor: themes.backgroundBlack, color: themes.textWhite }}
      >
        <div className="mx-auto max-w-4xl px-6 text-center">
          <nav className="mb-6 text-xs uppercase tracking-widest text-white/40">
            <Link href="/" className="hover:text-red-500 transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white/70">Blog</span>
          </nav>

          <DecoratedTitle text="Car Care and Paint Protection Guides" color={themes.textWhite} />

          <p className="mt-6 text-sm leading-7 text-white/60 md:text-base">
            Practical guides on keeping your vehicle's paint and glass in good
            condition — what causes damage, what prevents it, and how paint
            protection film works. Written by the team that manufactures it.
          </p>
        </div>
      </section>

      {/* ARTICLES */}
      <section ref={sectionRef} className="py-16 md:py-20" style={{ backgroundColor: themes.backgroundBlack }}>
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-sm uppercase tracking-widest text-white/40 mb-6">
            Latest Articles
          </h2>

          {/* TOPIC FILTER */}
          <div className="mb-10 flex flex-wrap gap-3">
            <button
              onClick={() => setActiveCategory("all")}
              className={`rounded-full px-5 py-2 text-xs font-medium uppercase tracking-wider transition-colors
              ${activeCategory === "all" ? "bg-red-600 text-white" : "border border-white/20 text-white/60 hover:border-red-500 hover:text-red-500"}`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setActiveCategory(cat.slug)}
                className={`rounded-full px-5 py-2 text-xs font-medium uppercase tracking-wider transition-colors
                ${activeCategory === cat.slug ? "bg-red-600 text-white" : "border border-white/20 text-white/60 hover:border-red-500 hover:text-red-500"}`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post, i) => (
              <BlogCard key={post.slug} post={post} index={i} visible={visible} />
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <p className="text-white/50 text-sm">No articles in this category yet.</p>
          )}
        </div>
      </section>

      {/* TALK TO TEAM CTA */}
      <section className="py-16 text-center" style={{ backgroundColor: themes.backgroundGray }}>
        <h2 className="text-2xl font-semibold" style={{ color: themes.backgroundBlack }}>
          Talk to Our Team
        </h2>
        <p className="mt-3 text-sm" style={{ color: "rgba(0,0,0,0.65)" }}>
          Have a question we haven't covered yet?
        </p>
        <div className="mt-6 flex justify-center">
          <RollingButton text="Contact Us" onClick={() => (window.location.href = "/contact")} />
        </div>
      </section>
    </>
  );
}