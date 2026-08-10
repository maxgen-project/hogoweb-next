"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { themes } from "../config/themeConfig";
import RollingButton from "../components/RollingButton";

import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const logo = "/images/HOGONN9.png";

export default function NavbarView() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      const mobileNav = document.getElementById("mobileNav");
      const hamburger = document.getElementById("hamburgerBtn");

      if (
        mobileMenu &&
        mobileNav &&
        !mobileNav.contains(e.target) &&
        hamburger &&
        !hamburger.contains(e.target)
      ) {
        setMobileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenu]);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "About us", path: "/about" },
    { label: "Gallery", path: "/gallery" },
    { label: "Product", path: "/product" },
    { label: "Warranty", path: "/#warranty" },
    { label: "Media", path: "/blog" },
    { label: "Our Team", path: "#" },
    { label: "Distributor", path: "/distributors" },
    { label: "Contact us", path: "/contact" },
  ];

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 pt-4 sm:pt-4 ${scrolled ? "shadow-md" : ""
          }`}
        style={{
          backgroundColor: scrolled ? themes.sidebar : "transparent",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <Link href="/">
            <img
              src={logo}
              alt="Hogonn India"
              className="h-19 sm:h-21 cursor-pointer"
            />
          </Link>

          <div className="hidden md:flex items-center gap-4 md:gap-6 lg:gap-10 xl:gap-12">
            {navItems.map((item) => {
              const isHash = item.path.includes("#");
              const isActive = !isHash && pathname === item.path;

              return (
                <Link
                  key={item.label}
                  href={item.path}
                  className={`relative font-medium transition-all ${isActive
                    ? "text-[var(--primary)]"
                    : "text-white hover:text-[var(--primary)]"
                    }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            {/* MOBILE NAVBAR HAMBURGER */}
            <div
              id="hamburgerBtn"
              className="md:hidden text-white cursor-pointer text-2xl"
              onClick={() => {
                setMobileMenu(!mobileMenu);
                setOpen(false);
              }}
            >
              ☰
            </div>

            <div
              className="flex flex-col gap-1 cursor-pointer"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              onClick={() => {
                setOpen(true);
                setMobileMenu(false);
              }}
            >
              <span
                className={`block h-[2px] w-8 transition-all duration-300 origin-right ${scrolled ? "bg-white" : "bg-white"
                  } ${hovered ? "scale-x-70" : "scale-x-100"}`}
              ></span>

              <span
                className={`block h-[2px] w-8 transition-all duration-300 origin-left ${scrolled ? "bg-white" : "bg-white"
                  } ${hovered ? "scale-x-70" : "scale-x-100"}`}
              ></span>
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE NAV MENU */}
      <div
        id="mobileNav"
        className={`md:hidden fixed top-[70px] left-0 w-full z-40 ${mobileMenu ? "block" : "hidden"
          }`}
        style={{ backgroundColor: themes.sidebar }}
      >
        {navItems.map((item) => {
          const isHash = item.path.includes("#");
          const isActive = !isHash && pathname === item.path;

          return (
            <Link
              key={item.label}
              href={item.path}
              onClick={() => setMobileMenu(false)}
              className={`block px-6 py-4 border-b border-white/10 transition ${isActive
                ? "text-[var(--primary)] bg-white/5"
                : "text-white"
                }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>

      {/* BACKDROP */}
      <div
        className={`fixed inset-0 bg-black/60 z-40 transition-opacity ${open ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        onClick={() => setOpen(false)}
      ></div>

      {/* ================ SIDEBAR ================= */}
      <div
        id="sidebar"
        className={`fixed top-0 right-0 h-full w-[75vw] sm:w-[380px] md:w-[400px]
    z-50 shadow-2xl transition-transform duration-400 ${open ? "translate-x-0" : "translate-x-full"
          }`}
        style={{ backgroundColor: themes.backgroundBlack }}
      >
        <div className="h-full flex flex-col justify-between p-6 sm:p-8 overflow-y-auto hide-scrollbar">
          {/* TOP: LOGO + CLOSE */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <Link href="/">
                <img
                  src={logo}
                  alt="Hogonn India"
                  className="h-10 sm:h-12 cursor-pointer"
                />
              </Link>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-[var(--primary)] transition-all"
              >
                ✕
              </button>
            </div>

            <hr className="border-gray-700 mb-6" />

            {/* ===== OUR SERVICE SECTION ===== */}
            <h3 className="text-white font-semibold mb-3">Our Products</h3>
            <ul className="space-y-2 text-gray-300 mb-6">
              <li>Paint Protection Film - Gloss/Matte/Color</li>
              <li>Safety Glaze</li>
              <li>Sunroof Protection Film</li>
              <li>Windshield Protection Film</li>
            </ul>

            <hr className="border-gray-700 mb-6" />

            {/* ===== CONTACT US SECTION ===== */}
            <h3 className="text-white font-semibold mb-3">Contact Us</h3>

            <div className="space-y-3 text-gray-300 mb-6">
              <div className="flex gap-3 sm:gap-4">
                <MdEmail
                  className="text-xl mt-1"
                  style={{ color: themes.primary }}
                />
                <p>
                  <span className="font-medium">Email Us</span>
                  <br />
                  <span className="opacity-80">info@hogonnindia.com </span>
                  <br />
                  <span className="opacity-80">sales@hogonnindia.com</span>
                </p>
              </div>
            </div>

            <hr className="border-gray-700 mb-6" />

            {/* ===== ABOUT US SECTION ===== */}
            <h3 className="text-white font-semibold mb-3">Distributor Login</h3>
            <RollingButton
              text="Distributor Login"
              className=""
              onClick={() =>
                window.open(
                  "https://distributor.hogoautofilms.co.in/",
                  "_blank"
                )
              }
            />
          </div>
        </div>
      </div>
    </>
  );
}
