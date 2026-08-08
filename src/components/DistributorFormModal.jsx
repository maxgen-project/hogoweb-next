"use client";

import { useState } from "react";
import { themes } from "../config/themeConfig";

const initialForm = {
  name: "",
  phone: "",
  email: "",
  businessName: "",
  city: "",
  state: "",
  message: "",
};

export default function DistributorFormModal({ open, onClose }) {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  if (!open) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch(
        "https://your-django-backend.com/api/distributor-applications/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setForm(initialForm);
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.75)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-lg border border-white/10 p-8"
        style={{ backgroundColor: "#151515" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
        >
          ✕
        </button>

        <h3
          className="text-2xl font-semibold mb-6"
          style={{ color: themes.textWhite }}
        >
          Distributor Application
        </h3>

        {status === "success" ? (
          <p className="text-white/80">
            Thank you! Your application has been submitted. Our team will
            contact you shortly.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              name="name"
              required
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="bg-transparent border border-white/20 rounded px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-red-500"
            />
            <input
              name="phone"
              required
              type="tel"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              className="bg-transparent border border-white/20 rounded px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-red-500"
            />
            <input
              name="email"
              required
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="bg-transparent border border-white/20 rounded px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-red-500"
            />
            <input
              name="businessName"
              placeholder="Business / Company Name"
              value={form.businessName}
              onChange={handleChange}
              className="bg-transparent border border-white/20 rounded px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-red-500"
            />
            <div className="flex gap-4">
              <input
                name="city"
                placeholder="City"
                value={form.city}
                onChange={handleChange}
                className="w-1/2 bg-transparent border border-white/20 rounded px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-red-500"
              />
              <input
                name="state"
                placeholder="State"
                value={form.state}
                onChange={handleChange}
                className="w-1/2 bg-transparent border border-white/20 rounded px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-red-500"
              />
            </div>
            <textarea
              name="message"
              placeholder="Tell us about your business (optional)"
              value={form.message}
              onChange={handleChange}
              rows={3}
              className="bg-transparent border border-white/20 rounded px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-red-500"
            />

            {status === "error" && (
              <p className="text-red-500 text-sm">
                Something went wrong. Please try again.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="mt-2 rounded bg-red-600 hover:bg-red-700 transition-colors py-3 text-sm font-semibold uppercase tracking-wider text-white disabled:opacity-50"
            >
              {status === "submitting" ? "Submitting..." : "Submit Application"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}