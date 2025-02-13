"use client";

import React from "react";

export default function Loading() {
  return (
    <div className="absolute flex justify-center items-center w-screen h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
}
