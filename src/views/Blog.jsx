"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { themes } from "../config/themeConfig";
import InnerBanner from "../components/InnerBanner";
import { BASE } from "../service/api";
import { BLOG_POSTS, BLOG_CATEGORIES } from "../data/blogData";

const blogBanner = "/images/serviceBanner.jpg";

/**
 * @typedef {Object} Blog
 * @property {number|string} id - Internal reference / React key
 * @property {string} slug - Unique URL slug
 * @property {string} title - Article title
 * @property {string} [featured_image] - Featured image path/URL
 * @property {string} [short_description] - Preview excerpt text
 * @property {string} [publish_date] - ISO datetime string
 * @property {string} [status] - Publication status ("Published")
 * @property {string} [meta_title] - Meta title
 * @property {string} [meta_descrtiption] - Meta description (exact backend key with typo)
 * @property {string} [meta_keyword] - Meta keywords
 * @property {string} [hashtag] - Hashtags string
 * @property {string} content - Raw HTML content
 * @property {string} [created_at] - ISO creation timestamp
 * @property {string} [updated_at] - ISO update timestamp
 */

/* ── helpers ── */
function getImageUrl(imgPath) {
  if (!imgPath) return null;
  if (imgPath.startsWith("http://") || imgPath.startsWith("https://")) {
    return imgPath;
  }
  if (imgPath.startsWith("/")) {
    return `${BASE}${imgPath}`;
  }
  return `${BASE}/${imgPath}`;
}

function formatDateVisible(isoString) {
  if (!isoString) return "";
  const d = new Date(isoString);
  if (isNaN(d.getTime())) return isoString;
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatDateBadge(isoString) {
  if (!isoString) return { day: "", month: "" };
  const d = new Date(isoString);
  if (isNaN(d.getTime())) return { day: "", month: "" };
  return {
    day: d.toLocaleDateString("en-GB", { day: "2-digit" }),
    month: d.toLocaleDateString("en-GB", { month: "short" }),
  };
}

function cardHref(item) {
  if (item.slug) {
    const cleanSlug = String(item.slug).replace(/^\/|\/$/g, "");
    return `/blog/${cleanSlug}`;
  }
  return `/blog/${item.id}`;
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
    fetch(`${BASE}/blog-data/`)
      .then((res) => res.json())
      .then((data) => {
        const isSuccess = data.status === "success" || data.success === true;
        if (isSuccess && Array.isArray(data.data) && data.data.length > 0) {
          /* Filter only Published status posts (or posts without status property) */
          const published = data.data.filter(
            (item) => !item.status || item.status === "Published"
          );
          setBlogs(published.length > 0 ? published : data.data);
          sessionStorage.setItem("blogs", JSON.stringify(data.data));
        } else {
          setBlogs(BLOG_POSTS);
        }
        setLoading(false);
      })
      .catch(() => {
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
      { threshold: 0.15 }
    );

    if (gridRef.current) observer.observe(gridRef.current);
    if (topicsRef.current) observer.observe(topicsRef.current);
    if (ctaRef.current) observer.observe(ctaRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ── HERO BANNER ── */}
      <InnerBanner title="Blog" current="Blog" bg={blogBanner} />

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
              Car Care and Paint Protection Guides
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
              ? Array.from({ length: 3 }).map((_, i) => (
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

                const dateVal =
                  item.publish_date || item.date || item.created_at;
                const badgeDate = formatDateBadge(dateVal);
                const visibleDate = formatDateVisible(dateVal);
                const imageSrc = getImageUrl(
                  item.featured_image || item.image
                );
                const description =
                  item.short_description ||
                  item.shortcontent ||
                  item.excerpt;

                return (
                  <article
                    key={item.id || item.slug || index}
                    className={`rounded-2xl overflow-hidden transition-all duration-700 flex flex-col ${gridVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-12"
                      }`}
                    style={{
                      backgroundColor: "#0a0a2a",
                      border: "1px solid rgba(255,255,255,0.06)",
                      transitionDelay: `${index * 150}ms`,
                    }}
                  >
                    {/* Article image or fallback */}
                    <div className="relative overflow-hidden h-[240px] bg-black/40">
                      {imageSrc ? (
                        <img
                          src={imageSrc}
                          alt={item.title}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 p-6 text-center">
                          <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: themes.primary }}>
                            HOGONN Blog
                          </span>
                        </div>
                      )}
                      {/* Hashtag overlay if available */}
                      {item.hashtag && (
                        <span
                          className="absolute top-4 left-4 px-3 py-1 rounded text-xs font-semibold uppercase tracking-wide"
                          style={{
                            backgroundColor: themes.primary,
                            color: "#fff",
                          }}
                        >
                          {item.hashtag.split(" ")[0]}
                        </span>
                      )}
                    </div>

                    {/* Card body */}
                    <div className="p-6 relative flex flex-col flex-1">
                      {/* Date badge */}
                      {badgeDate.day && (
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
                      )}

                      {/* Visible date text */}
                      {visibleDate && (
                        <time
                          dateTime={dateVal}
                          className="block text-xs mb-3 mt-2"
                          style={{ color: themes.backgroundGray }}
                        >
                          {visibleDate}
                        </time>
                      )}

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

                      {/* Description / Excerpt */}
                      {description && (
                        <p
                          className="text-sm leading-relaxed mb-4 flex-1 line-clamp-3"
                          style={{ color: themes.textWhite, opacity: 0.65 }}
                        >
                          {description}
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
            className={`transition-all duration-700 ${topicsVisible
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
          className={`max-w-3xl mx-auto text-center transition-all duration-700 ${ctaVisible
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
