import { motion } from "framer-motion";

export const Reveal = ({ children, delay = 0, className = "", y = 40 }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

export const MaskLine = ({ children, delay = 0, className = "" }) => (
  <span className={`block overflow-hidden ${className}`}>
    <motion.span
      className="block will-change-transform"
      initial={{ y: "115%" }}
      animate={{ y: 0 }}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.span>
  </span>
);

export const ChapterTag = ({ number, label }) => (
  <div className="flex items-center gap-4 mb-10">
    <span className="font-outfit font-black text-sm tracking-[0.3em] text-brand-blue">
      {number}
    </span>
    <span className="h-px flex-1 bg-zinc-200" />
    <span className="font-manrope text-xs font-semibold tracking-[0.3em] uppercase text-zinc-500">
      {label}
    </span>
  </div>
);
