"use client";

import { useEffect, useState } from "react";
import InnerBanner from "../components/InnerBanner";
import { apiInfo, BASE } from "../service/api";
import { themes } from "../config/themeConfig";

import {
  GiChemicalDrop,
  GiFilmStrip,
  GiShield,
  GiPaintBrush,
  GiLayeredArmor,
} from "react-icons/gi";

import { MdOutlineColorLens, MdOutlineSecurity } from "react-icons/md";

const serviceBanner = "/images/serviceBanner.jpg";

export default function ProductDetails({ id }) {
  const [product, setProduct] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  // Scroll to top + reset state on product change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setVisible(false);
    setProduct(null);
    setCurrentIndex(0);
  }, [id]);

  // Fetch product
  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      try {
        const res = await apiInfo.get(`/products/${id}/`);
        const data = res.data.data;
        setProduct(data);
        setTimeout(() => setVisible(true), 80);
      } catch (error) {
        console.log("Product fetch error:", error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: themes.backgroundBlack }}
      >
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-10 h-10 rounded-full border-4 border-t-transparent animate-spin"
            style={{
              borderColor: `${themes.primary} transparent transparent transparent`,
            }}
          />
          <p className="text-white opacity-60 text-sm">Loading product...</p>
        </div>
      </div>
    );
  }

  const specs = [
    {
      icon: <GiChemicalDrop />,
      label: "Material",
      value: product.material_name,
    },
    {
      icon: <MdOutlineColorLens />,
      label: "Color",
      value: product.colour_name,
    },
    { icon: <GiFilmStrip />, label: "Film Type", value: product.film_type },
    { icon: <GiPaintBrush />, label: "Finish", value: product.finish },
    { icon: <GiLayeredArmor />, label: "Thickness", value: product.thickness },
    { icon: <GiShield />, label: "Warranty", value: product.warranty },
    {
      icon: <MdOutlineSecurity />,
      label: "UV Resistance",
      value: product.uv_resistance,
    },
    { icon: <GiShield />, label: "Hydrophobic", value: product.hydrophobic },
    {
      icon: <GiShield />,
      label: "Scratch Resistant",
      value: product.scratch_resistant,
    },
    {
      icon: <GiShield />,
      label: "Stain Resistant",
      value: product.stain_resistant,
    },
    { icon: <GiShield />, label: "Elongation", value: product.elongation },
    {
      icon: <GiShield />,
      label: "Tear Strength",
      value: product.tear_strength,
    },
    {
      icon: <GiShield />,
      label: "Temperature Resistance",
      value: product.tempeerature_resistance,
    },
    {
      icon: <GiShield />,
      label: "Peel Adhesion",
      value: product.peel_adhesion,
    },
    {
      icon: <GiShield />,
      label: "Anti Rockclip",
      value: product.anti_rockclip,
    },
    {
      icon: <GiShield />,
      label: "Elongation TPU",
      value: product.elongation_rate_tpu,
    },
    {
      icon: <GiShield />,
      label: "Elongation Hard",
      value: product.elongation_rate_hard,
    },
  ];

  const images = [
    product.image1,
    product.image2,
    product.image3,
    product.image4,
  ].filter(Boolean);

  return (
    <div
      style={{ background: themes.backgroundBlack }}
      className="min-h-screen"
    >
      {/* Banner */}
      <InnerBanner
        title={product.product_name}
        parent="Product"
        parentLink="/product"
        current={product.product_name}
        bg={serviceBanner}
      />

      {/* Fade-in wrapper */}
      <div
        className="transition-all duration-700 ease-out"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0px)" : "translateY(24px)",
        }}
      >
        {/* Product Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-14 md:py-16 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Carousel */}
          <div className="bg-[#0a0a2a] p-6 sm:p-8 rounded-xl">
            <div className="relative flex items-center justify-center">
              <img
                src={`${BASE}${images[currentIndex]}`}
                alt={product.product_name}
                className="w-full max-w-[420px] object-contain transition-opacity duration-500"
                style={{ maxHeight: "420px" }}
              />
              <button
                onClick={() =>
                  setCurrentIndex(
                    currentIndex === 0 ? images.length - 1 : currentIndex - 1,
                  )
                }
                className="absolute left-2 bg-black/60 hover:bg-black text-white w-10 h-10 rounded-full flex items-center justify-center transition"
              >
                ‹
              </button>
              <button
                onClick={() =>
                  setCurrentIndex(
                    currentIndex === images.length - 1 ? 0 : currentIndex + 1,
                  )
                }
                className="absolute right-2 bg-black/60 hover:bg-black text-white w-10 h-10 rounded-full flex items-center justify-center transition"
              >
                ›
              </button>
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              {product.product_name}
            </h2>
            <div
              className="text-sm space-y-2 "
              style={{ color: themes.primary }}
            >
              <p className="text-lg">
                Description :
                <span
                  className="ml-2 text-lg"
                  style={{
                    color: themes.backgroundGray,
                    fontFamily: themes.fontPrimary,
                  }}
                >
                  {product.description}
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* Specification */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-14 sm:pb-16">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-10">
            Specification
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {specs.map((item, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center gap-3 p-4 border border-white/10 rounded-lg transition duration-300 hover:border-white/30 hover:scale-105"
              >
                <div className="text-3xl" style={{ color: themes.primary }}>
                  {item.icon}
                </div>
                <span className="text-gray-400 text-xs uppercase">
                  {item.label}
                </span>
                <span className="text-white text-sm">{item.value || "-"}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
