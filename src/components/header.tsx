"use client";

import React from "react";
import { CustomButton } from "./buttons/customButton";
import { useDispatch } from "react-redux";
import "../style/mainHeader.css";
import { openSideMenu } from "@/app/state/sideMenu/sideMenuSlice";

export const Header = () => {
  const dispatch = useDispatch();

  return (
    <div className="main-header-settings">
      <div className="main-header-inner-settings">
        <span className="font-bold text-xl">Better - fitness</span>
        <div className="flex justify-between items-center h-full space-x-3">
          <CustomButton color="bg-blue-500" className="p-3 sm:block hidden ">
            Log in
          </CustomButton>
          <CustomButton
            onClick={() => {
              dispatch(openSideMenu());
            }}
            color="bg-blue-500"
            className="p-3"
          >
            Menu
          </CustomButton>
        </div>
      </div>
    </div>
  );
};
