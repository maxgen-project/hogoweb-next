import { themes } from "../config/themeConfig";

export default function Pagination({ current, total, onPageChange }) {
  if (total <= 1) return null;

  const pages = [];
  for (let i = 1; i <= total; i++) {
    // Show first, last, and around current
    if (i === 1 || i === total || (i >= current - 2 && i <= current + 2)) {
      pages.push(i);
    } else if (i === current - 3 || i === current + 3) {
      pages.push("...");
    }
  }

  const uniquePages = [...new Set(pages)];

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <button
        onClick={() => onPageChange(current - 1)}
        disabled={current === 1}
        className="px-3 py-1 rounded disabled:opacity-50"
        style={{ backgroundColor: themes.backgroundBlack, color: "white" }}
      >
        Prev
      </button>

      {uniquePages.map((p, i) => (
        <button
          key={i}
          onClick={() => typeof p === "number" && onPageChange(p)}
          className={`px-3 py-1 rounded ${typeof p !== "number" ? "cursor-default" : ""}`}
          style={{
            backgroundColor: p === current ? themes.primary : themes.backgroundBlack,
            color: "white",
          }}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onPageChange(current + 1)}
        disabled={current === total}
        className="px-3 py-1 rounded disabled:opacity-50"
        style={{ backgroundColor: themes.backgroundBlack, color: "white" }}
      >
        Next
      </button>
    </div>
  );
}
