"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { apiInfo } from "../service/api";

export default function ProductGrid({ selectedCategory, setCategories }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH PRODUCTS
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const res = await apiInfo.get("/products/sequence/?status=true");
        const data = res.data.data || [];

        setProducts(data);

        // ALWAYS update categories
        const cats = [...new Set(data.map((p) => p.category_name))];
        setCategories(cats);

      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, setCategories]);

  // FILTER + SORT
  const filteredProducts = (
    selectedCategory
      ? products.filter((p) => p.category_name === selectedCategory)
      : products
  ).sort((a, b) => {
    const seqA = a.course_sequence ?? 9999;
    const seqB = b.course_sequence ?? 9999;
    return seqA - seqB;
  });

  // LOADING
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-6 sm:gap-8">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-[260px] rounded-xl bg-gray-700 animate-pulse"
          />
        ))}
      </div>
    );
  }

  // UI
  return (
    <div className="w-full">
      <div
        className="
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-3
        gap-6
        sm:gap-8
      "
      >
        {filteredProducts.length === 0 ? (
          <div className="col-span-full text-center py-20">
            <h2 className="text-white text-xl font-semibold">
              No Products Available
            </h2>
          </div>
        ) : (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  );
}