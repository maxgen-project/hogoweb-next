"use client";

import { useState, useRef, useEffect } from "react";
import { themes } from "../config/themeConfig";
import DecoratedTitle from "./DecoratedTitle";
import SectionHeading from "./SectionHeading";

const faqs = [
  {
    q: "What should I look for in a paint protection film?",
    a: "Judge a film on four things: the TPU it is made from, its thickness, its warranty term, and whether anti-yellowing is covered for that full term. HOGONN films use TPU from Covestro, BASF and Lubrizol, are 188 microns on body panels, and carry 6, 8 and 10-year warranties with matching anti-yellowing cover on the clear and matte grades.",
  },

  {
    q: "Is HOGONN paint protection film made in India?",
    a: "Yes. HOGONN India Pvt. Ltd. manufactures in India and is part of an automotive group that has supplied the industry since 1979, with OEM approvals across its components and accessories business from Maruti Suzuki, Hyundai Motor India, Mahindra and Mahindra, and MG Motor.",
  },

  {
    q: "What paint protection films does HOGONN make?",
    a: "Six body films: PPF YUVA Gloss, PPF VAYU Gloss, PPF VAYU Matte, PPF VAYU Black Gloss, PPF VAYU Black Matte and PPF VAJRA Gloss. We also make Safety Glaze YUKI window film, Windshield PPF and Sunroof PPF.",
  },

  {
    q: "Which HOGONN paint protection film has the longest warranty?",
    a: "PPF VAJRA Gloss carries a 10-year warranty with 10-year anti-yellowing cover, built on Lubrizol TPU with elongation above 345%. Safety Glaze YUKI window film also carries a 10-year warranty.",
  },

  {
    q: "How do I choose between PPF YUVA, VAYU and VAJRA?",
    a: "PPF YUVA is the 6-year grade on Covestro TPU for everyday durability. PPF VAYU is the 8-year grade on BASF TPU and offers the widest choice of finishes, including matte and black. PPF VAJRA is the 10-year grade on Lubrizol TPU with the highest elongation in the range.",
  },

  {
    q: "What TPU does HOGONN use in its paint protection film?",
    a: "Covestro, BASF or Lubrizol depending on the grade, with Ashland adhesive across the entire range. The TPU source is published on every product page.",
  },

  {
    q: "How thick is HOGONN paint protection film?",
    a: "All six body films are 7.5 mil, which is 188 microns, supplied in 1.52 by 15 metre rolls. Windshield PPF and Sunroof PPF are 6.5 mil, or 163 microns.",
  },

  {
    q: "Is HOGONN paint protection film self-healing?",
    a: "Yes. Every film in the range is rated 100% heat healing, so minor swirl marks and light scratches disappear with heat from sunlight, warm water or a heat gun.",
  },

  {
    q: "Does HOGONN paint protection film turn yellow?",
    a: "Anti-yellowing is covered for the full warranty term on the clear and matte grades: 6 years on PPF YUVA, 8 years on PPF VAYU Gloss and VAYU Matte, and 10 years on PPF VAJRA. It is listed as not applicable on VAYU Black Gloss and VAYU Black Matte.",
  },

  {
    q: "Can paint protection film be applied to vehicles other than cars?",
    a: "Yes. HOGONN film is applied to bicycles, scooters, motorbikes, vans, trucks, buses and trains.",
  },

  {
    q: "How do I become a HOGONN paint protection film distributor in India?",
    a: "Submit the distributor enquiry form or email info@hogonnindia.com with your location and the territory you cover. Our trade team will discuss territory availability, volume and commercial terms with you.",
  },

  {
    q: "How do I become a HOGONN dealer or installation partner?",
    a: "Detailing studios and installation centres can apply through the same trade enquiry route. Tell us where you operate and roughly what volume you handle, and we will come back to you on partnership terms.",
  },

  {
    q: "Does HOGONN supply paint protection film in bulk rolls?",
    a: "Yes. Body films are supplied in 1.52 by 15 metre rolls and Safety Glaze YUKI window film in 1.52 by 30 metre rolls. Contact our trade team to discuss quantities.",
  },

  {
    q: "Why buy from an Indian PPF manufacturer instead of importing?",
    a: "Buying direct from a domestic manufacturer removes the import duty and the distributor layers built into foreign-brand film, and shortens lead times. It also means warranty and technical support sit with a company you can reach in the same time zone.",
  },

  {
    q: "Is HOGONN paint protection film available near me?",
    a: "HOGONN supplies installation studios and dealership networks across India. Use the installer locator to find your nearest partner, or contact us and we will point you to one.",
  },

  {
    q: "What is paint protection film and why it is used?",
    a: "Paint protection film is a clear thermoplastic polyurethane layer applied over a vehicle's paint. It absorbs stone chips, scratches and chemical contamination that would otherwise damage the paint, and stays optically clear so the original colour shows through unchanged.",
  },
];
export default function FAQView() {
  const [active, setActive] = useState(null);
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
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24"
      style={{ backgroundColor: themes.backgroundBlack }}
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <div
            className={`
              transition-all duration-700 ease-out
              ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
            `}
          >
            <DecoratedTitle
              text="EVERYTHING YOU NEED TO KNOW"
              style={{ color: themes.backgroundBlack }}
            />
          </div>

          <div
            className={`
              mt-4 transition-all duration-700 ease-out delay-150
              ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
            `}
          >
            <SectionHeading
              secondLine="Questions"
              className="text-left mx-0"
              style={{ color: themes.textWhite }}
            >
              Frequently Asked
            </SectionHeading>
          </div>
        </div>

        <div
          className={`
            space-y-6
            transition-all duration-900 ease-out delay-300
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}
          `}
        >
          {faqs.map((item, i) => (
            <div
              key={i}
              className="border-b pb-6 cursor-pointer"
              style={{ borderColor: themes.backgroundGray }}
              onClick={() => setActive(active === i ? null : i)}
            >
              <div className="flex justify-between items-center gap-4">
                <h3
                  className="text-lg font-medium"
                  style={{ color: themes.textWhite }}
                >
                  {item.q}
                </h3>

                <span
                  className={`transition-transform duration-300 ${active === i ? "rotate-180" : ""
                    }`}
                  style={{ color: themes.textWhite }}
                >
                  ▼
                </span>
              </div>

              <div
                className={`overflow-hidden transition-all duration-300 ${active === i ? "max-h-40 mt-4" : "max-h-0"
                  }`}
              >
                <p
                  className="leading-relaxed opacity-80 whitespace-pre-line"
                  style={{ color: themes.textWhite }}
                >
                  {item.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}