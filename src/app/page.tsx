"use client";

import Link from "next/link";
import { CustomButton } from "../components/buttons/customButton";
import { Header } from "@/components/header";

export default function Home() {
  return (
    <>
      <Header />
      <div className="absolute flex w-screen h-screen">
        <video
          src="/video1.mp4"
          playsInline
          autoPlay
          muted
          loop
          className="absolute -z-10 object-cover w-full h-full"
        ></video>
        <div className="flex justify-center items-center flex-col w-full h-full transition-all">
          <h1 className="text-5xl text-center">
            Fun and Simple Fitness: <br />
            personalized activities to <br />
            cover your wellness needs <br />
          </h1>
          <Link href={"/survey"}>
            <CustomButton
              color="bg-white"
              className="text-black px-6 py-3 mt-8"
            >
              Get started
            </CustomButton>
          </Link>
        </div>
      </div>
    </>
  );
}
