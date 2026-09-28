import Link from "next/link";
import { themes } from "../src/config/themeConfig";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 py-20 text-center text-white"
      style={{ backgroundColor: themes.backgroundBlack }}
    >
      <div
        className="p-10 rounded-2xl border max-w-md mx-auto"
        style={{ backgroundColor: "#07071a", borderColor: "rgba(255,255,255,0.1)" }}
      >
        <h1
          className="text-6xl font-bold mb-4"
          style={{ color: themes.primary, fontFamily: themes.fontPrimary }}
        >
          404
        </h1>
        <h2
          className="text-2xl font-bold mb-3"
          style={{ fontFamily: themes.fontPrimary }}
        >
          Page Not Found
        </h2>
        <p className="text-gray-400 text-sm mb-6">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 rounded-lg text-sm font-semibold text-white transition hover:opacity-90"
          style={{ backgroundColor: themes.primary }}
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
