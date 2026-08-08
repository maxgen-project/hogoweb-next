import { themes } from "../config/themeConfig";

const bgCar = "/images/background-car.webp";

export default function ParallaxCarSection() {
  return (
    <section
      className="relative w-full min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${bgCar})`,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: themes.backgroundBlack,
      }}
    >
      {/* TOP BLACK FADE */}
      <div
        className="absolute top-0 left-0 w-full h-[25%]"
        style={{
          background: `linear-gradient(
            to bottom,
            ${themes.backgroundBlack} 0%,
            rgba(15, 15, 15, 0.6) 60%,
            rgba(15, 15, 15, 0) 100%
          )`,
        }}
      ></div>

      {/* CENTER TRANSPARENT OVERLAY */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: themes.backgroundBlack,
          opacity: 0.25,
        }}
      ></div>

      {/* BOTTOM BLACK FADE */}
      <div
        className="absolute bottom-0 left-0 w-full h-[20%] sm:h-[22%] md:h-[25%]"
        style={{
          background: `linear-gradient(
            to top,
            ${themes.backgroundBlack} 0%,
            rgba(15, 15, 15, 0.6) 60%,
            rgba(15, 15, 15, 0) 100%
          )`,
        }}
      ></div>
    </section>
  );
}
