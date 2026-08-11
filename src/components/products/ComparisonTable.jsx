"use client";

import { themes } from "../../config/themeConfig";

/**
 * ComparisonTable — Renders a responsive HTML comparison table.
 * IMPORTANT: This renders a real semantic <table> — never an image.
 *
 * Props:
 *   comparison: { columns: string[], rows: Object[] }
 *   categorySlug: string (used to link product names)
 *
 * The table uses horizontal scroll on mobile so the page never overflows.
 */
export default function ComparisonTable({ comparison, categorySlug }) {
  if (!comparison || !comparison.rows || !comparison.columns) return null;

  const { columns, rows } = comparison;

  // Map column label → row key
  const columnKeyMap = {
    Product: "product",
    Warranty: "warranty",
    Thickness: "thickness",
    TPU: "tpu",
    Adhesive: "adhesive",
    "Anti-Yellow": "antiYellow",
    Elongation: "elongation",
    "Tear Strength": "tearStrength",
  };

  return (
    <div
      className="w-full overflow-x-auto rounded-xl border border-white/10"
      role="region"
      aria-label="Product comparison table"
    >
      <table
        className="min-w-full text-sm"
        style={{ borderCollapse: "collapse" }}
      >
        <thead>
          <tr style={{ backgroundColor: themes.primary }}>
            {columns.map((col) => (
              <th
                key={col}
                scope="col"
                className="px-4 py-3 text-left font-semibold whitespace-nowrap"
                style={{
                  color: themes.textWhite,
                  fontFamily: themes.fontPrimary,
                }}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={row.slug || rowIndex}
              className="border-b border-white/10 transition-colors duration-150 hover:bg-white/5"
              style={{
                backgroundColor:
                  rowIndex % 2 === 0 ? "#0a0a2a" : "#0d0d30",
              }}
            >
              {columns.map((col) => {
                const key = columnKeyMap[col];
                const value = row[key] ?? "-";
                const isProduct = col === "Product";
                const isNA =
                  col === "Anti-Yellow" && value === "Not Applicable";

                return (
                  <td
                    key={col}
                    className="px-4 py-3 whitespace-nowrap"
                    style={{
                      color: isNA
                        ? "#666680"
                        : isProduct
                        ? themes.textWhite
                        : "#c0c0d8",
                      fontWeight: isProduct ? 600 : 400,
                    }}
                  >
                    {isNA ? (
                      <span
                        className="inline-block text-xs px-2 py-0.5 rounded"
                        style={{
                          backgroundColor: "#ffffff11",
                          color: "#888899",
                        }}
                      >
                        Not Applicable
                      </span>
                    ) : (
                      value
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
