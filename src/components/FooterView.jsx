"use client";

import { themes } from "../config/themeConfig";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { apiInfo } from "../service/api";

const logo = "/images/HOGONN9.png";
const instagramIcon = "/images/Instagram_icon.png";
const facebookIcon = "/images/facebook.svg";
const youtubeIcon = "/images/youtube.svg";
const whatsappIcon = "/images/whatsapp.svg";
const twitterIcon = "/images/twitter.svg";

export default function FooterView() {
  const router = useRouter();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    apiInfo
      .get("/products/sequence/?status=true")
      .then((res) => {
        setProducts(res.data.data || []);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, []);

  const handleProductClick = (id) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      router.push(`/product/${id}`);
    }, 300);
  };

  return (
    <footer
      className="pt-16"
      style={{
        backgroundColor: themes.backgroundBlack,
        color: themes.textWhite,
      }}
    >
      {/* GRID */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* LOGO */}
        <div className="text-center space-y-4">
          <Link href="/" className="flex justify-center items-center gap-3">
            <img src={logo} alt="logo" style={{ height: "70px" }} />
            <span className="font-semibold">Hogonn India Pvt. Ltd.</span>
          </Link>

          <p className="text-sm opacity-80">
            Hogonn India Pvt. Ltd. is built on a strong legacy of over
            46 years in the automotive industry.
          </p>
        </div>

        {/* PRODUCTS 1 */}
        <div className="text-center">
          <h3 className="mb-4 font-semibold">Our Products</h3>
          <ul className="space-y-2">
            {products.slice(0, 5).map((p) => (
              <li
                key={p.id}
                className="cursor-pointer opacity-80 hover:text-red-500"
                onClick={() => handleProductClick(p.id)}
              >
                {p.product_name}
              </li>
            ))}
          </ul>
        </div>

        {/* PRODUCTS 2 */}
        <div className="text-center">
          <h3 className="mb-4 font-semibold">Our Products</h3>
          <ul className="space-y-2">
            {products.slice(5, 10).map((p) => (
              <li
                key={p.id}
                className="cursor-pointer opacity-80 hover:text-red-500"
                onClick={() => handleProductClick(p.id)}
              >
                {p.product_name}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* SOCIAL ICONS */}
      <div className="flex justify-center gap-5 mt-10 flex-wrap">
        {[
          { icon: facebookIcon, link: "#" },
          { icon: twitterIcon, link: "#" },
          { icon: youtubeIcon, link: "#" },
          { icon: instagramIcon, link: "https://www.instagram.com/hogoautofilms_india" },
          { icon: whatsappIcon, link: "#" },
        ].map((item, i) => (
          <a
            key={i}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 flex items-center justify-center rounded-2xl bg-gray-800 hover:scale-110 transition"
          >
            <img
              src={item.icon}
              alt="social"
              className="w-6 h-6 object-contain"
            />
          </a>
        ))}
      </div>

      {/* BOTTOM */}
      <div className="mt-10 border-t border-gray-700 py-5 text-center text-sm opacity-70">
        © 2026 - Hogonn India Pvt. Ltd.
      </div>
    </footer>
  );
}