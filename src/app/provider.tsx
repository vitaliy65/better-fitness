"use client";

import React, { type ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "./state/store";

export function Providers({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
