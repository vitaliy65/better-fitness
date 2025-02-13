"use client";

import React from "react";
import { motion } from "framer-motion";
import "@/style/card.css";

export default function Card({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      whileDrag={{ scale: 0.9, rotate: 10 }}
      drag
      dragSnapToOrigin
      dragElastic={0.3}
      dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
      className="card"
      onClick={onClick}
    >
      <h2 className="card-text">{text}</h2>
    </motion.button>
  );
}
