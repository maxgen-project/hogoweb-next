"use client";

import { themes } from "../config/themeConfig";
import InnerBanner from "../components/InnerBanner";

const bg = "/images/serviceBanner.jpg";

export default function PrivacyPage() {
  return (
    <>
      <InnerBanner title="Privacy Policy" current="Privacy Policy" bg={bg} />

      <section
        className="py-20 px-6"
        style={{ backgroundColor: themes.backgroundBlack, color: themes.textWhite }}
      >
        <div className="max-w-5xl mx-auto space-y-8 leading-relaxed opacity-90">
          <h2 className="text-2xl font-semibold">Information We Collect</h2>
          <p>
            We may collect personal information such as name, phone number,
            email, and vehicle details when you contact us or request a quote.
          </p>

          <h2 className="text-2xl font-semibold">How We Use Information</h2>
          <p>
            Your data is used to provide services, respond to inquiries, and
            improve customer experience. We do not sell personal data.
          </p>

          <h2 className="text-2xl font-semibold">Data Protection</h2>
          <p>
            We implement security measures to protect your personal data from
            unauthorized access or disclosure.
          </p>

          <h2 className="text-2xl font-semibold">Third-Party Sharing</h2>
          <p>
            We may share necessary information with service partners strictly
            for service delivery purposes.
          </p>

          <h2 className="text-2xl font-semibold">Contact</h2>
          <p>
            For privacy concerns, contact us at info@hogonnindia.com and sales@hogonnindia.com
          </p>
        </div>
      </section>
    </>
  );
}