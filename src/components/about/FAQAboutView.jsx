"use client";

import { useState, useRef, useEffect } from "react";
import { themes } from "../../config/themeConfig";
import DecoratedTitle from "../DecoratedTitle";
import SectionHeading from "../SectionHeading";

const faqs = [
  {
    q: "Who is HOGONN India Pvt. Ltd.?",
    a: "HOGONN India Pvt. Ltd. manufactures paint protection film, safety glaze window film and glass protection film in India. It is the automotive care brand of a group that has manufactured for the Indian automotive industry since 1979.",
  },
  {
    q: "How long has HOGONN been in the automotive industry?",
    a: "The group was founded in 1979 and has over 46 years in the automotive industry, initially in automotive accessories and auto components before expanding into automotive care products under the HOGONN brand.",
  },
  {
    q: "Is HOGONN an Indian manufacturer?",
    a: "Yes. HOGONN India Pvt. Ltd. manufactures in India. Buying from a domestic manufacturer means shorter lead times, pricing without import duty layered in, and technical support in the same time zone.",
  },
  {
    q: "Which OEMs have approved HOGONN's group products?",
    a: "The group's automotive accessories and auto components business holds approvals from Maruti Suzuki, Hyundai Motor India, Mahindra and Mahindra, and MG Motor. These approvals relate to that components and accessories business.",
  },
  {
    q: "What does HOGONN manufacture today?",
    a: "Paint protection film in six grades across gloss, matte and black finishes, Safety Glaze YUKI window film in 50% and 70% VLT, and dedicated Windshield PPF and Sunroof PPF.",
  },
  {
    q: "What raw materials does HOGONN use in its films?",
    a: "Our body films use thermoplastic polyurethane from Covestro, BASF or Lubrizol depending on the grade, with Ashland adhesive across the range. The material source is published on every product page.",
  },
  {
    q: "What is HOGONN's approach to quality?",
    a: "Our guiding principle is Quality and Consistency in Quality. Products are developed using advanced technologies, premium raw materials and rigorous quality control processes, so performance does not change between batches.",
  },
  {
    q: "How can I partner with HOGONN as a distributor or dealer?",
    a: "Detailing studios, installation centres and distributors can apply through our distributor enquiry form or by emailing info@hogonnindia.com with the territory they cover.",
  },
];

export default function FAQAboutView() {
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
              secondLine=""
              className="text-left mx-0"
              style={{ color: themes.textWhite }}
            >
              FAQs
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
                  className={`transition-transform duration-300 ${
                    active === i ? "rotate-180" : ""
                  }`}
                  style={{ color: themes.textWhite }}
                >
                  ▼
                </span>
              </div>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  active === i ? "max-h-40 mt-4" : "max-h-0"
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