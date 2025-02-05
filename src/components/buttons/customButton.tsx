"use client";

import React, { useEffect, useState } from "react";

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
  const [shadeColor, setShadeColor] = useState(color);

  useEffect(() => {}, [shadeColor]);

  return (
    <button
      className={`text-base rounded-full ${color} ${className} ${shadeColor}`}
      onMouseDown={() => {
        setShadeColor(`bg-opacity-50`);
      }}
      onMouseUp={() => {
        setShadeColor(``);
      }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
