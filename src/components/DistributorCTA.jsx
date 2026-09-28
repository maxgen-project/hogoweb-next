"use client";

import { useEffect, useRef, useState } from "react";
import DecoratedTitle from "./DecoratedTitle";
import RollingButton from "./RollingButton";
import DistributorFormModal from "./DistributorFormModal";
import { themes } from "../config/themeConfig";

export default function DistributorCTA() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

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
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <></>
    // <section
    //   ref={sectionRef}
    //   className="relative overflow-hidden py-20 md:py-28"
    //   style={{ backgroundColor: themes.backgroundBlack, color: themes.textWhite }}
    // >
    //   {/* Decorative glow, same as AutomotiveProductsView */}
    //   <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-red-600/10 blur-3xl" />
    //   <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-red-600/5 blur-3xl" />

    //   <div
    //     className={`relative mx-auto max-w-[900px] px-6 text-center
    //     transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
    //     ${visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
    //   >
    //     <DecoratedTitle text="Become a HOGONN Distributor" color={themes.textWhite} />

    //     <p
    //       className="mt-5 mx-auto max-w-2xl text-sm leading-7 md:text-base"
    //       style={{ color: "rgba(255,255,255,0.65)" }}
    //     >
    //       Partner with HOGONN and bring premium paint protection films to your
    //       region. Fill in your details and our team will get in touch with you.
    //     </p>

    //     <div
    //       className={`mt-10 flex justify-center
    //       transition-all duration-700 delay-200
    //       ${visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
    //     >
    //       <RollingButton text="Apply Now" onClick={() => setFormOpen(true)} />
    //     </div>
    //   </div>

    //   <DistributorFormModal open={formOpen} onClose={() => setFormOpen(false)} />
    // </section>
  );
}