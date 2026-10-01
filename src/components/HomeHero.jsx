"use client";

import RollingButton from "./RollingButton";
import AboutView from "./AboutView";
import ParallaxCarSection from "./ParallaxCarSection";
import QuoteFormModal from "./QuoteFormModal";
import { themes } from "../config/themeConfig";
import WhyChoose from "./WhyChoose";
import TestimonialsView from "./TestimonialView";
import FAQView from "./FAQView";
import CtaView from "./CtaView";
import InstagramView from "./InstagramView";
import BeforeAfterView from "./BeforeAfterView";
import DistributorCTA from "./DistributorCTA";
import { useEffect, useState } from "react";
import AutomotiveProductsView from "./AutomotiveProductsView";
import AutomotiveFilmsCTA from "./AutomotiveFilmsCTAView";
import { apiInfo, BASE } from "../service/api";

const fallbackCar = "/images/2.png";
const fallbackTitle = "Paint Protection Film Manufactured in India";
const fallbackSubtitle = "Ultimate Shield for Your Car's Protection";
const websiteBackground = "/images/Homepage-background.png";

export default function HomeHero() {
  const [animate, setAnimate] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [carImage, setCarImage] = useState(fallbackCar);
  const [title, setTitle] = useState(fallbackTitle);
  const [subtitle, setSubtitle] = useState(fallbackSubtitle);

  useEffect(() => {
    setAnimate(true);

    apiInfo
      .get("/banner/")
      .then((res) => {
        const banners = res.data?.data;
        if (Array.isArray(banners) && banners.length > 0) {
          const activeBanner = banners.find(
            (b) => b?.status === true || b?.status === "true"
          );
          if (activeBanner) {
            if (activeBanner.image) {
              const fullUrl = activeBanner.image.startsWith("http")
                ? activeBanner.image
                : `${BASE}${activeBanner.image}`;
              setCarImage(fullUrl);
            }
            if (activeBanner.title && activeBanner.title.trim()) {
              setTitle(activeBanner.title.trim());
            }
            if (activeBanner.subtitle && activeBanner.subtitle.trim()) {
              setSubtitle(activeBanner.subtitle.trim());
            }
          }
        }
      })
      .catch((err) => {
        console.error("Error fetching hero banner:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <section
        className="
    relative w-full
    flex flex-col items-center 
    pt-24 sm:pt-32
    pb-6 sm:pb-12
    bg-cover bg-center bg-no-repeat
  "
        style={{
          backgroundImage: `url(${websiteBackground})`,
          backgroundColor: themes.backgroundBlack,
        }}
      >
        {/* LIGHT OVERLAY */}
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: themes.backgroundBlack,
            opacity: 0.6,
          }}
        ></div>

        {/* CONTENT */}
        <div
          className="relative max-w-7xl mx-auto px-6 text-center"
          style={{ color: themes.textWhite }}
        >
          {/* HEADING */}
          <h1
            className={`
          uppercase text-center mx-auto
          text-[clamp(28px,4.5vw,72px)]
          leading-[1.08]
          max-w-[14ch] md:max-w-[18ch]
          text-balance
          transition-all duration-700 ease-out
          ${animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
        `}
          >
            {title}
          </h1>

          {/* PARAGRAPH */}
          <p
            className={`
          mt-6 max-w-xl mx-auto text-base sm:text-lg
          transition-all duration-700 ease-out delay-150
          ${animate ? "opacity-80 translate-y-0" : "opacity-0 translate-y-10"}
        `}
            style={{
              fontFamily: themes.fontPrimary,
              fontWeight: "400",
              color: themes.textWhite,
            }}
          >
            {subtitle}
          </p>

          {/* BUTTON */}
          <div
            className={`
          mt-6 sm:mt-10 flex justify-center
          transition-all duration-700 ease-out delay-300
          ${animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
        `}
          >
            <RollingButton
              text="Get A Quote"
              onClick={() => setQuoteOpen(true)}
            />
          </div>
        </div>

        {/* CAR IMAGE / LOADER */}
        <div className="relative w-full flex justify-center items-center mt-8 min-h-[220px] sm:min-h-[350px] md:min-h-[440px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-4 animate-spin"
                style={{
                  borderColor: themes.primary,
                  borderTopColor: "transparent",
                }}
              />
            </div>
          ) : (
            <img
              src={carImage}
              onError={() => {
                if (carImage !== fallbackCar) {
                  setCarImage(fallbackCar);
                }
              }}
              alt="Car"
              className="
        w-[95%]
        sm:w-[90%]
        md:w-[85%]
        lg:w-[80%]
        max-w-[1304px]
        h-auto
        object-contain
      "
            />
          )}
        </div>
      </section>
      <DistributorCTA />
      {/* ABOUT SECTION */}
      <div
        className="py-16"
        style={{ backgroundColor: themes.backgroundGray }}
      >
        <AboutView />
      </div>

      {/* CTA SECTION */}
      <div id="warranty">
        <div style={{ backgroundColor: themes.backgroundGray }}>
          <CtaView />
        </div>
      </div>
      <AutomotiveProductsView />
      {/* TESTIMONIAL SECTION */}
      <div
        className="py-8 sm:py-12 md:py-16"
        style={{ backgroundColor: themes.backgroundBlack }}
      >
        <TestimonialsView />
      </div>

      {/* WHY CHOOSE SECTION */}
      <div className="" style={{ backgroundColor: themes.backgroundBlack }}>
        <WhyChoose />
      </div>

      {/* BEFORE AFTER SECTION */}
      <div className="" style={{ backgroundColor: themes.backgroundBlack }}>
        <BeforeAfterView />
      </div>
      {/* PARALLAX SECTION */}
      <div
        className="py-8 sm:py-12 md:py-16"
        style={{ backgroundColor: themes.backgroundBlack }}
      >
        <ParallaxCarSection />
      </div>

      {/* FAQ SECTION */}
      <div className="" style={{ backgroundColor: themes.backgroundBlack }}>
        <FAQView />
      </div>
      {/* <AutomotiveFilmsCTA /> */}

      {/* INSTAGRAM SECTION */}
      <div className="" style={{ backgroundColor: themes.backgroundBlack }}>
        <InstagramView />
      </div>

      <QuoteFormModal
        open={quoteOpen}
        onClose={() => setQuoteOpen(false)}
      />
    </>
  );
}
