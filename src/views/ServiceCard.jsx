"use client";

import { motion } from "framer-motion";

export default function ServiceCard({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50, y: 30 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
        delay: index * 0.15,
      }}
      className="
        relative group 
        h-[220px] sm:h-[260px] md:h-[300px]
        rounded-2xl overflow-hidden
        cursor-pointer
      "
    >
      {/* Image */}
      <img
        src={item.img}
        alt={item.title}
        className="
          w-full h-full object-cover
          transition-all duration-700
          group-hover:scale-110
          group-hover:blur-[5px]
        "
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Number */}
      <span className="absolute top-5 left-5 text-xl font-bold text-white z-10">
        {item.id}
      </span>

      {/* Center Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10">
        <h3 className="text-xl md:text-2xl font-semibold text-white mb-4">
          {item.title}
        </h3>
      </div>
    </motion.div>
  );
}