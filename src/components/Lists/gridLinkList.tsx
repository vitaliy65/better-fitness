import React, { ReactNode } from "react";
import "../../style/gridLinkList.css";

export const GridLinkList = ({
  children,
  columns = "grid-cols-2",
  className,
}: {
  children: ReactNode;
  columns?: string;
  className?: string;
}) => {
  return (
    <ul className={`grid-link-list-class ${columns} ${className}`}>
      {children}
    </ul>
  );
};
