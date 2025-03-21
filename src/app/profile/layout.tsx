import type { Metadata } from "next";
import { Header } from "@/components/header";
import "../globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className={`w-screen h-fit text-xl`}>{children}</div>
    </>
  );
}
