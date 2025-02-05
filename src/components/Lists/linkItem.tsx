"use client";

import React, { ReactNode } from "react";
import Link from "next/link";
import "../../style/linkItem.css";

export const LinkItem = ({
  children,
  to,
}: {
  children: ReactNode;
  to: string;
}) => {
  return (
    <Link href={to} className="link-item-class">
      <span className="opacity-0 transition-opacity">•</span>
      <li className="items-center duration-150 transition-all">{children}</li>
    </Link>
  );
};
