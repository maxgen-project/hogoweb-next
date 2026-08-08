"use client";

export default function RollingButton({
  text = "Get Quote",
  onClick,
  className = "",
  variant = "primary",
  style = {},
}) {
  return (
    <button
      onClick={onClick}
      style={style}
      className={`
        relative overflow-hidden
        px-4 sm:px-6 py-2
        rounded-[6px]
        font-medium
        cursor-pointer
        transition-all duration-300
        ${
          variant === "primary"
            ? "bg-[var(--primary)] text-white active:bg-[var(--active)]"
            : "text-white"
        }
        ${className}
      `}
    >
      <span className="relative block h-auto overflow-hidden">
        <span
          className="
            inline-block
            transition-transform
            duration-300
            hover:translate-y-full
            after:content-[attr(data-text)]
            after:absolute
            after:left-0
            after:-top-full
            after:w-full
          "
          data-text={text}
        >
          {text}
        </span>
      </span>
    </button>
  );
}