import React from "react";
import Card from "../../components/cards/card";

export default function Survey() {
  return (
    <div className="absolute flex justify-center items-center w-screen h-fit md:h-screen mt-20 md:mt-0 py-4">
      <div className="grid lg:grid-flow-col md:grid-cols-2 grid-cols-1 gap-4">
        <Card img="/photo2.webp" text="asdasd" />
        <Card img="/photo2.webp" text="asdasd" />
        <Card img="/photo2.webp" text="asdasd" />
        <Card img="/photo2.webp" text="asdasd" />
      </div>
    </div>
  );
}
