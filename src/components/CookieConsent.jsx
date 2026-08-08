"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");

    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] border-t border-white/10 bg-black px-5 py-5 text-white shadow-2xl">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-5 md:flex-row md:items-center md:justify-between">

        <div className="max-w-3xl">
          <h3 className="mb-2 text-lg font-semibold">
            We use cookies
          </h3>

          <p className="text-sm leading-6 text-white/70">
            We use cookies to improve your browsing experience,
            understand website traffic and provide better services.
            You can accept or decline non-essential cookies.
          </p>

          <Link
            href="/cookies"
            className="mt-2 inline-block text-sm text-red-500 underline"
          >
            Cookie Policy
          </Link>
        </div>

        <div className="flex shrink-0 gap-3">
          <button
            onClick={handleDecline}
            className="rounded-md border border-white/30 px-6 py-3 text-sm transition hover:border-white"
          >
            Decline
          </button>

          <button
            onClick={handleAccept}
            className="rounded-md bg-red-600 px-6 py-3 text-sm font-medium transition hover:bg-red-700"
          >
            Accept
          </button>
        </div>

      </div>
    </div>
  );
}