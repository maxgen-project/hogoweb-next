"use client";

import { useEffect, useState } from "react";
import { themes } from "../config/themeConfig";
import RollingButton from "./RollingButton";
import { apiInfo } from "../service/api";
import Swal from "sweetalert2";

const isEmpty = (v) => !v || v === "";

export default function QuoteFormModal({ open, onClose }) {
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    contact: "",
    Address: "",
    brand_id: "",
    model_id: "",
    service: "",
  });

  // ESC close
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // RESET ON CLOSE
  useEffect(() => {
    if (!open) {
      setForm({
        full_name: "",
        email: "",
        contact: "",
        Address: "",
        brand_id: "",
        model_id: "",
        service: "",
      });
      setModels([]);
      setSubmitted(false);
      setLoading(false);
    }
  }, [open]);

  // Fetch brands
  useEffect(() => {
    if (!open) return;
    apiInfo.get("/carbrands/").then((res) => {
      setBrands(res.data?.data || []);
    });
  }, [open]);

  // Fetch models
  useEffect(() => {
    if (!form.brand_id) return;

    apiInfo.get("/carmodels/").then((res) => {
      const filtered = (res.data?.data || []).filter(
        (m) => m.brand_id === Number(form.brand_id),
      );
      setModels(filtered);
    });
  }, [form.brand_id]);

  const onChange = (k, v) => {
    setForm((p) => ({ ...p, [k]: v }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};

    if (isEmpty(form.full_name)) newErrors.full_name = "Required";
    if (isEmpty(form.contact)) newErrors.contact = "Required";
    if (isEmpty(form.brand_id)) newErrors.brand_id = "Required";
    if (isEmpty(form.model_id)) newErrors.model_id = "Required";
    if (isEmpty(form.service)) newErrors.service = "Required";
    if (isEmpty(form.email)) newErrors.email = "Required";
    if (isEmpty(form.Address)) newErrors.Address = "Required";

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

    try {
      await apiInfo.post("/quotes/", form);

      Swal.fire({
        icon: "success",
        title: "Success 🎉",
        text: "Quote submitted successfully",
      });

      onClose();
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to submit quote",
      });
    } finally {
      setLoading(false);
    }
  };

  const err = (f) => (submitted && isEmpty(form[f]) ? "border-red-500" : "");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* MODAL */}
      <div
        className="
          relative w-full max-w-lg
          h-[93vh]
          bg-[#f3f3f3]
          rounded-2xl shadow-2xl
          p-5 sm:p-6
          overflow-y-auto hide-scrollbar
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-600 text-xl"
        >
          ✕
        </button>

        {/* HEADER */}
        <div className="flex items-center gap-3 mb-5">
          <div
            className="w-8 h-8 rounded-md flex items-center justify-center"
            style={{ backgroundColor: themes.primary }}
          >
            🚗
          </div>
          <h2 className="text-lg sm:text-xl font-semibold">Get Quote</h2>
        </div>

        <p className="text-sm text-gray-600 mb-5">
          Please fill the form and our team will contact you.
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={form.full_name}
            onChange={(e) => onChange("full_name", e.target.value)}
            className={`w-full px-4 py-3 rounded-md border ${err("full_name")}`}
          />

          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => onChange("email", e.target.value)}
            className={`w-full px-4 py-3 rounded-md border ${err("email")}`}
          />

          <input
            type="tel"
            placeholder="Contact Number"
            value={form.contact}
            onChange={(e) => onChange("contact", e.target.value)}
            className={`w-full px-4 py-3 rounded-md border ${err("contact")}`}
          />

          <textarea
            placeholder="Address"
            rows="3"
            value={form.Address}
            onChange={(e) => onChange("Address", e.target.value)}
            className={`w-full px-4 py-3 rounded-md border ${err("Address")}`}
          />
          <select
            value={form.brand_id}
            onChange={(e) => onChange("brand_id", e.target.value)}
            className={`w-full px-4 py-3 rounded-md border ${err("brand_id")}`}
          >
            <option value="">Select Brand</option>
            {brands.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>

          <select
            value={form.model_id}
            onChange={(e) => onChange("model_id", e.target.value)}
            className={`w-full px-4 py-3 rounded-md border ${err("model_id")}`}
          >
            <option value="">Select Model</option>
            {models.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>

          <select
            value={form.service}
            onChange={(e) => onChange("service", e.target.value)}
            className={`w-full px-4 py-3 rounded-md border ${err("service")}`}
          >
            <option value="">Select Service</option>
            <option>SUNROOF PROTECTION FILM</option>
            <option>PAINT PROTECTION FILM</option>
            <option>WINDOW FILM</option>
            <option>WINDSCREEN PROTECTION FILM</option>
          </select>

          <RollingButton
            text={loading ? "Submitting..." : "SUBMIT"}
            className="w-full justify-center mt-2"
            style={{ background: themes.primary }}
          />
        </form>
      </div>
    </div>
  );
}
