"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { themes } from "../config/themeConfig";
import InnerBanner from "../components/InnerBanner";

const blogBanner = "/images/blogBanner.jpg";

/**
 * AUTHOR CONFIG
 * ─────────────────────────────────────────────────────────────────
 * TODO (Client): Replace with the real author's name once confirmed.
 * This value is used in the Article schema's author field.
 * Currently set to "HOGONN India Editorial Team" as a safe default.
 * ─────────────────────────────────────────────────────────────────
 */
const ARTICLE_AUTHOR = "HOGONN India Editorial Team";

const PUBLISHED_DATE = "2026-08-08";
const PUBLISHED_DATE_ISO = "2026-08-08T00:00:00+05:30";
const MODIFIED_DATE_ISO = "2026-08-08T00:00:00+05:30";
const PUBLISHED_DATE_VISIBLE = "8 August 2026";

/* ── images ── */
const IMG_HERO = "/images/blog1.jpg";
const IMG_SWIRL = "/images/blog2.jpg";
const IMG_BUCKET = "/images/blog3.jpg";
const IMG_BEADING = "/images/blog4.jpg";
const IMG_FILM = "/images/blog5.jpg";

/* ── FAQ DATA — must match JSON-LD word-for-word ── */
const FAQS = [
  {
    q: "What causes most paint damage on Indian roads?",
    a: "Stone chips from highway driving are the most common cause, followed by swirl marks from washing, acidic etching from bird droppings and tree sap, and UV fading over time. Stone chips are the hardest to repair invisibly because they break through the clear coat.",
  },
  {
    q: "Can bird droppings really damage car paint?",
    a: "Yes. Bird droppings are acidic and can etch through clear coat within hours in direct sun. The damage is not the stain itself but the chemical reaction underneath, which is why wiping them off late often leaves a permanent dull mark.",
  },
  {
    q: "Does ceramic coating protect against stone chips?",
    a: "No. A ceramic coating is a thin chemical layer that improves gloss and makes cleaning easier, but it does not absorb impact. Stone chip protection requires a physical film with thickness to it, such as paint protection film.",
  },
  {
    q: "How thick should paint protection film be?",
    a: "Most quality body films are around 188 microns, which is 7.5 mil. HOGONN body films are 188 microns. Films for glass, such as windshield and sunroof film, are typically thinner at 163 microns.",
  },
  {
    q: "What is self-healing paint protection film?",
    a: "Self-healing film has a top coat formulated so that light scratches and swirl marks close up when heat is applied, from sunlight, a warm water rinse or a heat gun. HOGONN films are rated 100% heat healing.",
  },
  {
    q: "Will paint protection film turn yellow in Indian sun?",
    a: "Lower-grade films can amber within a couple of seasons. Check whether anti-yellowing is warranted, and for how long. HOGONN clear and matte films carry anti-yellowing cover for the full warranty term, up to 10 years on PPF VAJRA.",
  },
  {
    q: "Does paint protection film damage the original paint when removed?",
    a: "Quality film uses an adhesive designed for clean removal and can be taken off without lifting factory paint. Film is often applied specifically to preserve original paint and protect resale value.",
  },
  {
    q: "How much of the car should be covered?",
    a: "Front-end coverage such as bonnet, bumper and mirrors addresses the highest-impact areas. Full-body coverage protects everything including doors and rear panels. Discuss coverage options with an installer based on how the vehicle is used.",
  },
];

