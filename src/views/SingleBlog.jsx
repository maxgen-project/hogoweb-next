"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { themes } from "../config/themeConfig";
import InnerBanner from "../components/InnerBanner";
import { BASE } from "../service/api";

const blogBanner = "/images/blogBanner.jpg";

/* Helper: Image URL resolver */
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

/* Helper: Date formatter */
function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatDateBadge(dateStr) {
  if (!dateStr) return { day: "", month: "" };
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return { day: "", month: "" };
  return {
    day: d.toLocaleDateString("en-GB", { day: "2-digit" }),
    month: d.toLocaleDateString("en-GB", { month: "short" }),
  };
}

export default function SingleBlog({ id }) {
  const [blog, setBlog] = useState(null);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  /* FETCH BLOGS */
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`${BASE}/blog-data/`)
      .then((res) => res.json())
      .then((data) => {
        const isSuccess = data.status === "success" || data.success === true;
        if (isSuccess && Array.isArray(data.data)) {
          const allBlogs = data.data;

          const foundBlog = allBlogs.find(
            (item) =>
              item.slug === id ||
              String(item.slug).replace(/^\/|\/$/g, "") === String(id).replace(/^\/|\/$/g, "") ||
              String(item.id) === String(id)
          );

          if (foundBlog) {
            const imgPath = foundBlog.featured_image || foundBlog.image;
            if (imgPath) {
              const img = new Image();
              img.src = getImageUrl(imgPath);
            }
          }

          setBlog(foundBlog || null);

          const published = allBlogs.filter(
            (b) => !b.status || b.status === "Published"
          );
          const sorted = [...published].sort(
            (a, b) =>
              new Date(b.publish_date || b.created_at || b.date) -
              new Date(a.publish_date || a.created_at || a.date)
          );
          setRecent(
            sorted
              .filter(
                (b) =>
                  b.slug !== foundBlog?.slug &&
                  String(b.id) !== String(foundBlog?.id)
              )
              .slice(0, 5)
          );
        } else {
          setBlog(null);
        }
        setLoading(false);
      })
      .catch(() => {
        setBlog(null);
        setLoading(false);
      });
  }, [id]);

  /* Loading State */
  if (loading) {
    return (
      <section style={{ backgroundColor: themes.backgroundBlack }} className="min-h-screen">
        <InnerBanner
          title="Blog Details"
          parent="Blog"
          parentLink="/blog"
          current="Loading..."
          bg={blogBanner}
        />
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-800 rounded w-3/4" />
            <div className="h-4 bg-gray-800 rounded w-1/3" />
            <div className="h-80 bg-gray-800 rounded-2xl w-full" />
            <div className="space-y-3">
              <div className="h-4 bg-gray-800 rounded w-full" />
              <div className="h-4 bg-gray-800 rounded w-5/6" />
              <div className="h-4 bg-gray-800 rounded w-4/6" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* Not Found State */
  if (!blog) {
    return (
      <section style={{ backgroundColor: themes.backgroundBlack }} className="min-h-screen">
        <InnerBanner
          title="Blog Not Found"
          parent="Blog"
          parentLink="/blog"
          current="Not Found"
          bg={blogBanner}
        />
        <div className="max-w-4xl mx-auto px-6 py-20 text-center text-white">
          <div className="p-10 rounded-2xl border max-w-lg mx-auto" style={{ backgroundColor: "#07071a", borderColor: "rgba(255,255,255,0.1)" }}>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-red-600/10 text-red-500">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">Blog Post Not Found</h2>
            <p className="text-gray-400 text-sm mb-6">
              The blog article you are looking for might have been removed or is temporarily unavailable.
            </p>
            <Link
              href="/blog"
              className="inline-block px-6 py-3 rounded-lg text-sm font-semibold text-white transition hover:opacity-90"
              style={{ backgroundColor: themes.primary }}
            >
              ← Back to All Blogs
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const hasContent = blog.content && blog.content.trim().length > 0;
  const blogDate = blog.publish_date || blog.created_at || blog.date;
  const imageSrc = getImageUrl(blog.featured_image || blog.image);
  const shortDesc = blog.short_description || blog.shortcontent || blog.excerpt;

  return (
    <section style={{ backgroundColor: themes.backgroundBlack }} className="min-h-screen">
      {/* HERO BANNER */}
      <InnerBanner
        title={blog.title || "Blog Post"}
        parent="Blog"
        parentLink="/blog"
        current={blog.title || "Blog Details"}
        bg={blogBanner}
      />

      {/* META BAR */}
      <div
        className="border-b"
        style={{
          backgroundColor: "#07071a",
          borderColor: "rgba(255,255,255,0.08)",
        }}
      >
        <div className="max-w-4xl mx-auto px-6 py-4 flex flex-wrap items-center gap-4 text-sm">
          {blog.hashtag && (
            <span
              className="px-3 py-1 rounded text-xs font-semibold uppercase"
              style={{ backgroundColor: themes.primary, color: "#fff" }}
            >
              {blog.hashtag}
            </span>
          )}
          {blogDate && (
            <time
              dateTime={blogDate}
              className="flex items-center gap-1.5 text-gray-300"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Published {formatDate(blogDate)}
            </time>
          )}
          <span className="text-gray-400">· HOGONN Editorial</span>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <div className="max-w-4xl mx-auto px-6 py-14 text-white">
        {/* TITLE */}
        {blog.title && (
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6"
            style={{ color: themes.textWhite, fontFamily: themes.fontPrimary }}
          >
            {blog.title}
          </h1>
        )}

        {/* SHORT CONTENT / EXCERPT */}
        {shortDesc && (
          <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-8 font-light italic border-l-4 border-red-600 pl-4 py-1">
            {shortDesc}
          </p>
        )}

        {/* FEATURED IMAGE */}
        {imageSrc && (
          <div className="relative mb-10 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <img
              src={imageSrc}
              alt={blog.title || "Blog Image"}
              className="w-full h-auto max-h-[500px] object-cover"
            />
          </div>
        )}

        {/* CONTENT AREA: HTML OR NO BLOG DATA FALLBACK */}
        <div className="content_blog">
          {hasContent ? (
            <div
              className="blog-content-html"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          ) : (
            <div
              className="my-10 p-10 rounded-2xl text-center border"
              style={{
                backgroundColor: "#07071a",
                borderColor: "rgba(255,255,255,0.1)",
              }}
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-red-600/10 text-red-500">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="9" y1="15" x2="15" y2="15" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                No Blog Data
              </h3>
              <p className="text-gray-400 text-sm max-w-md mx-auto">
                There is currently no detailed content available for this blog post.
              </p>
            </div>
          )}
        </div>

        {/* RECENT BLOGS SECTION */}
        {recent.length > 0 && (
          <div className="mt-20 pt-10 border-t border-white/10">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white uppercase" style={{ fontFamily: themes.fontPrimary }}>
                Recent Blogs
              </h2>
              <Link href="/blog" className="text-xs sm:text-sm font-semibold hover:underline" style={{ color: themes.primary }}>
                View All →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recent.map((item) => {
                const itemDate = item.publish_date || item.created_at || item.date;
                const badgeDate = formatDateBadge(itemDate);
                const itemImg = getImageUrl(item.featured_image || item.image);
                const itemHref = item.slug
                  ? `/blog/${String(item.slug).replace(/^\/|\/$/g, "")}`
                  : `/blog/${item.id}`;
                const itemDesc = item.short_description || item.shortcontent || item.excerpt;

                return (
                  <Link
                    key={item.id || item.slug}
                    href={itemHref}
                    className="group rounded-2xl overflow-hidden flex flex-col transition duration-300 hover:-translate-y-1"
                    style={{
                      backgroundColor: "#0a0a2a",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <div className="relative h-44 overflow-hidden bg-black/40">
                      {itemImg ? (
                        <img
                          src={itemImg}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-500 text-xs font-semibold uppercase tracking-widest" style={{ color: themes.primary }}>
                          HOGONN Blog
                        </div>
                      )}
                      {badgeDate.day && (
                        <div
                          className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg text-white text-xs font-bold shadow-lg"
                          style={{ backgroundColor: themes.primary }}
                        >
                          {badgeDate.day} {badgeDate.month}
                        </div>
                      )}
                    </div>

                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="text-sm font-semibold text-white group-hover:text-red-500 transition line-clamp-2 mb-2">
                        {item.title}
                      </h3>
                      {itemDesc && (
                        <p className="text-xs text-gray-400 line-clamp-2 mb-3">
                          {itemDesc}
                        </p>
                      )}
                      <span className="text-xs font-semibold mt-auto" style={{ color: themes.primary }}>
                        Read More →
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* STYLES FOR DYNAMIC HTML CONTENT & ANIMATIONS */}
      <style>{`
        .blog-content-html {
          font-size: 1.05rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.85);
        }
        .blog-content-html h1,
        .blog-content-html h2,
        .blog-content-html h3,
        .blog-content-html h4,
        .blog-content-html h5,
        .blog-content-html h6 {
          color: #ffffff;
          font-weight: 700;
          margin-top: 2rem;
          margin-bottom: 1rem;
          line-height: 1.3;
        }
        .blog-content-html h1 {
          font-size: 2.25rem;
        }
        .blog-content-html h2 {
          font-size: 1.75rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid ${themes.primary};
        }
        .blog-content-html h3 {
          font-size: 1.35rem;
          color: ${themes.primary};
        }
        .blog-content-html h4 {
          font-size: 1.15rem;
        }
        .blog-content-html p {
          margin-bottom: 1.25rem;
        }
        .blog-content-html ul {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin-bottom: 1.25rem;
        }
        .blog-content-html ol {
          list-style-type: decimal;
          padding-left: 1.5rem;
          margin-bottom: 1.25rem;
        }
        .blog-content-html li {
          margin-bottom: 0.5rem;
        }
        .blog-content-html blockquote {
          border-left: 4px solid ${themes.primary};
          background-color: #07071a;
          padding: 1rem 1.25rem;
          border-radius: 0.5rem;
          margin: 1.5rem 0;
          font-style: italic;
          color: rgba(255, 255, 255, 0.9);
        }
        .blog-content-html a {
          color: ${themes.primary};
          text-decoration: underline;
          text-underline-offset: 4px;
        }
        .blog-content-html a:hover {
          opacity: 0.8;
        }
        .blog-content-html img {
          max-width: 100%;
          height: auto;
          border-radius: 0.75rem;
          margin: 1.5rem 0;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .blog-content-html table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5rem 0;
          overflow-x: auto;
          display: block;
        }
        .blog-content-html th,
        .blog-content-html td {
          border: 1px solid rgba(255, 255, 255, 0.15);
          padding: 0.75rem 1rem;
          text-align: left;
        }
        .blog-content-html th {
          background-color: #07071a;
          color: #ffffff;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}

