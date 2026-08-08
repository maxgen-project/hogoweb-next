"use client";

import { useEffect, useState } from "react";
import { themes } from "../config/themeConfig";
import RollingButton from "./RollingButton";
import { apiInfo, fetchAll } from "../service/api";
import Swal from "sweetalert2";
const isEmpty = (v) => !v || v === "";

export default function WarrantyFormModal({ open, onClose }) {
  const [serials, setSerials] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serialInput, setSerialInput] = useState("");

  const [form, setForm] = useState({
    serial_id: "",
    product_id: "",
    warranty_period: "",
    detailer_name: "",
    detailer_mobile: "",
    car_registration_number: "",
    car_brand: "",
    car_model: "",
    installation_date: "",
    car_images: [],
    installation_images: [],
    invoice_image: null,
    color: "",
    license_plate_no: "",
    address: "",
    owner_name: "",
    owner_mobile: "",
    owner_email: "",
    email: "",
  });

  /* LOAD DATA */
  useEffect(() => {
    if (!open) return;

    fetchAll("/inventory_serials/").then((data) => {
      setSerials(data);
    });

    apiInfo.get("/products/sequence/?status=true/").then((r) => {
      setProducts(r.data?.data || []);
    });
  }, [open]);

  /* SERIAL → PRODUCT */
  const handleSerial = async (val) => {
    setSerialInput(val);

    let s = serials.find(
      (x) => String(x.serial_number).trim() === String(val).trim(),
    );

    if (!s && val.length > 5) {
      try {
        const res = await apiInfo.get(
          `/inventory_serials/?serial_number=${encodeURIComponent(val)}`,
        );
        const found = (res.data?.data || []).find(
          (x) => String(x.serial_number).trim() === String(val).trim(),
        );
        if (found) s = found;
      } catch (e) {
        console.error("Error fetching serial dynamically:", e);
      }
    }

    if (s) {
      setForm((p) => ({
        ...p,
        serial_id: s.id,
        product_id: String(s?.product || s?.product_id || ""),
      }));
    } else {
      setForm((p) => ({
        ...p,
        serial_id: "",
        product_id: "",
        warranty_period: "",
      }));
    }
  };

  useEffect(() => {
    if (!open) {
      setForm({
        serial_id: "",
        product_id: "",
        warranty_period: "",
        detailer_name: "",
        detailer_mobile: "",
        car_registration_number: "",
        car_brand: "",
        car_model: "",
        installation_date: "",
        car_images: [],
        installation_images: [],
        invoice_image: null,
        color: "",
        license_plate_no: "",
        address: "",
        owner_name: "",
        owner_mobile: "",
        owner_email: "",
        email: "",
      });

      setSubmitted(false);
      setLoading(false);
      setSerialInput("");
    }
  }, [open]);

  /* PRODUCT → WARRANTY */
  useEffect(() => {
    const p = products.find((x) => String(x.id) === String(form.product_id));
    if (p?.warranty) {
      setForm((f) => ({ ...f, warranty_period: p.warranty }));
    }
  }, [form.product_id, products]);

  const onChange = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  /* SAVE */
  const handleSave = async () => {
    let newErrors = {};

    if (isEmpty(form.serial_id)) newErrors.serial_id = "Select serial";
    if (isEmpty(form.product_id)) newErrors.product_id = "Product missing";
    if (isEmpty(form.detailer_name)) newErrors.detailer_name = "Required";
    if (isEmpty(form.detailer_mobile)) newErrors.detailer_mobile = "Required";
    if (isEmpty(form.car_registration_number))
      newErrors.car_registration_number = "Required";
    if (isEmpty(form.car_brand)) newErrors.car_brand = "Required";
    if (isEmpty(form.car_model)) newErrors.car_model = "Required";
    if (isEmpty(form.installation_date))
      newErrors.installation_date = "Required";

    setSubmitted(true);

    if (Object.keys(newErrors).length > 0) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please fill all required fields",
      });
      return;
    }

    setLoading(true);

    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => {
      if (Array.isArray(v)) v.forEach((f) => fd.append(k, f));
      else if (v) fd.append(k, v);
    });

    try {
      await apiInfo.post("/warranty/", fd);

      Swal.fire({
        icon: "success",
        title: "Success 🎉",
        text: "Warranty Added Successfully",
      });

      onClose();
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to save warranty",
      });
    } finally {
      setLoading(false);
    }
  };

  const err = (f) => (submitted && isEmpty(form[f]) ? "border-red-500" : "");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center px-4 py-6 overflow-y-auto">
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      {/* modal */}
      <div
        className="relative w-full max-w-2xl rounded-2xl p-6 sm:p-8 animate-scaleIn max-h-[90vh] overflow-y-auto"
        style={{ backgroundColor: "#f3f3f3" }}
      >
        <button onClick={onClose} className="absolute top-4 right-4">
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-6">Add Warranty</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* SERIAL */}
          <input
            className={`p-3 rounded border ${err("serial_id")}`}
            value={serialInput}
            onChange={(e) => handleSerial(e.target.value)}
            placeholder="Serial Number"
          />

          {/* PRODUCT NAME */}
          <input
            className="p-3 rounded border bg-gray-100"
            value={
              products.find((p) => String(p.id) === String(form.product_id))
                ?.product_name || ""
            }
            placeholder="Product"
            disabled
          />

          {/* WARRANTY PERIOD */}
          <input
            className="p-3 rounded border bg-gray-100"
            value={form.warranty_period}
            placeholder="Warranty Period"
            disabled
          />

          <input
            className={`p-3 rounded border ${err("detailer_name")}`}
            placeholder="Detailer Name"
            onChange={(e) => onChange("detailer_name", e.target.value)}
          />

          <input
            className={`p-3 rounded border ${err("detailer_mobile")}`}
            placeholder="Detailer Mobile"
            onChange={(e) => onChange("detailer_mobile", e.target.value)}
          />

          <input
            className="p-3 rounded border"
            placeholder="Detailer Email"
            onChange={(e) => onChange("email", e.target.value)}
          />
          <textarea
            className="p-3 rounded border sm:col-span-2"
            placeholder="Detailer Address"
            onChange={(e) => onChange("address", e.target.value)}
          />
          <input
            className={`p-3 rounded border ${err("car_registration_number")}`}
            placeholder="Car Reg"
            onChange={(e) =>
              onChange("car_registration_number", e.target.value)
            }
          />

          <input
            className={`p-3 rounded border ${err("car_brand")}`}
            placeholder="Car Brand"
            onChange={(e) => onChange("car_brand", e.target.value)}
          />

          <input
            className={`p-3 rounded border ${err("car_model")}`}
            placeholder="Car Model"
            onChange={(e) => onChange("car_model", e.target.value)}
          />

          <input
            type="date"
            className={`p-3 rounded border ${err("installation_date")}`}
            onChange={(e) => onChange("installation_date", e.target.value)}
          />

          <input
            className={`p-3 rounded border ${err("color")}`}
            placeholder="Car Color"
            onChange={(e) => onChange("color", e.target.value)}
          />

          <input
            className="p-3 rounded border"
            placeholder="Car Owner Name"
            onChange={(e) => onChange("owner_name", e.target.value)}
          />

          <input
            className="p-3 rounded border"
            placeholder="Car Owner Mobile"
            onChange={(e) => onChange("owner_mobile", e.target.value)}
          />

          <input
            className="p-3 rounded border"
            placeholder="Car Owner Email"
            onChange={(e) => onChange("owner_email", e.target.value)}
          />

          {/* FILES */}
          <div>
            <label className="text-xs mb-1 text-black">Car Images</label>
            <input
              type="file"
              multiple
              className="w-full text-sm p-3 rounded border"
              onChange={(e) =>
                onChange("car_images", Array.from(e.target.files))
              }
            />
            <p className="text-xs opacity-60 mt-1">
              Upload full car photos (front, back, sides)
            </p>
          </div>

          <div>
            <label className="text-xs text-black block mb-1">
              Installation Images
            </label>
            <input
              type="file"
              multiple
              className="w-full text-sm p-3 rounded border"
              onChange={(e) =>
                onChange("installation_images", Array.from(e.target.files))
              }
            />
            <p className="text-xs opacity-60 mt-1">
              Film installation process photos
            </p>
          </div>

          <div>
            <label className="text-xs text-black block mb-1">
              Invoice Image
            </label>
            <input
              type="file"
              className="w-full text-sm p-3 rounded border"
              onChange={(e) => onChange("invoice_image", e.target.files[0])}
            />
            <p className="text-xs opacity-60 mt-1">
              Upload purchase invoice or bill
            </p>
          </div>
        </div>

        <div className="mt-6">
          <RollingButton
            text={loading ? "Saving..." : "Submit Warranty"}
            className="w-full"
            style={{ background: themes.primary }}
            onClick={handleSave}
          />
        </div>
      </div>
    </div>
  );
}
