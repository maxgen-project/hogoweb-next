"use client";

import { useState, useEffect, useRef } from "react";
import { themes } from "../config/themeConfig";
import DecoratedTitle from "./DecoratedTitle";
import SectionHeading from "./SectionHeading";
import { BASE } from "../service/api";

const testimonials = [
  {
    name: "Anjali Mehta",
    date: "07 Mar 2026",
    rating: 5,
    text: "Got my new Defender treated with TPU PPF. The finish is invisible and the self-healing property actually works! Best detailing studio in India for high-end cars.",
    avatar: "",
  },
  {
    name: "Priya Sharma",
    date: "14 Mar 2026",
    rating: 5,
    text: "The gloss on my Thar after the Ceramic Coating is unbelievable. It's been 3 months and the water still beads right off. Excellent professional service by the HGGO team!",
    avatar: "",
  },
  {
    name: "Vikram Malhotra",
    date: "27 Mar 2026",
    rating: 5,
    text: "I was worried about highway stone chips on my BMW. The matte PPF installation was flawless and it gave my car a whole new aggressive look. Truly premium work.",
    avatar: "",
  },
  {
    name: "Rohan Deshmukh",
    date: "5 Apr 2026",
    rating: 5,
    text: "Professional staff and top-tier materials. They explained the difference between TPH and TPU clearly. My Virtus looks better than it did at the showroom delivery.",
    avatar: "",
  },
];

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch (e) {
    return "";
  }
};

const getImageUrl = (imagePath) => {
  if (!imagePath) return "";
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }
  return `${BASE}${imagePath}`;
};

export default function TestimonialsView() {
  const [isMobile, setIsMobile] = useState(false);
  const [dynamicTestimonials, setDynamicTestimonials] = useState([]);
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(`${BASE}/testimonials/`);
        const json = await response.json();
        const data = Array.isArray(json) ? json : (json.data || []);
        if (data && data.length > 0) {
          setDynamicTestimonials(data);
        } else {
          setDynamicTestimonials(testimonials);
        }
      } catch (err) {
        console.error("Error fetching testimonials:", err);
        setDynamicTestimonials(testimonials);
      }
    };
    fetchTestimonials();
  }, []);

  const displayTestimonials = dynamicTestimonials.length > 0 ? dynamicTestimonials : testimonials;
  const loopedTestimonials = [...displayTestimonials, ...displayTestimonials];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 overflow-hidden"
      style={{ backgroundColor: themes.backgroundBlack }}
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
        {/* ================= LEFT SIDE (TEXT) ================= */}
        <div>
          <div
            className={`
              transition-all duration-700 ease-out
              ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
            `}
          >
            <DecoratedTitle
              text="TESTIMONIALS"
              style={{ color: themes.textWhite }}
            />
          </div>

          <div
            className={`
              mt-4 transition-all duration-700 ease-out delay-150
              ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
            `}
          >
            <SectionHeading
              secondLine=""
              className="text-left mx-0"
              style={{ color: themes.textWhite }}
            >
              What They Say
            </SectionHeading>
          </div>
        </div>

        {/* ================= RIGHT SIDE (SLIDER) ================= */}
        <div
          className={`
            lg:col-span-2 overflow-hidden w-full
            transition-all duration-900 ease-out delay-300
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}
          `}
        >
          <div className="overflow-hidden">
            <div className="flex gap-6 animate-marquee">
              {loopedTestimonials.map((item, i) => (
                <TestimonialCard key={i} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>


    </section>

  );
}

/* ===================== CARD ===================== */

function TestimonialCard({ item }) {
  const name = item.name;
  const rating = item.rating || 5;
  const text = item.description || item.text;
  const avatar = item.image ? getImageUrl(item.image) : item.avatar;
  const date = item.created_at ? formatDate(item.created_at) : item.date;

  return (
    <div className="min-w-full md:min-w-[50%] px-4 box-border">
      <div
        className="rounded-2xl p-8 h-full"
        style={{ backgroundColor: themes.backgroundGray }}
      >
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          {avatar ? (
            <img
              src={avatar}
              className="w-12 h-12 rounded-full object-cover"
              alt={name}
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center font-bold text-white">
              {name?.charAt(0)}
            </div>
          )}
          <div>
            <h4 className="font-semibold" style={{ color: themes.textWhite }}>
              {name}
            </h4>
            <p
              className="text-sm opacity-70"
              style={{ color: themes.textWhite }}
            >
              {date}
            </p>
          </div>
        </div>

        {/* Stars */}
        <div className="flex gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              style={{ color: i < rating ? "#fbbf24" : "#444" }}
            >
              ★
            </span>
          ))}
        </div>

        {/* Text */}
        <p
          className="leading-relaxed opacity-80"
          style={{ color: themes.textWhite }}
        >
          {text}
        </p>
      </div>
    </div>
  );
}