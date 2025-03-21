"use client";

import React, { ReactNode } from "react";
import "../../style/gridLinkList.css";

export const GridLinkList = ({
  children,
  columns = "sm:grid-cols-2",
  className,
}: {
  children: ReactNode;
  columns?: string;
  className?: string;
}) => {
  return (
    <ul className={`grid-link-list-class grid-cols-1 ${columns} ${className}`}>
      {children}
    </ul>
  );
};
