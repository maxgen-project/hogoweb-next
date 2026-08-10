"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { themes } from "../config/themeConfig";
import InnerBanner from "../components/InnerBanner";
import { BASE } from "../service/api";
import { BLOG_POSTS, BLOG_CATEGORIES } from "../data/blogData";

const blogBanner = "/images/blogBanner.jpg";

/* ── helpers ── */
function formatDateVisible(isoString) {
  const d = new Date(isoString);
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatDateBadge(isoString) {
  const d = new Date(isoString);
  const day = d.toLocaleDateString("en-GB", { day: "2-digit" });
  const month = d.toLocaleDateString("en-GB", { month: "short" });
  return { day, month };
}

export default function Blog() {
  const gridRef = useRef(null);
  const topicsRef = useRef(null);
  const ctaRef = useRef(null);

  const [gridVisible, setGridVisible] = useState(false);
  const [topicsVisible, setTopicsVisible] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ── FETCH BLOGS from API; fall back to local dummy data ── */
  useEffect(() => {
    fetch(`${BASE}/blogs/`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          /* API has data — use it */
          setBlogs(data.data);
          sessionStorage.setItem("blogs", JSON.stringify(data.data));
        } else {
          /* API returned empty or unsuccessful — fall back to local dummy data */
          setBlogs(BLOG_POSTS);
        }
        setLoading(false);
      })
      .catch(() => {
        /* API unreachable — fall back to local dummy data */
        setBlogs(BLOG_POSTS);
        setLoading(false);
      });
  }, []);

  /* ── SCROLL ANIMATIONS ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === gridRef.current) setGridVisible(true);
            if (entry.target === topicsRef.current) setTopicsVisible(true);
            if (entry.target === ctaRef.current) setCtaVisible(true);
          }
        });
      },
      { threshold: 0.15 },
    );

    if (gridRef.current) observer.observe(gridRef.current);
    if (topicsRef.current) observer.observe(topicsRef.current);
    if (ctaRef.current) observer.observe(ctaRef.current);

    return () => observer.disconnect();
  }, []);

  /* ── helper: build the card href ── */
  function cardHref(item) {
    /* Slug-based articles (local dummy data) have a `slug` field */
    if (item.slug) return item.slug;
    /* API-based articles use numeric id */
    return `/blog/${item.id}`;
  }

  /* ── helper: image src ── */
  function imgSrc(item) {
    /* Local dummy data has absolute paths starting with "/" */
    if (item.image && item.image.startsWith("/")) return item.image;
    /* API data has paths relative to BASE */
    return `${BASE}${item.image}`;
  }

  return (
    <>
      {/* ── HERO BANNER ── */}
      <InnerBanner
        title="Car Care and Paint Protection Guides"
        current="Blog"
        bg={blogBanner}
      />

      {/* ── INTRO PARAGRAPH ── */}
      <section
        className="py-10 px-6"
        style={{ backgroundColor: themes.backgroundBlack }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <p
            className="text-base sm:text-lg leading-relaxed"
            style={{ color: themes.textWhite, opacity: 0.75 }}
          >
            Practical guides on keeping your vehicle&apos;s paint and glass in
            good condition — what causes damage, what prevents it, and how paint
            protection film works. Written by the team that manufactures it.
          </p>
        </div>
      </section>

      {/* ── LATEST ARTICLES ── */}
      <section
        className="py-16 px-6"
        style={{ backgroundColor: themes.backgroundBlack }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Section heading */}
          <div className="mb-12 text-center">
            <span
              className="text-xs font-semibold uppercase tracking-[0.3em]"
              style={{ color: themes.primary }}
            >
              Fresh From the Team
            </span>
            <h2
              className="mt-3 text-3xl sm:text-4xl font-bold uppercase"
              style={{
                color: themes.textWhite,
                fontFamily: themes.fontPrimary,
              }}
            >
              Latest Articles
            </h2>
            <div
              className="mx-auto mt-4 h-[2px] w-16"
              style={{ backgroundColor: themes.primary }}
            />
          </div>

          {/* Cards grid */}
          <div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {loading
              ? /* Loading skeleton */
                Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-2xl overflow-hidden animate-pulse"
                    style={{ backgroundColor: "#0a0a2a" }}
                  >
                    <div className="h-[240px] bg-gray-700" />
                    <div className="p-6 space-y-4">
                      <div className="h-3 bg-gray-600 w-1/3 rounded" />
                      <div className="h-4 bg-gray-600 w-3/4 rounded" />
                      <div className="h-3 bg-gray-600 w-full rounded" />
                      <div className="h-3 bg-gray-600 w-2/3 rounded" />
                    </div>
                  </div>
                ))
              : blogs.map((item, index) => {
                  const isLocal = !!item.slug;
                  const badgeDate = isLocal
                    ? formatDateBadge(item.date)
                    : (() => {
                        const d = new Date(item.date);
                        return {
                          day: d.toLocaleDateString("en-GB", { day: "2-digit" }),
                          month: d.toLocaleDateString("en-GB", {
                            month: "short",
                          }),
                        };
                      })();
                  const visibleDate = isLocal
                    ? item.dateFormatted
                    : formatDateVisible(item.date);

                  return (
                    <article
                      key={item.id}
                      className={`rounded-2xl overflow-hidden transition-all duration-700 flex flex-col ${
                        gridVisible
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-12"
                      }`}
                      style={{
                        backgroundColor: "#0a0a2a",
                        border: "1px solid rgba(255,255,255,0.06)",
                        transitionDelay: `${index * 150}ms`,
                      }}
                    >
                      {/* Article image */}
                      <div className="relative overflow-hidden h-[240px]">
                        <img
                          src={imgSrc(item)}
                          alt={item.altText || item.title}
                          width={item.imageWidth || 800}
                          height={item.imageHeight || 533}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                        {/* Category tag overlay */}
                        {(item.categoryLabel || item.tag) && (
                          <span
                            className="absolute top-4 left-4 px-3 py-1 rounded text-xs font-semibold uppercase tracking-wide"
                            style={{
                              backgroundColor: themes.primary,
                              color: "#fff",
                            }}
                          >
                            {item.categoryLabel || item.tag}
                          </span>
                        )}
                      </div>

                      {/* Card body */}
                      <div className="p-6 relative flex flex-col flex-1">
                        {/* Date badge */}
                        <div
                          className="absolute -top-8 right-6 w-[60px] h-[60px] rounded-lg flex flex-col items-center justify-center text-center shadow-lg"
                          style={{ backgroundColor: themes.primary }}
                        >
                          <span className="text-base font-bold text-white leading-none">
                            {badgeDate.day}
                          </span>
                          <span className="text-[10px] text-white/80 uppercase">
                            {badgeDate.month}
                          </span>
                        </div>

                        {/* Visible date text */}
                        <time
                          dateTime={item.date || item.dateISO}
                          className="block text-xs mb-3 mt-2"
                          style={{ color: themes.backgroundGray }}
                        >
                          {visibleDate}
                          {item.readTime && (
                            <span className="ml-3">· {item.readTime}</span>
                          )}
                        </time>

                        {/* H3 title as link */}
                        <h3
                          className="text-base sm:text-lg font-semibold leading-snug mb-3"
                          style={{ color: themes.textWhite }}
                        >
                          <Link
                            href={cardHref(item)}
                            className="hover:underline transition-colors duration-200"
                            style={{ color: "inherit" }}
                          >
                            {item.title}
                          </Link>
                        </h3>

                        {/* Excerpt */}
                        {item.excerpt && (
                          <p
                            className="text-sm leading-relaxed mb-4 flex-1"
                            style={{ color: themes.textWhite, opacity: 0.65 }}
                          >
                            {item.excerpt}
                          </p>
                        )}

                        {/* Read more link */}
                        <Link
                          href={cardHref(item)}
                          className="inline-flex items-center gap-2 text-sm font-semibold mt-auto transition-colors duration-200 hover:underline"
                          style={{ color: themes.primary }}
                          aria-label={`Read more about ${item.title}`}
                        >
                          Read More{" "}
                          <span aria-hidden="true" className="text-base">
                            →
                          </span>
                        </Link>
                      </div>
                    </article>
                  );
                })}
          </div>
        </div>
      </section>

      {/* ── BROWSE BY TOPIC ── */}
      <section
        className="py-16 px-6"
        style={{ backgroundColor: "#07071a" }}
      >
        <div className="max-w-7xl mx-auto">
          <div
            ref={topicsRef}
            className={`transition-all duration-700 ${
              topicsVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {/* Section heading */}
            <div className="mb-10 text-center">
              <h2
                className="text-3xl sm:text-4xl font-bold uppercase"
                style={{
                  color: themes.textWhite,
                  fontFamily: themes.fontPrimary,
                }}
              >
                Browse by Topic
              </h2>
              <div
                className="mx-auto mt-4 h-[2px] w-16"
                style={{ backgroundColor: themes.primary }}
              />
            </div>

            {/* Category tags */}
            <div className="flex flex-wrap gap-4 justify-center">
              {BLOG_CATEGORIES.map((cat) => (
                <span
                  key={cat.id}
                  className="px-6 py-3 rounded-lg text-sm font-semibold uppercase tracking-wide border"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.04)",
                    borderColor: "rgba(255,255,255,0.12)",
                    color: themes.textWhite,
                    /* Category pages won't be created until ≥3 articles exist;
                       rendered as non-linked tags for now */
                  }}
                >
                  {cat.label}
                  {cat.articleCount > 0 && (
                    <span
                      className="ml-2 text-xs font-normal"
                      style={{ color: themes.primary }}
                    >
                      {cat.articleCount}
                    </span>
                  )}
                </span>
              ))}
            </div>

            <p
              className="mt-6 text-center text-xs"
              style={{ color: themes.textWhite, opacity: 0.35 }}
            >
              Category pages will be published once three articles exist per
              topic.
            </p>
          </div>
        </div>
      </section>

      {/* ── TALK TO OUR TEAM CTA ── */}
      <section
        className="relative py-20 px-6 overflow-hidden"
        style={{ backgroundColor: themes.backgroundBlack }}
      >
        {/* Decorative glows */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-red-600/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-red-600/5 blur-3xl" />

        <div
          ref={ctaRef}
          className={`max-w-3xl mx-auto text-center transition-all duration-700 ${
            ctaVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <span
            className="text-xs font-semibold uppercase tracking-[0.3em]"
            style={{ color: themes.primary }}
          >
            Get Expert Advice
          </span>

          <h2
            className="mt-4 text-3xl sm:text-4xl font-bold uppercase leading-tight"
            style={{
              color: themes.textWhite,
              fontFamily: themes.fontPrimary,
            }}
          >
            Talk to Our Team
          </h2>

          <p
            className="mt-5 text-base leading-relaxed max-w-xl mx-auto"
            style={{ color: themes.textWhite, opacity: 0.65 }}
          >
            Have a question about protecting your car, choosing the right film
            or finding an installer? Our team is here to help.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-block px-8 py-3 rounded-md font-semibold text-sm transition-all duration-300 hover:opacity-90"
              style={{
                backgroundColor: themes.primary,
                color: "#fff",
              }}
            >
              Contact Us
            </Link>
            <Link
              href="/product"
              className="inline-block px-8 py-3 rounded-md font-semibold text-sm transition-all duration-300 border"
              style={{
                borderColor: "rgba(255,255,255,0.25)",
                color: themes.textWhite,
              }}
            >
              Explore Paint Protection Film
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
