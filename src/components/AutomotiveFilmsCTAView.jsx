"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import DecoratedTitle from "./DecoratedTitle";
import RollingButton from "./RollingButton";
import { themes } from "../config/themeConfig";

export default function AutomotiveFilmsCTA() {
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-20 md:py-28"
      style={{
        backgroundColor: themes.backgroundBlack,
        color: themes.textWhite,
      }}
    >
      {/* Decorative elements */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-red-600/10 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-red-600/5 blur-3xl" />

      {/* Decorative lines */}
      <div className="pointer-events-none absolute right-10 top-10 hidden h-32 w-32 border-r border-t border-white/10 md:block" />
      <div className="pointer-events-none absolute bottom-10 left-10 hidden h-32 w-32 border-b border-l border-white/10 md:block" />

      <div className="relative mx-auto max-w-[1200px] px-6">
        <div className="mx-auto max-w-4xl text-center">
          {/* Small label */}
          <div
            className={`mb-6 transition-all duration-700
              ${
                visible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-6 opacity-0"
              }`}
          >
            <span className="text-xs font-medium uppercase tracking-[0.35em] text-red-500">
              Automotive Films
            </span>
          </div>

          {/* Heading */}
          <div
            className={`transition-all duration-700 delay-100
              ${
                visible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
          >
            <DecoratedTitle
              text="Talk to Us About the Automotive Films"
              color={themes.textWhite}
            />
          </div>

          {/* Description */}
          <p
            className={`mx-auto mt-7 max-w-2xl text-sm leading-7 text-white/60 md:text-base
              transition-all duration-700 delay-200
              ${
                visible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
          >
            Trade enquiries, distribution partnerships and bulk supply —
            our team will get back to you within one working day.
          </p>

          {/* Buttons */}
          <div
            className={`mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row
              transition-all duration-700 delay-300
              ${
                visible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
          >
            <RollingButton
              text="Request a Quote"
              onClick={() => router.push("/contact")}
            />

            <button
              type="button"
              onClick={() => router.push("/become-a-distributor")}
              className="group relative overflow-hidden rounded-md border border-white/30 px-7 py-3 text-sm font-medium text-white transition-all duration-300 hover:border-red-600"
            >
              <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                Become a Distributor
              </span>

              <span
                className="absolute inset-0 origin-left scale-x-0 bg-red-600
                transition-transform duration-300 group-hover:scale-x-100"
              />
            </button>
          </div>

          {/* Bottom information */}
          <div
            className={`mt-12 flex items-center justify-center gap-4
              transition-all duration-700 delay-500
              ${
                visible
                  ? "opacity-100"
                  : "opacity-0"
              }`}
          >
            <span className="h-px w-10 bg-white/20" />

            <span className="text-[10px] uppercase tracking-[0.25em] text-white/30">
              HOGONN India Pvt. Ltd.
            </span>

            <span className="h-px w-10 bg-white/20" />
          </div>
        </div>
      </div>
    </section>
  );
}