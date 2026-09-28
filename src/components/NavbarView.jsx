"use client";

import { useEffect, useState, useRef } from "react";
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

import { getAllCategories } from "../service/productCategoryService";

const logo = "/images/HOGONN9.png";

const DEFAULT_CATEGORIES = [
  {
    name: "Paint Protection Film",
    url: "/products/paint-protection-film/",
    label: "6 Films",
  },
  {
    name: "Safety Glaze Window Film",
    url: "/products/safety-glaze-window-film/",
    label: "2 Variants",
  },
  {
    name: "Windshield PPF",
    url: "/products/windshield-ppf/",
    label: "1 Product",
  },
  {
    name: "Sunroof PPF",
    url: "/products/sunroof-ppf/",
    label: "1 Product",
  },
];

export default function NavbarView() {
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const pathname = usePathname();

  useEffect(() => {
    let isMounted = true;
    getAllCategories()
      .then((cats) => {
        if (isMounted && Array.isArray(cats) && cats.length > 0) {
          const mapped = cats.map((cat) => ({
            name: cat.name,
            url: cat.url || `/products/${cat.slug}/`,
            label: cat.productCountLabel || `${cat.productCount || 1} Product`,
          }));
          setCategories(mapped);
        }
      })
      .catch((err) => console.error("Navbar category fetch error:", err));

    return () => {
      isMounted = false;
    };
  }, []);

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

      // Close desktop products dropdown on outside click
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProductsDropdownOpen(false);
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
    { label: "Product", path: "/product", hasDropdown: true },
    { label: "Warranty", path: "/#warranty" },
    { label: "Media", path: "/blog" },
    { label: "Our Team", path: "#" },
    { label: "Distributor", path: "/distributors" },
    { label: "Contact us", path: "/contact" },
  ];

  const isProductsActive = pathname.startsWith("/products") || pathname === "/product";

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

          <div className="hidden md:flex items-center gap-4 md:gap-6 lg:gap-8 xl:gap-10">
            {navItems.map((item) => {
              if (item.hasDropdown) {
                return (
                  <div
                    key={item.label}
                    ref={dropdownRef}
                    className="relative py-2"
                    onMouseEnter={() => setProductsDropdownOpen(true)}
                    onMouseLeave={() => setProductsDropdownOpen(false)}
                  >
                    <Link
                      href={item.path}
                      className={`relative font-medium transition-all flex items-center gap-1 ${isProductsActive
                        ? "text-[var(--primary)]"
                        : "text-white hover:text-[var(--primary)]"
                        }`}
                      aria-haspopup="true"
                      aria-expanded={productsDropdownOpen}
                    >
                      {item.label}
                      <span
                        className={`text-xs transition-transform duration-200 ${productsDropdownOpen ? "rotate-180" : ""
                          }`}
                        aria-hidden="true"
                      >
                        ▾
                      </span>
                    </Link>

                    {/* Dropdown panel */}
                    <div
                      className={`
                        absolute top-full left-1/2 -translate-x-1/2 pt-2
                        w-64 z-50
                        transition-all duration-200 origin-top
                        ${productsDropdownOpen
                          ? "opacity-100 scale-y-100 pointer-events-auto"
                          : "opacity-0 scale-y-95 pointer-events-none"
                        }
                      `}
                      role="menu"
                    >
                      <div
                        className="rounded-xl shadow-xl border border-white/10 overflow-hidden"
                        style={{ backgroundColor: themes.backgroundBlack }}
                      >
                        {categories.map((cat) => (
                          <Link
                            key={cat.url}
                            href={cat.url}
                            onClick={() => setProductsDropdownOpen(false)}
                            className="flex items-center justify-between px-4 py-3 border-b border-white/5 transition hover:bg-white/5 group"
                            role="menuitem"
                          >
                            <span
                              className="text-sm font-medium transition group-hover:text-[var(--primary)]"
                              style={{ color: "rgba(255,255,255,0.9)" }}
                            >
                              {cat.name}
                            </span>

                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

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
        className={`md:hidden fixed top-[70px] left-0 w-full z-40 max-h-[calc(100vh-70px)] overflow-y-auto ${mobileMenu ? "block" : "hidden"
          }`}
        style={{ backgroundColor: themes.sidebar }}
      >
        {navItems.map((item) => {
          if (item.hasDropdown) {
            return (
              <div key={item.label} className="border-b border-white/10">
                <div className="flex items-center justify-between px-6 py-4 transition text-white hover:text-[var(--primary)]">
                  <Link
                    href={item.path}
                    onClick={() => setMobileMenu(false)}
                    className={`font-medium ${isProductsActive ? "text-[var(--primary)]" : ""}`}
                  >
                    {item.label}
                  </Link>
                  <button
                    type="button"
                    className="text-xs p-2 text-gray-300 hover:text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      setMobileProductsOpen(!mobileProductsOpen);
                    }}
                  >
                    {mobileProductsOpen ? "▲" : "▼"}
                  </button>
                </div>

                {mobileProductsOpen && (
                  <div className="bg-black/30 pb-2">
                    {categories.map((cat) => (
                      <Link
                        key={cat.url}
                        href={cat.url}
                        onClick={() => setMobileMenu(false)}
                        className="block px-10 py-2.5 text-sm text-gray-300 hover:text-white transition"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          }

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
            <ul className="space-y-2 text-gray-300 mb-6 text-sm">
              {categories.map((cat) => (
                <li key={cat.url}>
                  <Link
                    href={cat.url}
                    onClick={() => setOpen(false)}
                    className="hover:text-[var(--primary)] transition block py-1"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
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
                  "https://distributor.hogonnindia.com/",
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
