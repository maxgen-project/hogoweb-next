"use client";

import { useParams } from "next/navigation";
import ProductDetails from "../../../src/views/ProductDetails";

export default function ProductDetailPage() {
  const { id } = useParams();

  return <ProductDetails id={id} />;
}