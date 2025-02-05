"use client";

import React, { ReactNode } from "react";
import "../../style/linkList.css";

export const LinkList = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return <ul className={`link-list-class ${className}`}>{children}</ul>;
};
