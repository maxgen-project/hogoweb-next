"use client";

import { useEffect, useRef, useState } from "react";
import DecoratedTitle from "../DecoratedTitle";
import { themes } from "../../config/themeConfig";

export default function WayForward() {
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
            { threshold: 0.15 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="py-20 md:py-28"
            style={{ backgroundColor: themes.backgroundGray }}
        >
            <div className="mx-auto max-w-[800px] px-6">
                <div
                    className={`transition-all duration-700 ease-out
          ${visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                >
                    
                    <div className="mt-4">
                        <DecoratedTitle text="Hogonn India Pvt. Ltd.
Way Forward" color={themes.backgroundBlack} />
                    </div>
                </div>

                <div
                    className={`mt-10 flex flex-col gap-6 transition-all duration-700 delay-150 ease-out
          ${visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                >
                    <p className="text-sm leading-7 md:text-base" style={{ color: themes.backgroundBlack }}>
                        Recognising the rapid growth of the car detailing industry, the group
                        diversified into the premium automotive care segment with the launch of
                        advanced PPF solutions under the brand HOGONN.
                    </p>

                    <p className="text-sm leading-7 md:text-base" style={{ color: themes.backgroundBlack }}>
                        The same manufacturing discipline that supplies OEM production lines now
                        goes into surface protection: films engineered to global standards for
                        durability, performance and appearance.
                    </p>

                    <blockquote
                        className="border-l-4 border-red-600 pl-6 py-2 text-base italic md:text-lg"
                        style={{ color: themes.backgroundBlack }}
                    >
                        At the heart of this journey lies a guiding principle —
                        "Quality and Consistency in Quality."
                    </blockquote>

                    <p className="text-sm leading-7 md:text-base" style={{ color: themes.backgroundBlack }}>
                        Our products are developed using advanced technologies, premium raw
                        materials, and rigorous quality control processes.
                    </p>

                    <p className="text-sm leading-7 md:text-base" style={{ color: themes.backgroundBlack }}>
                        With a strong legacy and a forward-looking vision, Hogonn India Pvt. Ltd.
                        remains committed to delivering innovative, reliable, and world-class
                        automotive care solutions ensuring exceptional value and complete customer
                        satisfaction.
                    </p>
                      <p className="text-sm leading-7 md:text-base" style={{ color: themes.backgroundBlack }}>
                        Film performance is decided by the polymer it is made from. Our body films use thermoplastic polyurethane from Covestro, BASF and Lubrizol, with Ashland adhesive across the range. 
                    </p>
                </div>
            </div>
        </section>
    );
}