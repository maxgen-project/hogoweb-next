"use client";

import { useRef, useState, useEffect } from "react";
import { themes } from "../config/themeConfig";
import DecoratedTitle from "./DecoratedTitle";
import RollingButton from "./RollingButton";

const beforeImg = "/images/beforeImg.jpg";
const afterImg = "/images/afterImg.jpg";
const about1 = "/images/beforeafter1.jpeg";
const about2 = "/images/beforeafter2.jpeg";
const about3 = "/images/beforeafter3.jpeg";

export default function BeforeAfterView() {
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  const [position, setPosition] = useState(50);
  const [visible, setVisible] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);

  const images = [about1, about2, about3];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    if (contentRef.current) observer.observe(contentRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        updatePosition(
          containerRef.current.getBoundingClientRect().left +
            (containerRef.current.offsetWidth * position) / 100,
        );
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [position]);

  const updatePosition = (clientX) => {
    const rect = containerRef.current.getBoundingClientRect();
    let percent = ((clientX - rect.left) / rect.width) * 100;
    percent = Math.max(0, Math.min(100, percent));
    setPosition(percent);
  };

  return (
    <>
      <section
        className="py-16 sm:py-24 px-4 sm:px-6"
        style={{ backgroundColor: themes.backgroundBlack }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* LEFT CONTENT */}
          <div ref={contentRef}>
            <div
              className={`transition-all duration-700 ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <DecoratedTitle text="REAL RESULTS" />
            </div>

            <h2
              className={`text-3xl sm:text-4xl md:text-5xl font-bold mt-6 leading-tight transition-all duration-700 delay-150 ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ color: themes.textWhite }}
            >
              Before & After: Complete <br /> Auto Transformations
            </h2>

            <p
              className={`mt-6 text-base sm:text-lg opacity-80 transition-all duration-700 delay-300 ${
                visible
                  ? "opacity-80 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ color: themes.textWhite }}
            >
              Experience stunning before-and-after transformations with HOGONN
              INDIA Pvt. Ltd., where advanced protection solutions restore shine,
              enhance aesthetics, and deliver a flawless, showroom-like finish
              that keeps your vehicle looking brand new.
            </p>
            <div className="mt-4">
              <RollingButton text="View More" onClick={()=>location.href ='https://www.hogonnindia.com/gallery'} />
            </div>
          </div>

          {/* RIGHT SLIDER */}
          <div
            ref={containerRef}
            className="relative w-full h-[280px] sm:h-[350px] md:h-[420px] lg:h-[450px] overflow-hidden rounded-xl select-none"
            onMouseMove={(e) => dragging && updatePosition(e.clientX)}
            onMouseUp={() => setDragging(false)}
            onMouseLeave={() => setDragging(false)}
            onTouchMove={(e) =>
              dragging && updatePosition(e.touches[0].clientX)
            }
            onTouchEnd={() => setDragging(false)}
          >
            {/* AFTER IMAGE */}
            <img
              src={afterImg}
              className="absolute inset-0 w-full h-full object-cover"
              alt="after"
              draggable="false"
            />

            {/* BEFORE IMAGE (CLIPPED) */}
            <img
              src={beforeImg}
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              style={{
                clipPath: `inset(0 ${100 - position}% 0 0)`,
              }}
              alt="before"
              draggable="false"
            />

            {/* DIVIDER LINE */}
            <div
              className="absolute top-0 bottom-0 w-[2px] z-10"
              style={{
                left: `${position}%`,
                backgroundColor: "#fff",
              }}
            />

            {/* HANDLE */}
            <div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 cursor-ew-resize"
              style={{ left: `${position}%` }}
              onMouseDown={() => setDragging(true)}
              onTouchStart={() => setDragging(true)}
            >
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-2 border-white bg-transparent"></div>
                <span className="absolute left-2 text-white text-lg font-bold select-none">
                  ‹
                </span>
                <span className="absolute right-2 text-white text-lg font-bold select-none">
                  ›
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="
              relative w-full max-w-lg
              h-[85vh] sm:h-[80vh]
              bg-[#0b0f2a] rounded-xl
              overflow-hidden
              p-4 sm:p-6
            "
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-1 right-2 text-white text-2xl z-20"
            >
              ✕
            </button>
            <div className="w-full h-full overflow-hidden">
              <div
                className="flex h-full transition-transform duration-500"
                style={{
                  transform: `translateX(-${current * 100}%)`,
                }}
              >
                {images.map((img, i) => (
                  <div
                    key={i}
                    className="min-w-full flex items-center justify-center h-full"
                  >
                    <div className="w-full h-full flex items-center justify-center rounded-lg">
                      <img
                        src={img}
                        className="max-h-full max-w-full object-contain"
                        alt="gallery"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setCurrent((prev) => (prev === 0 ? 0 : prev - 1))}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black px-3 py-1 rounded text-white"
            >
              ‹
            </button>

            <button
              onClick={() =>
                setCurrent((prev) =>
                  prev === images.length - 1 ? prev : prev + 1,
                )
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black px-3 py-1 rounded text-white"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </>
  );
}
