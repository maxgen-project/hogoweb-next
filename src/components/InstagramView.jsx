"use client";

import { useRef, useState, useEffect } from "react";
import { themes } from "../config/themeConfig";
import DecoratedTitle from "./DecoratedTitle";
import { FaInstagram } from "react-icons/fa";

const insta1 = "/images/insta1.jpeg";
const insta2 = "/images/insta2.jpeg";
const insta3 = "/images/insta3.jpeg";
const insta4 = "/images/insta5.jpeg";
const insta5 = "/images/insta5.jpg";
const insta6 = "/images/insta6.jpg";
const insta7 = "/images/insta7.jpg";
const insta8 = "/images/insta8.jpg";

const images = [insta1, insta2, insta3, insta4, insta5, insta6, insta7, insta8];

export default function InstagramView() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

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

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 overflow-hidden"
      style={{ backgroundColor: themes.backgroundGray }}
    >
      <div className="text-center mb-14 px-6">
        <div
          className={`
            transition-all duration-700 ease-out
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
          `}
        >
          <DecoratedTitle text="See Us at Instagram" color={themes.backgroundBlack} />
        </div>

        <h2
          className={`
            text-3xl md:text-5xl font-bold mt-6
            transition-all duration-700 ease-out delay-150
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
          `}
          style={{ color: themes.backgroundBlack }}
        >
          <a href="https://www.instagram.com/hogoautofilms_india?igsh=MTVldDk3cXF1c3kzbw==">
           @hogonnindia
          </a>
        </h2>
      </div>

      <div
        className={`
          grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8
          transition-all duration-700 ease-out delay-300
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}
        `}
      >
        {images.map((img, i) => (
          <div
            key={i}
            className="relative group overflow-hidden cursor-pointer"
          >
            <img
              src={img}
              alt="Instagram"
              className="
                w-full h-full object-cover aspect-square
                transition-transform duration-500
                group-hover:scale-110
              "
            />

            <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 group-hover:opacity-0">
              <FaInstagram size={28} color="white" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
