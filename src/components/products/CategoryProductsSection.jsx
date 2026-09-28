"use client";

import { useEffect, useState } from "react";
import { themes } from "../../config/themeConfig";
import { apiInfo } from "../../service/api";
import ProductCard from "../ProductCard";

/**
 * CategoryProductsSection — Displays dynamic products belonging to the current category,
 * styled simply using the standard Shop ProductCard (image on top, name underneath, fully clickable card).
 *
 * @param {{ category: Object, initialProducts?: Array }} props
 */
export default function CategoryProductsSection({ category, initialProducts = null }) {
  const [products, setProducts] = useState(initialProducts || []);
  const [loading, setLoading] = useState(!initialProducts);

  useEffect(() => {
    if (initialProducts) {
      setProducts(initialProducts);
      setLoading(false);
      return;
    }

    let isMounted = true;
    const fetchCategoryProducts = async () => {
      try {
        setLoading(true);
        const res = await apiInfo.get("/products/sequence/?status=true");
        const all = Array.isArray(res.data?.data) ? res.data.data : [];

        const catId = category?.id;
        const catName = category?.name;
        const catSlug = category?.slug;

        const filtered = all
          .filter((p) => {
            if (p.status !== true) return false;
            if (catId && (p.category_id === catId || Number(p.category_id) === Number(catId))) {
              return true;
            }
            if (
              catName &&
              p.category_name &&
              p.category_name.trim().toLowerCase() === catName.trim().toLowerCase()
            ) {
              return true;
            }
            if (catSlug) {
              const normSlug = catSlug.toLowerCase().replace(/s$/, "");
              const pCatNameNorm = (p.category_name || "")
                .toLowerCase()
                .replace(/s$/, "")
                .replace(/\s+/g, "-");
              if (pCatNameNorm.includes(normSlug) || normSlug.includes(pCatNameNorm)) {
                return true;
              }
            }
            return false;
          })
          .sort((a, b) => {
            const seqA = a.product_sequence ?? a.course_sequence ?? 9999;
            const seqB = b.product_sequence ?? b.course_sequence ?? 9999;
            return seqA - seqB;
          });

        if (isMounted) {
          setProducts(filtered);
        }
      } catch (err) {
        console.error("[CategoryProductsSection] Error fetching products:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchCategoryProducts();

    return () => {
      isMounted = false;
    };
  }, [category, initialProducts]);

  const categoryTitle = category?.name || "Category";

  return (
    <section
      className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-t border-white/10"
      style={{ backgroundColor: themes.backgroundBlack }}
    >
      <div className="max-w-7xl mx-auto">
        {/* ── SECTION HEADER ─────────────────────────────────────────── */}
        <div className="mb-8">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight"
            style={{ fontFamily: themes.fontPrimary }}
          >
            {categoryTitle} Products
          </h2>
        </div>

        {/* ── LOADING SKELETON STATE ──────────────────────────────────── */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 sm:gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-[380px] rounded-xl bg-gray-900/60 border border-white/10 animate-pulse p-4 flex flex-col justify-between"
              >
                <div className="h-[250px] bg-white/5 rounded-xl" />
                <div className="h-6 bg-white/10 rounded w-3/4 mx-auto mt-4" />
              </div>
            ))}
          </div>
        )}

        {/* ── EMPTY STATE ────────────────────────────────────────────── */}
        {!loading && products.length === 0 && (
          <div
            className="text-center py-16 px-6 rounded-2xl border border-white/10"
            style={{ backgroundColor: "#07071a" }}
          >
            <h3 className="text-xl font-bold text-white mb-2">No Products Available Yet</h3>
            <p className="text-sm max-w-md mx-auto text-gray-400">
              New products added for {categoryTitle} will automatically appear here.
            </p>
          </div>
        )}

        {/* ── PRODUCTS GRID (Standard Shop ProductCard) ───────────────── */}
        {!loading && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 sm:gap-8">
            {products.map((product) => (
              <ProductCard key={product.id || product.slug} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
