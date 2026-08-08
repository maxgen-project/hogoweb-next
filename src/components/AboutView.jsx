"use client";

import { useEffect, useRef, useState } from "react";
import DecoratedTitle from "./DecoratedTitle";
import RollingButton from "./RollingButton";
import { themes } from "../config/themeConfig";
import { useRouter } from "next/navigation";

const about2 = "/images/aboutpage3.jpeg";
const about1 = "/images/aboutpage2.jpeg";

export default function AboutView() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const router = useRouter();

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
    <>
      <section ref={sectionRef} style={{ color: themes.textWhite }}>
        <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* ===== IMAGES - OVERLAPPING LAYOUT ===== */}
          <div className="relative w-full h-[420px] sm:h-[480px] md:h-[520px]">
            {/* LEFT IMAGE - top-left */}
            <img
              src={about2}
              alt="Paint protection film applied to a car"
              className={`
                absolute top-0 left-0
                w-[62%] h-[78%]
                rounded-2xl object-cover
                shadow-xl z-10
                transition-all duration-1000 ease-out
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
              `}
            />

            {/* RIGHT IMAGE - bottom-right, overlapping */}
            <img
              src={about1}
              alt="Professional paint protection film installation by HOGONN"
              className={`
                absolute bottom-0 right-0
                w-[62%] h-[78%]
                rounded-2xl object-cover
                shadow-xl z-20
                transition-all duration-1000 ease-out delay-200
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
              `}
            />
          </div>

          {/* ===== CONTENT ===== */}
          <div className="space-y-8">
            <div
              className={`
                transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
              `}
            >
              <DecoratedTitle text="Hogonn India- Trusted by OEMs. Built for Professionals" color={themes.backgroundBlack} />
            </div>

            <p
              className={`
                leading-relaxed max-w-xl text-left md:text-justify
                transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] delay-300
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
              `}
              style={{ color: themes.backgroundBlack }}
            >
              Hogonn India Pvt. Ltd. is built on a strong legacy of over 46 years in the automotive industry. Since its inception in 1979, the group has been driven by a clear vision to deliver uncompromised quality and lasting value to customers.

              Over the years, it expanded its portfolio to include premium seat covers, body covers, floor mats, steering covers, and a wide range of auto components, serving both the aftermarket and leading automobile manufacturers.
            </p>
            <p
              className={`
                leading-relaxed max-w-xl text-left md:text-justify
                transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] delay-300
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
              `}
              style={{ color: themes.backgroundBlack }}
            >
              We now bring the same manufacturing discipline to car detailing products: Paint Protection Film in six grades, safety glaze window film, and dedicated windshield and sunroof films-built on Covestro, BASF and Lubrizol TPU, with warranties up to 10 years.
            </p>
            <p
              className={`
                leading-relaxed max-w-xl text-left md:text-justify
                transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] delay-300
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
              `}
              style={{ color: themes.backgroundBlack }}
            >
              This commitment to excellence has earned approvals from major OEMs such as Maruti Suzuki, Hyundai Motor India, Mahindra & Mahindra, and MG Motor reinforcing its reputation as a trusted partner for high-quality automotive solutions. 
            </p>
 <p
              className={`
                leading-relaxed max-w-xl text-left md:text-justify
                transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] delay-300
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
              `}
              style={{ color: themes.backgroundBlack }}
            >
              We offer detailing studios, distributors and dealership networks across India with direct-from-manufacturer pricing and application support. 

  </p>

            <div
              className={`
                transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] delay-500
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
              `}
            >
              <RollingButton
                text="Know More"
                onClick={() => router.push("/about")}
              />
            </div>
          </div>
        </div>
      </section>

      <StatsBand />
    </>
  );
}

/* ===================== STATS BAND ===================== */

function StatsBand() {
  const stats = [
    { label: "Hours of Works", value: 65250, icon: "briefcase" },
    { label: "Happy Customers", value: 23160, icon: "thumb" },
    { label: "Experienced Workers", value: 1500, icon: "users" },
    { label: "Years of Experience", value: 46, icon: "medal" },
  ];

  const [start, setStart] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStart(true);
      },
      { threshold: 0.15 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-20 overflow-hidden">
      <div
        className={`max-w-[1200px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12 transition-all duration-1000 ${start
          ? "translate-x-0 opacity-100"
          : "-translate-x-16 md:-translate-x-32 opacity-0 md:opacity-0 opacity-100"
          }`}
      >
        {stats.map((item, i) => (
          <StatItem key={i} item={item} start={start} />
        ))}
      </div>
    </section>
  );
}

/* ===================== STAT ITEMS ===================== */

function StatIcon({ name }) {
  const cls = "w-10 h-10";

  if (name === "briefcase")
    return (
      <svg className={cls} fill={themes.primary} viewBox="0 0 24 24">
        <path d="M10 2h4a2 2 0 012 2v2h4a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h4V4a2 2 0 012-2zm0 4h4V4h-4v2z" />
      </svg>
    );

  if (name === "thumb")
    return (
      <svg className={cls} fill={themes.primary} viewBox="0 0 24 24">
        <path d="M2 10h4v12H2zm20 1c0-1.1-.9-2-2-2h-6l1-4V3c0-.6-.4-1-1-1h-1l-4 7v13h9c.8 0 1.5-.5 1.8-1.2l2-5c.1-.3.2-.6.2-.8v-4z" />
      </svg>
    );

  if (name === "users")
    return (
      <svg className={cls} fill={themes.primary} viewBox="0 0 24 24">
        <path d="M16 11c1.7 0 3-1.3 3-3s-1.3-3-3-3-3 1.3-3 3 1.3 3 3 3zM8 11c1.7 0 3-1.3 3-3S9.7 5 8 5 5 6.3 5 8s1.3 3 3 3zm0 2c-2.7 0-8 1.3-8 4v3h10v-3c0-2.7-5.3-4-2-4zm8 0c-.3 0-.7 0-1 .1 1.2.8 2 1.9 2 2.9v3h7v-3c0-2.7-5.3-4-8-4z" />
      </svg>
    );

  if (name === "medal")
    return (
      <svg className={cls} fill={themes.primary} viewBox="0 0 24 24">
        <path d="M12 2l3 6 6 .9-4.5 4.4L17.8 20 12 17l-5.8 3 1.1-6.7L2.8 8.9 9 8z" />
      </svg>
    );
}

function StatItem({ item, start }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let current = 0;
    const end = item.value;
    const duration = 1500;
    const step = Math.ceil(end / (duration / 20));

    const timer = setInterval(() => {
      current += step;
      if (current >= end) {
        current = end;
        clearInterval(timer);
      }
      setCount(current);
    }, 20);

    return () => clearInterval(timer);
  }, [start, item.value]);

  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <StatIcon name={item.icon} />
      <h3
        className="text-2xl md:text-3xl font-bold"
        style={{ color: themes.backgroundBlack }}
      >
        {count}+
      </h3>
      <p style={{ color: themes.backgroundBlack }}>{item.label}</p>
    </div>
  );
}
