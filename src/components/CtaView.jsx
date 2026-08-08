"use client";

import { themes } from "../config/themeConfig";
import RollingButton from "./RollingButton";
import WarrantyFormModal from "./WarrantyFormModal";
import { useState } from "react";
import CheckWarrantyModal from "./CheckWarrantyModal";

export default function CtaView() {
  const [openWarranty, setOpenWarranty] = useState(false);
  const [checkOpen, setCheckOpen] = useState(false);

  return (
    <section className="py-16" style={{ backgroundColor: themes.primary }}>
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <h2
          className="text-2xl md:text-3xl font-semibold text-center md:text-left"
          style={{ color: themes.textWhite }}
        >
          Protection You Can Trust, Warranty You Can Count On.
        </h2>

        {/* Buttons */}
        <div className="flex gap-3 flex-wrap justify-center">
          <RollingButton
            text="Add Warranty"
            className="border border-white bg-transparent"
            onClick={() => setOpenWarranty(true)}
          />

          <RollingButton
            text="Check Warranty"
            className="border border-white bg-transparent"
            onClick={() => setCheckOpen(true)}
          />
        </div>
      </div>

      <WarrantyFormModal
        open={openWarranty}
        onClose={() => setOpenWarranty(false)}
      />
      <CheckWarrantyModal
        open={checkOpen}
        onClose={() => setCheckOpen(false)}
      />
    </section>
  );
}