import { themes } from "../config/themeConfig";

export default function SectionHeading({
  children,
  secondLine = "",
  className = "",
  style = {},        // ✅ ADD THIS
}) {
  return (
    <h2
      className={`
        uppercase text-center mx-auto
        text-[clamp(24px,3.6vw,56px)]
        leading-[1.08]
        text-balance
        mb-3
        ${className}
      `}
      style={{
        fontFamily: themes.fontPrimary,
        ...style,       // ✅ SPREAD USER STYLE (VERY IMPORTANT)
      }}
    >
      {children}
      {secondLine && <span className="block">{secondLine}</span>}
    </h2>
  );
}
