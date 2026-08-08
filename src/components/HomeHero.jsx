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
const car = "/images/2.png";
const websiteBackground = "/images/Homepage-background.png";

export default function HomeHero() {
  const [animate, setAnimate] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);

  useEffect(() => {
    setAnimate(true);
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
            Paint Protection Film Manufactured in India
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
            Ultimate Shield for Your Car's Protection
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

        {/* CAR IMAGE */}
        <div className="relative w-full flex justify-center mt-8">
          <img
            src={car}
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
      <AutomotiveFilmsCTA />

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
