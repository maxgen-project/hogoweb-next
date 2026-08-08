"use client";

import { useState, useEffect } from "react";
import { themes } from "../config/themeConfig";
import RollingButton from "./RollingButton";
import { apiInfo } from "../service/api";
import Swal from "sweetalert2";
import { BASE } from "../service/api";

const DISPLAY_ORDER = [
  "serial_number",
  "product_name",
  "detailer_name",
  "detailer_mobile",
  "car_registration_number",
  "car_brand",
  "car_model",
  "installation_date",
  "warranty_period",
  "warranty_start_date",
  "warranty_end_date",
  "warranty_status",
];

export default function CheckWarrantyModal({ open, onClose }) {
  const [serial, setSerial] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!open) {
      setSerial("");
      setData(null);
      setLoading(false);
    }
  }, [open]);

  if (!open) return null;

  const handleCheck = async () => {
    if (!serial) {
      Swal.fire({
        icon: "warning",
        title: "Enter Serial Number",
        text: "Serial number is required",
        confirmButtonColor: "#d4af37",
      });
      return;
    }

    setLoading(true);
    setData(null);

    try {
      const invRes = await apiInfo.get(`/inventory_serials/?serial_number=${encodeURIComponent(serial)}`);
      const invList = invRes.data?.data || [];

      if (invList.length === 0) {
        Swal.fire({
          icon: "error",
          title: "Invalid Serial ❌",
          text: "Please enter a valid serial number",
          confirmButtonColor: "#d4af37",
        });
        setLoading(false);
        return;
      }

      let targetSerial = invList.find(s => s.serial_number === serial);
      if (!targetSerial) targetSerial = invList[0];

      const warRes = await apiInfo.get(`/warranty/?serial_number=${encodeURIComponent(targetSerial.serial_number)}`);
      const warList = warRes.data?.data || [];

      const warranty = warList.find((w) => 
        w.serial_number === targetSerial.serial_number || w.serial_id === targetSerial.id
      );

      if (!warranty) {
        Swal.fire({
          icon: "error",
          title: "Warranty Not Found",
          text: `No warranty registered for serial ${targetSerial.serial_number}`,
          confirmButtonColor: "#d4af37",
        });
        setLoading(false);
        return;
      }

      setData(warranty);
    } catch (e) {
      console.error("Warranty check error:", e);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to check warranty information",
        confirmButtonColor: "#d4af37",
      });
    } finally {
      setLoading(false);
    }
  };

  const Label = ({ t }) => <div className="text-xs opacity-60">{t}</div>;

  const Val = ({ t }) => <div className="font-semibold">{t || "-"}</div>;

  const getStyle = (v) => {
    if (v === "APPROVED") return { bg: "#d1fae5", color: "#065f46" };
    if (v === "PENDING") return { bg: "#fee2e2", color: "#991b1b" };
    if (v === "ACTIVATED") return { bg: "#dbeafe", color: "#1e40af" };
    return { bg: "#e5e7eb", color: "#111827" };
  };

  const format = (key, value) => {
    if (!value) return "-";
    if (key === "warranty_period") return `${value} months`;
    if (key.includes("date")) {
      return new Date(value).toLocaleDateString("en-GB");
    }
    return value;
  };

  const LABEL_MAP = {
    serial_number: "Serial Number",
    product_name: "Product Name",
    detailer_name: "Detailer Name",
    detailer_mobile: "Detailer Mobile",
    car_registration_number: "Car Registration",
    car_brand: "Car Brand",
    car_model: "Car Model",
    installation_date: "Installation Date",
    warranty_period: "Warranty Period",
    warranty_start_date: "Warranty Start Date",
    warranty_end_date: "Warranty End Date",
    warranty_status: "Warranty Status",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center px-4 py-6 overflow-y-auto">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      <div
        className="relative w-full max-w-2xl rounded-2xl p-6 sm:p-8 overflow-y-auto max-h-[90vh]"
        style={{ backgroundColor: "#f3f3f3" }}
      >
        <button onClick={onClose} className="absolute top-4 right-4">
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4">Check Warranty</h2>

        {/* INPUT */}
        <div className="flex gap-2 mb-6">
          <input
            className="flex-1 p-3 rounded border"
            placeholder="Enter Serial Number"
            value={serial}
            onChange={(e) => setSerial(e.target.value)}
          />
          <RollingButton
            text={loading ? "..." : "Check"}
            onClick={handleCheck}
            style={{ background: themes.primary }}
          />
        </div>

        {data && (
          <div className="space-y-6 text-sm">
            {/* STATUS TOP */}
            <div className="flex justify-center gap-3">
              <div
                className="px-4 py-2 rounded-full font-semibold text-sm"
                style={getStyle(data.warranty_status)}
              >
                Warranty: {data.warranty_status || "-"}
              </div>
            </div>

            {/* ORDERED GRID */}
            <div className="grid grid-cols-2 gap-3">
              {DISPLAY_ORDER.map((key) => (
                <div key={key}>
                  <Label t={LABEL_MAP[key]} />
                  <Val t={format(key, data[key])} />
                </div>
              ))}
            </div>

            {/* IMAGES */}
            <div>
              <h3 className="font-semibold mb-2">Images</h3>

              {data.invoice_image && (
                <div>
                  <Label t="Invoice" />
                  <img
                    src={`${BASE}${data.invoice_image}`}
                    className="h-24 rounded mt-1"
                  />
                </div>
              )}

              {data.car_images?.length > 0 && (
                <div className="mt-3">
                  <Label t="Car Images" />
                  <div className="flex gap-2 flex-wrap mt-1">
                    {data.car_images.map((img, i) => (
                      <img
                        key={i}
                        src={`${BASE}${img}`}
                        className="h-20 rounded"
                      />
                    ))}
                  </div>
                </div>
              )}

              {data.installation_images?.length > 0 && (
                <div className="mt-3">
                  <Label t="Installation Images" />
                  <div className="flex gap-2 flex-wrap mt-1">
                    {data.installation_images.map((img, i) => (
                      <img
                        key={i}
                        src={`${BASE}${img}`}
                        className="h-20 rounded"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
