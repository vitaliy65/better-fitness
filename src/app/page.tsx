"use client";

import { CustomButton } from "../components/buttons/customButton";

export default function Home() {
  return (
    <div className="flex w-screen h-screen">
      <video
        src="/video1.mp4"
        playsInline
        autoPlay
        muted
        loop
        className="absolute -z-10 object-cover w-full h-full"
      ></video>
      <div className="flex justify-center items-center flex-col w-full ">
        <h1 className="text-5xl text-center">
          Fun and Simple Fitness: <br />
          personalized activities to <br />
          cover your wellness needs <br />
        </h1>
        <CustomButton color="bg-white" className="text-black px-6 py-3 mt-8">
          Get started
        </CustomButton>
      </div>
    </div>
  );
}
