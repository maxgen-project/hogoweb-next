"use client";

import { useRef, useEffect, useState } from "react";
import { themes } from "../config/themeConfig";
import DecoratedTitle from "../components/DecoratedTitle";
import InnerBanner from "../components/InnerBanner";
import ParallaxCarSection2 from "../components/ParallaxCarSection2";

const team3 = "/images/aboutpage1.jpeg";
const aboutImg2 = "/images/aboutpage4.jpeg";
const aboutBanner = "/images/carmodify2.png";

export default function About() {
  const heroRef = useRef(null);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setHeroVisible(true);
      },
      { threshold: 0.3 },
    );

    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ================= ABOUT HERO ================= */}
      <InnerBanner
        title="About Us"
        current="About Us"
        bg={aboutBanner}
      />

      {/* ================= ABOUT CONTENT ================= */}
      <section
        className="sm:py-16 px-4 sm:px-6"
        style={{ backgroundColor: themes.backgroundGray }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:pb-0 md:pb-0 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT IMAGES */}
          <div className="relative w-full h-[420px] sm:h-[480px] lg:h-[520px] mt-5">
            {/* FRONT */}
            <div className="absolute z-20 left-0 top-0 w-[62%] h-[78%] lg:w-[48%] lg:h-auto lg:aspect-[4/5]">
              <img
                src={team3}
                alt="Expert"
                className="w-full h-full object-cover rounded-xl shadow-2xl"
              />
            </div>

            {/* BACK */}
            <div className="absolute z-10 right-0 bottom-0 lg:right-auto lg:bottom-auto lg:left-[38%] lg:top-[14%] w-[62%] h-[78%] lg:w-[48%] lg:h-auto lg:aspect-[4/5]">
              <img
                src={aboutImg2}
                alt="Workshop"
                className="w-full h-full object-cover rounded-xl shadow-xl"
              />
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="text-center lg:text-left">
            <div className="flex justify-center lg:justify-start mb-12">
              <DecoratedTitle text="ABOUT US" color={themes.backgroundBlack} />
            </div>

            <p
              className="leading-relaxed mb-6 max-w-xl mx-auto lg:mx-0"
              style={{ color: themes.backgroundBlack }}
            >
              Hogonn India Pvt. Ltd. is built on a strong legacy of over
              46 years in the automotive industry. Since its inception in 1979,
              the group has been driven by a clear vision to deliver uncompromised
              quality and lasting value to customers.
            </p>

            <p
              className="leading-relaxed mb-6 max-w-xl mx-auto lg:mx-0"
              style={{ color: themes.backgroundBlack }}
            >
              With an unwavering focus on quality and consistency, the organization
              established a strong presence across automotive accessories and auto
              components. Over the years, it expanded its portfolio to include
              premium seat covers, body covers, floor mats, steering covers, and a
              wide range of auto components, serving both the aftermarket and
              leading automobile manufacturers.
            </p>
            <p
              className="leading-relaxed mb-6 max-w-xl mx-auto lg:mx-0"
              style={{ color: themes.backgroundBlack }}
            >
              This commitment to excellence has earned approvals from major OEMs
              such as Maruti Suzuki, Hyundai Motor India, Mahindra & Mahindra, and
              MG Motor reinforcing its reputation as a trusted partner for
              high-quality automotive solutions.
            </p>
          </div>
        </div>
      </section>

      <section>
        <ParallaxCarSection2 />
      </section>
    </>
  );
}