"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Card({ img, text }: { img?: string; text: string }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      whileDrag={{ scale: 0.9, rotate: 10 }}
      drag
      dragSnapToOrigin
      dragElastic={0.3}
      dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
      className="relative flex flex-col bg-stone-900 w-64 h-64 rounded-lg overflow-hidden"
    >
      {img ? (
        <Image
          src={img}
          alt={""}
          width={256}
          height={226}
          className="w-full h-full object-cover"
        />
      ) : null}
      <h2 className="flex justify-start px-4 bg-blue-500 items-center text-2xl h-16">
        {text}
      </h2>
    </motion.button>
  );
}
