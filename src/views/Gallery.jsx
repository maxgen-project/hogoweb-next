"use client";

import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

import { useState, useEffect } from "react";
import { themes } from "../config/themeConfig";
import InnerBanner from "../components/InnerBanner";
import RollingButton from "../components/RollingButton";

const galleryBanner = "/images/serviceBanner.jpg";

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [galleryImages, setGalleryImages] = useState({ all: [] });

  useEffect(() => {
    fetch("https://apidata.hogonnindia.com/gallery/")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.data) {
          const images = data.data.map((item) => item.image);
          setGalleryImages({ all: images });
        }
      })
      .catch((err) => console.error("Failed to fetch gallery images", err));
  }, []);

  return (
    <>
      {/* ================= HERO ================= */}
      <InnerBanner
        title="Gallery"
        current="Gallery"
        bg={galleryBanner}
      />

      {/* ================= FILTER + GRID ================= */}
      <section
        className="py-16 sm:py-20 px-4 sm:px-6"
        style={{ backgroundColor: themes.backgroundGray }}
      >
        <div className="max-w-7xl mx-auto">
          {/* GRID */}
          <PhotoProvider>
            <div
              key={activeFilter}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {(galleryImages[activeFilter] || []).map((img, index) => (
                <PhotoView src={img} key={index}>
                  <div
                    className="
                      relative overflow-hidden rounded-xl group cursor-pointer
                      opacity-0 translate-y-8
                      animate-[fadeUp_0.8s_ease-out_forwards]
                    "
                    style={{
                      animationDelay: `${index * 120}ms`,
                      backgroundColor: themes.backgroundBlack,
                    }}
                  >
                    <img
                      draggable="false"
                      src={img}
                      alt="Gallery"
                      className="
                        w-full h-[220px] sm:h-[260px] lg:h-[300px]
                        object-contain
                        transition-transform duration-700
                        group-hover:scale-110
                        bg-white
                      "
                    />

                    <div
                      className="
                        absolute inset-0 flex items-center justify-center
                        opacity-0 group-hover:opacity-100
                        transition-opacity duration-300
                      "
                      style={{ backgroundColor: `${themes.backgroundBlack}99` }}
                    >
                      <RollingButton text="VIEW" className="text-xs sm:text-sm"/>
                    </div>
                  </div>
                </PhotoView>
              ))}
            </div>
          </PhotoProvider>
        </div>
      </section>

      {/* LOCAL KEYFRAMES */}
      <style>
        {`
          @keyframes fadeUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </>
  );
}