"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { themes } from "../config/themeConfig";
import InnerBanner from "../components/InnerBanner";
import { BASE } from "../service/api";

const blogBanner = "/images/blogBanner.jpg";

export default function SingleBlog({ id }) {
  const [blog, setBlog] = useState(null);
  const [recent, setRecent] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imgLoaded, setImgLoaded] = useState(false);

  /* FETCH BLOGS */
  useEffect(() => {
    if (!id) return;
    fetch(`${BASE}/blogs/`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const allBlogs = data.data;

          const foundBlog = allBlogs.find(
            (item) => String(item.id) === String(id),
          );

          if (foundBlog?.image) {
            const img = new Image();
            img.src = `${BASE}${foundBlog.image}`;
          }

          setBlog(foundBlog);

          const sorted = [...allBlogs].sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at),
          );
          setRecent(sorted.slice(0, 5));

          const allTags = allBlogs.map((item) => item.tag).filter(Boolean);
          setTags([...new Set(allTags)]);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  /* Reset animation on route change */
  useEffect(() => {
    setImgLoaded(false);
  }, [id]);

  if (loading) return <div className="text-white p-10">Loading...</div>;
  if (!blog) return <div className="text-white p-10">Blog not found</div>;

  return (
    <section style={{ backgroundColor: themes.backgroundBlack }}>
      {/* HERO */}
      <InnerBanner
        title={blog.title}
        parent="Blog"
        parentLink="/blog"
        current={blog.title}
        bg={blogBanner}
      />

      {/* MAIN */}
      <div className="max-w-7xl mx-auto px-6 py-16 text-white">
        {/* IMAGE + TAGS */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.7fr_1fr] gap-12 items-start mb-14">
          {/* IMAGE */}
          <div className="w-full min-h-[360px] flex items-center justify-center relative overflow-hidden">
            {!imgLoaded && (
              <div className="absolute inset-0 bg-gray-800 animate-pulse rounded-lg" />
            )}
            <img
              src={`${BASE}${blog.image}`}
              alt=""
              loading="eager"
              onLoad={() => setImgLoaded(true)}
              className={`w-full max-h-[520px] object-contain transition-all duration-700 ease-out
                ${imgLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
            />
          </div>

          {/* TAGS */}
          <div className="opacity-0 translate-y-6 animate-[fadeUp_0.8s_ease-out_forwards]">
            <h3 className="text-xl font-semibold mb-4">Popular Tags</h3>
            <div className="flex flex-wrap gap-3">
              {tags.map((t, i) => (
                <span
                  key={i}
                  className="px-4 py-2 rounded-md text-sm font-semibold hover:bg-red-600 transition"
                  style={{ backgroundColor: themes.backgroundGray }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div
          key={`content-${blog.id}`}
          className="opacity-0 translate-y-6 animate-[fadeUp_0.8s_ease-out_forwards]"
        >
          <h2 className="text-3xl font-bold mb-6">{blog.title}</h2>
          <p className="opacity-80 leading-7 whitespace-pre-line">
            {blog.content}
          </p>
        </div>

        {/* RECENT BLOGS */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold mb-10 opacity-0 translate-y-6 animate-[fadeUp_0.8s_ease-out_forwards]">
            Recent Blogs
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {recent.map((item, i) => (
              <Link
                key={item.id}
                href={`/blog/${item.id}`}
                className="group rounded-2xl overflow-hidden bg-[#0b0f2a] shadow-lg hover:shadow-2xl transition duration-300 opacity-0 translate-y-6 animate-[fadeUp_0.8s_ease-out_forwards]"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="relative">
                  <img
                    src={`${BASE}${item.image}`}
                    alt=""
                    className="w-full h-40 object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute bottom-[-18px] left-4 bg-red-600 text-white px-3 py-1 rounded-lg text-xs font-bold shadow-lg">
                    {new Date(item.date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                    })}
                  </div>
                </div>

                <div className="pt-6 pb-4 px-4">
                  <h3 className="text-sm font-semibold text-white group-hover:text-red-500 transition line-clamp-2">
                    {item.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ANIMATION KEYFRAMES */}
      <style>
        {`
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </section>
  );
}
