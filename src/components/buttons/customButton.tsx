"use client";

import React from "react";

export const CustomButton = ({
  children,
  onClick,
  color,
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  color: string;
  className?: string;
}) => {
  return (
    <button
      className={`text-base rounded-full active:bg-opacity-50 ${color} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
