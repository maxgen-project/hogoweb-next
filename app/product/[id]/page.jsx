"use client";

import ProductDetails from "../../../src/views/ProductDetails";

export default function ProductDetailPage({ params }) {
  return <ProductDetails id={params.id} />;
}
