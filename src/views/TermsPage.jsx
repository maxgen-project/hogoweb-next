"use client";

import { themes } from "../config/themeConfig";
import InnerBanner from "../components/InnerBanner";

const bg = "/images/serviceBanner.jpg";

export default function TermsPage() {
  return (
    <>
      <InnerBanner title="Terms & Conditions" current="Terms & Conditions" bg={bg} />

      <section
        className="py-20 px-6"
        style={{ backgroundColor: themes.backgroundBlack, color: themes.textWhite }}
      >
        <div className="max-w-5xl mx-auto space-y-8 leading-relaxed opacity-90">
          <h2 className="text-2xl font-semibold">Introduction</h2>
          <p>
            These Terms & Conditions govern your use of our services and website.
            By accessing our site, you agree to comply with these terms.
          </p>

          <h2 className="text-2xl font-semibold">Services</h2>
          <p>
            We provide automotive protection services including Paint Protection
            Film, Ceramic Coating, and Window Films. Service details may change
            without prior notice.
          </p>

          <h2 className="text-2xl font-semibold">Payments</h2>
          <p>
            All services must be paid according to agreed quotation. We reserve
            the right to refuse service if payment terms are not met.
          </p>

          <h2 className="text-2xl font-semibold">Liability</h2>
          <p>
            While we take utmost care, we are not responsible for pre-existing
            vehicle conditions or damage not caused by our services.
          </p>

          <h2 className="text-2xl font-semibold">Changes</h2>
          <p>
            We may update these Terms at any time. Continued use of the website
            indicates acceptance of updated terms.
          </p>
        </div>
      </section>
    </>
  );
}