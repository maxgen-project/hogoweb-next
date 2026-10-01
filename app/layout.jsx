"use client";

import "./globals.css";
import "./custom.css";

import NavbarView from "../src/components/NavbarView";
import FooterView from "../src/components/FooterView";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import CookieConsent from "../src/components/CookieConsent";

// ScrollToTop: scrolls window to top on route change
function ScrollToTop() {
  const pathname = usePathname();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
}

// ScrollToHash: handles /#anchor navigation (e.g. /#warranty)
function ScrollToHash() {
  const pathname = usePathname();
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        setTimeout(() => {
          // navbar height offset
          const yOffset = -100;
          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }, 100);
      }
    }
  }, [pathname]);
  return null;
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Oxanium:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      </head>
      <body className="min-h-screen bg-[var(--bg-secondary)] hide-scrollbar">
        <ScrollToTop />
        <ScrollToHash />
        <NavbarView />
        <main>{children}</main>
        <FooterView />
        <CookieConsent />
      </body>
    </html>
  );
}
