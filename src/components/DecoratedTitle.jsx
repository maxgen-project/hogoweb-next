import { themes } from "../config/themeConfig";

export default function DecoratedTitle({ text, color = themes.textWhite }) {
  return (
    <div className="inline-block">
      <div className="relative inline-block">
 
        {/* Top short line (right shifted) */}
        <span
          className="
            absolute
            -top-3
            right-0
            w-[35%] sm:w-[40%] md:w-[45%]
            h-[2px]
            bg-[var(--primary)]
          "
        />
 
        {/* Text */}
        <h2
          className="
            font-semibold 
            tracking-[0.15em] sm:tracking-[0.25em] md:tracking-[0.35em]
          "
          style={{ color }}   // ✅ NOW THIS WILL WORK
        >
          {text}
        </h2>
 
        {/* Bottom short line (left shifted) */}
        <span
          className="
            absolute
            -bottom-3
            left-0
            w-[35%] sm:w-[40%] md:w-[45%]
            h-[2px]
            bg-[var(--primary)]
          "
        />
      </div>
    </div>
  );
}
