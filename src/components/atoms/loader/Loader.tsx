import React from "react";
import { motion } from "framer-motion";

export function Loader() {
  return (
    <motion.div
      className="inline-block h-4 w-4 rounded-full border-2 border-black/10 border-t-accent"
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
      aria-label="loading"
    />
  );
}
