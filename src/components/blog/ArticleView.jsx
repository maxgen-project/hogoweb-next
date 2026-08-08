"use client";

import { useState } from "react";
import Link from "next/link";
import { themes } from "../../config/themeConfig";

function ContentBlock({ block }) {
  if (block.type === "h2") {
    return (
      <h2 className="mt-12 mb-4 text-2xl font-semibold md:text-3xl" style={{ color: themes.backgroundBlack }}>
        {block.text}
      </h2>
    );
  }
  if (block.type === "h3") {
    return (
      <h3 className="mt-8 mb-3 text-lg font-semibold md:text-xl" style={{ color: themes.backgroundBlack }}>
        {block.text}
      </h3>
    );
  }
  if (block.type === "image") {
    return (
      <img
        src={block.src}
        alt={block.alt}
        loading="lazy"
        className="my-8 w-full rounded-lg object-cover"
      />
    );
  }
  if (block.type === "quote") {
    return (
      <blockquote className="my-8 border-l-4 border-red-600 pl-6 py-2 text-lg italic" style={{ color: themes.backgroundBlack }}>
        {block.text}
      </blockquote>
    );
  }
  // paragraph, with optional inline internal links
  return (
    <p className="mb-5 text-base leading-7" style={{ color: "rgba(0,0,0,0.75)" }}>
      {block.text}
    </p>
  );
}

export default function ArticleView({ post }) {
  const [active, setActive] = useState(null);

  return (
    <>
      {/* HEADER */}
      <section className="py-16 md:py-20" style={{ backgroundColor: themes.backgroundBlack, color: themes.textWhite }}>
        <div className="mx-auto max-w-3xl px-6">
          <nav className="mb-6 text-xs uppercase tracking-widest text-white/40">
            <Link href="/" className="hover:text-red-500 transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/blog/" className="hover:text-red-500 transition-colors">Blog</Link>
            <span className="mx-2">/</span>
            <span className="text-white/70">{post.title}</span>
          </nav>

          <span className="rounded-full border border-red-500 px-3 py-1 text-xs font-medium uppercase tracking-wider text-red-500">
            {post.category}
          </span>

          <h1 className="mt-5 text-3xl font-bold leading-tight md:text-5xl">
            {post.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/50">
            <span>By {post.author}</span>
            <span>·</span>
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
            </time>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </section>

      {/* FEATURED IMAGE — not lazy-loaded, loads eagerly */}
      <div className="mx-auto max-w-4xl px-6 -mt-8 md:-mt-10">
        <img
          src={post.image}
          alt={post.title}
          className="w-full rounded-lg object-cover shadow-2xl"
        />
      </div>

      {/* BODY */}
      <section className="py-16" style={{ backgroundColor: themes.backgroundGray }}>
        <div className="mx-auto max-w-3xl px-6">
          {post.content.map((block, i) => (
            <ContentBlock key={i} block={block} />
          ))}

          <div className="mt-10 flex flex-col gap-3 border-t pt-8" style={{ borderColor: "rgba(0,0,0,0.1)" }}>
            <Link href="/products/paint-protection-film/" className="font-semibold text-red-600 hover:text-red-700 transition-colors">
              → Explore HOGONN Paint Protection Film
            </Link>
            <Link href="/contact" className="font-semibold text-red-600 hover:text-red-700 transition-colors">
              → Find an Installer
            </Link>
          </div>
        </div>
      </section>

      {/* FAQs — same accordion pattern as FAQView / FAQAboutView */}
      <section className="py-24" style={{ backgroundColor: themes.backgroundBlack }}>
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-10 text-2xl font-semibold text-white md:text-3xl">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {post.faqs.map((item, i) => (
              <div
                key={i}
                className="border-b pb-6 cursor-pointer"
                style={{ borderColor: themes.backgroundGray }}
                onClick={() => setActive(active === i ? null : i)}
              >
                <div className="flex justify-between items-center gap-4">
                  <h3 className="text-lg font-medium text-white">{item.q}</h3>
                  <span
                    className={`transition-transform duration-300 text-white ${active === i ? "rotate-180" : ""}`}
                  >
                    ▼
                  </span>
                </div>
                <div className={`overflow-hidden transition-all duration-300 ${active === i ? "max-h-60 mt-4" : "max-h-0"}`}>
                  <p className="leading-relaxed text-white/80">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}