export default function ArticleProtectCar() {
  const [activeQ, setActiveQ] = useState(null);
  const sectionRef = useRef(null);
  const [sectionVisible, setSectionVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <article style={{ backgroundColor: themes.backgroundBlack }}>
      {/* ── HERO BANNER with breadcrumb ── */}
      <InnerBanner
        title="How to Protect Your Car From Scratches, Stone Chips and Bird Droppings"
        parent="Blog"
        parentLink="/blog"
        current="How to Protect Your Car From Scratches..."
        bg={blogBanner}
      />

      {/* ── ARTICLE META BAR ── */}
      <div
        className="border-b"
        style={{
          backgroundColor: "#07071a",
          borderColor: "rgba(255,255,255,0.08)",
        }}
      >
        <div className="max-w-4xl mx-auto px-6 py-4 flex flex-wrap items-center gap-4 text-sm">
          <span
            className="px-3 py-1 rounded text-xs font-semibold uppercase"
            style={{ backgroundColor: themes.primary, color: "#fff" }}
          >
            Paint Protection
          </span>
          <time
            dateTime={PUBLISHED_DATE_ISO}
            className="flex items-center gap-1"
            style={{ color: themes.backgroundGray }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Published {PUBLISHED_DATE_VISIBLE}
          </time>
          <span style={{ color: themes.backgroundGray }}>· 6 min read</span>
          <span style={{ color: themes.backgroundGray }}>
            By {ARTICLE_AUTHOR}
          </span>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-4xl mx-auto px-6 py-14" ref={sectionRef}>
        {/* ─────────────────────────────────────────────
            H1 (the only H1 in this document)
        ───────────────────────────────────────────── */}
        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-8"
          style={{ color: themes.textWhite, fontFamily: themes.fontPrimary }}
        >
          How to Protect Your Car From Scratches, Stone Chips and Bird Droppings
        </h1>

        {/* Hero image — NOT lazy-loaded */}
        <figure className="mb-8 rounded-xl overflow-hidden">
          <img
            src={IMG_HERO}
            alt="Stone chip damage on a car bonnet"
            width={1200}
            height={800}
            loading="eager"
            fetchPriority="high"
            className="w-full h-auto object-cover"
            style={{ maxHeight: "500px" }}
          />
        </figure>

        {/* Intro paragraphs */}
        <p
          className="text-base sm:text-lg leading-relaxed mb-5"
          style={{ color: themes.textWhite, opacity: 0.85 }}
        >
          Most paint damage does not happen in one dramatic moment. It
          accumulates — a chip on the bonnet from a highway stone, a set of fine
          swirls from a roadside wash, a dull patch where a bird dropping sat in
          the sun for a day.
        </p>
        <p
          className="text-base sm:text-lg leading-relaxed mb-5"
          style={{ color: themes.textWhite, opacity: 0.85 }}
        >
          None of it is individually serious. Together, over three or four
          years, it is the difference between a car that looks its age and one
          that does not — and at resale, that difference is measured in money.
        </p>
        <p
          className="text-base sm:text-lg leading-relaxed mb-10"
          style={{ color: themes.textWhite, opacity: 0.85 }}
        >
          This guide covers what actually causes paint damage on Indian roads,
          what you can do about it for free, and where protective film genuinely
          earns its cost.
        </p>

        {/* ─────────────────────────────────────────────
            H2: The Four Things That Actually Damage Car Paint
        ───────────────────────────────────────────── */}
        <h2
          className="text-2xl sm:text-3xl font-bold mb-6 mt-12 pb-3"
          style={{
            color: themes.textWhite,
            fontFamily: themes.fontPrimary,
            borderBottom: `2px solid ${themes.primary}`,
          }}
        >
          The Four Things That Actually Damage Car Paint
        </h2>

        {/* H3: Stone Chips */}
        <h3
          className="text-xl font-semibold mb-3 mt-8"
          style={{ color: themes.primary }}
        >
          Stone Chips and Road Debris
        </h3>
        <p
          className="text-base leading-relaxed mb-6"
          style={{ color: themes.textWhite, opacity: 0.8 }}
        >
          The most common cause of paint damage in India, and the hardest to
          repair invisibly. A stone thrown up at 80 km/h carries enough energy
          to break through clear coat and base coat in one strike. Bonnets,
          front bumpers, wing mirrors and the leading edge of the roof take the
          worst of it. Touch-up paint fills a chip but rarely matches, so the
          repair often remains visible.
        </p>

        {/* H3: Scratches and Swirl Marks */}
        <h3
          className="text-xl font-semibold mb-3 mt-8"
          style={{ color: themes.primary }}
        >
          Scratches and Swirl Marks
        </h3>
        <figure className="mb-5 rounded-xl overflow-hidden">
          <img
            src={IMG_SWIRL}
            alt="Swirl marks visible on dark car paint in sunlight"
            width={800}
            height={534}
            loading="lazy"
            className="w-full h-auto object-cover"
            style={{ maxHeight: "380px" }}
          />
        </figure>
        <p
          className="text-base leading-relaxed mb-6"
          style={{ color: themes.textWhite, opacity: 0.8 }}
        >
          The fine cobweb pattern visible under direct sunlight. These come from
          washing more often than from anything else: a gritty sponge, a reused
          bucket, an automatic brush wash, or wiping dust off a dry panel. Each
          pass drags trapped grit across the clear coat. Individually invisible,
          collectively they are what makes older paint look flat.
        </p>

        {/* H3: Bird Droppings */}
        <h3
          className="text-xl font-semibold mb-3 mt-8"
          style={{ color: themes.primary }}
        >
          Bird Droppings and Tree Sap
        </h3>
        <p
          className="text-base leading-relaxed mb-6"
          style={{ color: themes.textWhite, opacity: 0.8 }}
        >
          Bird droppings are acidic, and in direct sun they can etch through
          clear coat within hours. The lasting damage is not the stain but the
          chemical reaction beneath it, which leaves a dull, slightly sunken
          mark that washing will not remove. Tree sap behaves similarly and
          hardens, so scraping it off adds scratches to the etching.
        </p>

        {/* H3: UV Exposure */}
        <h3
          className="text-xl font-semibold mb-3 mt-8"
          style={{ color: themes.primary }}
        >
          UV Exposure and Oxidation
        </h3>
        <p
          className="text-base leading-relaxed mb-6"
          style={{ color: themes.textWhite, opacity: 0.8 }}
        >
          The slowest of the four and the easiest to miss, because it happens
          evenly across the car. Ultraviolet radiation breaks down the clear
          coat over years, dulling colour and eventually causing a chalky
          surface. Red and dark blue paints show it first. In Indian conditions,
          a car parked outside year-round will show visible UV dulling well
          before one kept covered.
        </p>

        {/* ─────────────────────────────────────────────
            H2: What You Can Do Without Spending Anything
        ───────────────────────────────────────────── */}
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4 mt-14 pb-3"
          style={{
            color: themes.textWhite,
            fontFamily: themes.fontPrimary,
            borderBottom: `2px solid ${themes.primary}`,
          }}
        >
          What You Can Do Without Spending Anything
        </h2>
        <p
          className="text-base leading-relaxed mb-6"
          style={{ color: themes.textWhite, opacity: 0.8 }}
        >
          Before considering any product, these four habits prevent more damage
          than most paid solutions.
        </p>

        {/* H3: Change How You Wash */}
        <h3
          className="text-xl font-semibold mb-3 mt-8"
          style={{ color: themes.primary }}
        >
          Change How You Wash the Car
        </h3>
        <figure className="mb-5 rounded-xl overflow-hidden">
          <img
            src={IMG_BUCKET}
            alt="Two-bucket car washing method to prevent swirl marks"
            width={800}
            height={534}
            loading="lazy"
            className="w-full h-auto object-cover"
            style={{ maxHeight: "380px" }}
          />
        </figure>
        <p
          className="text-base leading-relaxed mb-6"
          style={{ color: themes.textWhite, opacity: 0.8 }}
        >
          Use two buckets: one with shampoo, one with plain water to rinse the
          mitt between panels. That single change keeps grit out of the wash and
          prevents most swirl marks. Rinse loose dust off before touching the
          paint, wash top to bottom, and never wipe a dry panel. Avoid automatic
          brush washes entirely — the brushes hold grit from every car before
          yours.
        </p>

        {/* H3: Clean Contamination */}
        <h3
          className="text-xl font-semibold mb-3 mt-8"
          style={{ color: themes.primary }}
        >
          Clean Contamination Immediately
        </h3>
        <p
          className="text-base leading-relaxed mb-6"
          style={{ color: themes.textWhite, opacity: 0.8 }}
        >
          Bird droppings and tree sap cause damage as a function of time and
          heat. Removed within a few hours, they usually leave nothing. Left for
          a day in the sun, they can leave a permanent mark. Keep a detailing
          spray and a microfibre cloth in the car — soften the deposit, then
          lift it away rather than rubbing it across the paint.
        </p>

        {/* H3: Where You Park */}
        <h3
          className="text-xl font-semibold mb-3 mt-8"
          style={{ color: themes.primary }}
        >
          Think About Where You Park
        </h3>
        <p
          className="text-base leading-relaxed mb-6"
          style={{ color: themes.textWhite, opacity: 0.8 }}
        >
          Shade reduces UV damage and keeps the surface cool, which slows the
          chemical reactions that cause etching. Avoid parking under trees that
          drop sap or attract birds. Covered parking is the single most
          effective free measure available.
        </p>

        {/* H3: Keep Your Distance */}
        <h3
          className="text-xl font-semibold mb-3 mt-8"
          style={{ color: themes.primary }}
        >
          Keep Your Distance on Highways
        </h3>
        <p
          className="text-base leading-relaxed mb-6"
          style={{ color: themes.textWhite, opacity: 0.8 }}
        >
          Most stone chips come from the vehicle in front. Increasing following
          distance reduces both the number and the velocity of impacts. Trucks
          and construction vehicles are worth giving significantly more room.
        </p>

        {/* ─────────────────────────────────────────────
            H2: Where Everyday Care Stops Working
        ───────────────────────────────────────────── */}
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4 mt-14 pb-3"
          style={{
            color: themes.textWhite,
            fontFamily: themes.fontPrimary,
            borderBottom: `2px solid ${themes.primary}`,
          }}
        >
          Where Everyday Care Stops Working
        </h2>
        <p
          className="text-base leading-relaxed mb-4"
          style={{ color: themes.textWhite, opacity: 0.8 }}
        >
          Good habits substantially reduce swirl marks, etching and UV damage.
          They do very little about stone chips.
        </p>
        <p
          className="text-base leading-relaxed mb-4"
          style={{ color: themes.textWhite, opacity: 0.8 }}
        >
          A stone strikes with force. No washing technique, wax or coating
          changes what happens when it lands — the only thing that helps is a
          physical layer between the stone and the paint, thick enough to absorb
          the impact.
        </p>
        <p
          className="text-base leading-relaxed mb-6"
          style={{ color: themes.textWhite, opacity: 0.8 }}
        >
          That is the gap paint protection film exists to fill.
        </p>

        {/* ─────────────────────────────────────────────
            H2: Paint Protection Film
        ───────────────────────────────────────────── */}
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4 mt-14 pb-3"
          style={{
            color: themes.textWhite,
            fontFamily: themes.fontPrimary,
            borderBottom: `2px solid ${themes.primary}`,
          }}
        >
          Paint Protection Film: What It Is and What It Does
        </h2>
        <figure className="mb-5 rounded-xl overflow-hidden">
          <img
            src={IMG_BEADING}
            alt="Water beading on hydrophobic paint protection film"
            width={800}
            height={534}
            loading="lazy"
            className="w-full h-auto object-cover"
            style={{ maxHeight: "380px" }}
          />
        </figure>
        <p
          className="text-base leading-relaxed mb-4"
          style={{ color: themes.textWhite, opacity: 0.8 }}
        >
          Paint protection film, usually shortened to PPF, is a transparent
          thermoplastic polyurethane film applied over painted panels. Quality
          body films are around 188 microns thick — roughly twice the thickness
          of a car's factory clear coat.
        </p>
        <p
          className="text-base leading-relaxed mb-4"
          style={{ color: themes.textWhite, opacity: 0.8 }}
        >
          That thickness is what absorbs stone chips. The film takes the impact
          and the paint underneath is unaffected.
        </p>
        <p
          className="text-base leading-relaxed mb-4"
          style={{ color: themes.textWhite, opacity: 0.8 }}
        >
          Modern films do more than absorb impact. A self-healing top coat
          closes light scratches and swirl marks when heat is applied, whether
          from sunlight, a warm water rinse or a heat gun. A hydrophobic surface
          makes water bead and roll off, carrying dust with it, and resists the
          acidic etching caused by bird droppings. UV-stable films block the
          radiation that dulls paint over time.
        </p>
        <p
          className="text-base leading-relaxed mb-6"
          style={{ color: themes.textWhite, opacity: 0.8 }}
        >
          The film is optically clear, so the car looks unchanged, and it can be
          removed without damaging the factory paint underneath — which is why
          film is often applied specifically to preserve original paint for
          resale.
        </p>

        {/* ─────────────────────────────────────────────
            H2: PPF or Ceramic Coating?
        ───────────────────────────────────────────── */}
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4 mt-14 pb-3"
          style={{
            color: themes.textWhite,
            fontFamily: themes.fontPrimary,
            borderBottom: `2px solid ${themes.primary}`,
          }}
        >
          Paint Protection Film or Ceramic Coating?
        </h2>
        <p
          className="text-base leading-relaxed mb-4"
          style={{ color: themes.textWhite, opacity: 0.8 }}
        >
          These are frequently presented as alternatives. They are not — they
          solve different problems.
        </p>
        <p
          className="text-base leading-relaxed mb-4"
          style={{ color: themes.textWhite, opacity: 0.8 }}
        >
          A ceramic coating is a liquid polymer that cures into a thin, hard,
          hydrophobic layer. It adds gloss, makes washing easier and gives some
          resistance to chemical staining. It is measured in microns in the
          single digits.
        </p>
        <p
          className="text-base leading-relaxed mb-4"
          style={{ color: themes.textWhite, opacity: 0.8 }}
        >
          It does not stop stone chips. There is no meaningful thickness to
          absorb an impact.
        </p>
        <p
          className="text-base leading-relaxed mb-6"
          style={{ color: themes.textWhite, opacity: 0.8 }}
        >
          Paint protection film is a physical film, roughly a hundred times
          thicker than a coating, and it does stop stone chips. Many owners
          apply both — film on the high-impact front end, coating over the top
          for gloss and easier cleaning. If you can only choose one and highway
          driving is part of your week, film addresses the damage that cannot be
          polished out later.
        </p>

        {/* ─────────────────────────────────────────────
            H2: What to Check Before Choosing a Film
        ───────────────────────────────────────────── */}
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4 mt-14 pb-3"
          style={{
            color: themes.textWhite,
            fontFamily: themes.fontPrimary,
            borderBottom: `2px solid ${themes.primary}`,
          }}
        >
          What to Check Before Choosing a Film
        </h2>
        <figure className="mb-5 rounded-xl overflow-hidden">
          <img
            src={IMG_FILM}
            alt="Paint protection film being applied to a car bonnet"
            width={800}
            height={534}
            loading="lazy"
            className="w-full h-auto object-cover"
            style={{ maxHeight: "380px" }}
          />
        </figure>
        <p
          className="text-base leading-relaxed mb-6"
          style={{ color: themes.textWhite, opacity: 0.8 }}
        >
          Film quality varies enormously, and most of the difference is
          invisible on the showroom sample. Four things are worth asking about.
        </p>

        {/* H3: Thickness */}
        <h3
          className="text-xl font-semibold mb-3 mt-8"
          style={{ color: themes.primary }}
        >
          Thickness
        </h3>
        <p
          className="text-base leading-relaxed mb-6"
          style={{ color: themes.textWhite, opacity: 0.8 }}
        >
          Most quality body films are around 188 microns, or 7.5 mil. Thinner
          film costs less and absorbs less. Films for glass, such as windshield
          and sunroof film, are typically thinner at around 163 microns because
          the requirement is different.
        </p>

        {/* H3: TPU Source */}
        <h3
          className="text-xl font-semibold mb-3 mt-8"
          style={{ color: themes.primary }}
        >
          TPU Source
        </h3>
        <p
          className="text-base leading-relaxed mb-6"
          style={{ color: themes.textWhite, opacity: 0.8 }}
        >
          Film performance is largely decided by the polymer it is made from.
          Ask which TPU the film uses. Established polymer producers such as
          Covestro, BASF and Lubrizol supply the global film industry — and a
          manufacturer willing to name its source is telling you something a
          brochure adjective cannot.
        </p>

        {/* H3: Warranty */}
        <h3
          className="text-xl font-semibold mb-3 mt-8"
          style={{ color: themes.primary }}
        >
          Warranty and Anti-Yellowing Term
        </h3>
        <p
          className="text-base leading-relaxed mb-6"
          style={{ color: themes.textWhite, opacity: 0.8 }}
        >
          Ask two questions, not one: how long is the warranty, and is
          anti-yellowing covered for that full period? Indian sun is
          unforgiving, and lower-grade films can amber within a couple of
          seasons. A ten-year warranty with three years of anti-yellowing cover
          is not a ten-year film.
        </p>

        {/* H3: Self-Healing */}
        <h3
          className="text-xl font-semibold mb-3 mt-8"
          style={{ color: themes.primary }}
        >
          Self-Healing
        </h3>
        <p
          className="text-base leading-relaxed mb-6"
          style={{ color: themes.textWhite, opacity: 0.8 }}
        >
          Most quality films now self-heal. Ask whether that is rated at 100%
          heat healing, and try it on a sample — a light scratch and a warm
          water rinse will show you.
        </p>

        {/* ─────────────────────────────────────────────
            H2: How Much to Cover
        ───────────────────────────────────────────── */}
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4 mt-14 pb-3"
          style={{
            color: themes.textWhite,
            fontFamily: themes.fontPrimary,
            borderBottom: `2px solid ${themes.primary}`,
          }}
        >
          How Much of the Car Should You Cover?
        </h2>
        <p
          className="text-base leading-relaxed mb-4"
          style={{ color: themes.textWhite, opacity: 0.8 }}
        >
          Coverage is usually the biggest variable in cost.
        </p>
        <p
          className="text-base leading-relaxed mb-4"
          style={{ color: themes.textWhite, opacity: 0.8 }}
        >
          Front-end coverage — bonnet, front bumper, wing mirrors and the
          leading edge of the roof — addresses the areas that take the
          overwhelming majority of stone chips. For most owners this is where
          the value sits.
        </p>
        <p
          className="text-base leading-relaxed mb-4"
          style={{ color: themes.textWhite, opacity: 0.8 }}
        >
          Full-body coverage protects everything, including doors, rear quarters
          and the boot. It makes sense for vehicles where resale value is
          significant, where the paint is a premium or non-standard finish, or
          where the car covers long highway distances regularly.
        </p>
        <p
          className="text-base leading-relaxed mb-4"
          style={{ color: themes.textWhite, opacity: 0.8 }}
        >
          Glass is worth considering separately. Windshields take direct stone
          impacts and cannot be repaired invisibly, and sunroofs sit
          horizontally in full sun. Dedicated films exist for both.
        </p>
        <p
          className="text-base leading-relaxed mb-6"
          style={{ color: themes.textWhite, opacity: 0.8 }}
        >
          An experienced installer will advise based on how you actually use the
          vehicle. That conversation is worth having before deciding on a budget.
        </p>

        {/* ── CLOSING + CTAs ── */}
        <div
          className="my-12 p-6 sm:p-8 rounded-xl"
          style={{
            backgroundColor: "#07071a",
            border: `1px solid rgba(210,0,0,0.25)`,
          }}
        >
          <p
            className="text-base leading-relaxed mb-4"
            style={{ color: themes.textWhite, opacity: 0.85 }}
          >
            Most paint damage is preventable, and a good share of it is
            preventable for free. Change how you wash the car, deal with bird
            droppings quickly, and park in shade where you can — those three
            habits alone will keep paint looking newer for years.
          </p>
          <p
            className="text-base leading-relaxed mb-6"
            style={{ color: themes.textWhite, opacity: 0.85 }}
          >
            For stone chips, film is the only answer that works. Whether that is
            worth it depends on how much you drive, where you drive, and how much
            the car&apos;s appearance and resale value matter to you.
          </p>
          <p
            className="text-base leading-relaxed mb-8"
            style={{ color: themes.textWhite, opacity: 0.85 }}
          >
            HOGONN manufactures paint protection film in India across six grades,
            with warranties from 6 to 10 years. If you would like to understand
            the options, explore our{" "}
            <Link
              href="/product"
              className="font-semibold underline underline-offset-2 hover:opacity-80 transition-opacity duration-200"
              style={{ color: themes.primary }}
            >
              paint protection film range
            </Link>{" "}
            or{" "}
            <Link
              href="/contact"
              className="font-semibold underline underline-offset-2 hover:opacity-80 transition-opacity duration-200"
              style={{ color: themes.primary }}
            >
              contact us
            </Link>{" "}
            and we will point you to an installer.
          </p>
          {/* Internal CTA links */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/product"
              className="inline-block px-6 py-3 rounded-md font-semibold text-sm text-center transition-all duration-300 hover:opacity-90"
              style={{ backgroundColor: themes.primary, color: "#fff" }}
            >
              Explore HOGONN Paint Protection Film
            </Link>
            <Link
              href="/contact"
              className="inline-block px-6 py-3 rounded-md font-semibold text-sm text-center border transition-all duration-300"
              style={{
                borderColor: "rgba(255,255,255,0.3)",
                color: themes.textWhite,
              }}
            >
              Find an Installer
            </Link>
          </div>
        </div>

        {/* ─────────────────────────────────────────────
            H2: Frequently Asked Questions
        ───────────────────────────────────────────── */}
        <h2
          id="faq"
          className="text-2xl sm:text-3xl font-bold mb-8 mt-14 pb-3"
          style={{
            color: themes.textWhite,
            fontFamily: themes.fontPrimary,
            borderBottom: `2px solid ${themes.primary}`,
          }}
        >
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {FAQS.map((item, i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden"
              style={{
                backgroundColor: "#07071a",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <button
                id={`faq-btn-${i}`}
                aria-expanded={activeQ === i}
                aria-controls={`faq-answer-${i}`}
                onClick={() => setActiveQ(activeQ === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-200"
                style={{ color: themes.textWhite }}
              >
                <span className="font-semibold text-base pr-4">{item.q}</span>
                <span
                  className={`text-lg flex-shrink-0 transition-transform duration-300 ${
                    activeQ === i ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                  style={{ color: themes.primary }}
                >
                  ▼
                </span>
              </button>

              <div
                id={`faq-answer-${i}`}
                role="region"
                aria-labelledby={`faq-btn-${i}`}
                className={`overflow-hidden transition-all duration-300 ${
                  activeQ === i ? "max-h-80" : "max-h-0"
                }`}
              >
                <p
                  className="px-6 pb-6 text-sm sm:text-base leading-relaxed"
                  style={{ color: themes.textWhite, opacity: 0.75 }}
                >
                  {item.a}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Back to Blog */}
        <div className="mt-14 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-200 hover:underline"
            style={{ color: themes.primary }}
          >
            <span aria-hidden="true">←</span> Back to Blog
          </Link>
        </div>
      </div>
    </article>
  );
}
