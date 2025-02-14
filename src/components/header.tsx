"use client";

import React from "react";
import { CustomButton } from "./buttons/customButton";
import { useDispatch } from "react-redux";
import "../style/mainHeader.css";
import { openSideMenu } from "@/app/state/sideMenu/sideMenuSlice";
import { CustomOpenMenu } from "@/components/menus/customOpenMenu";
import Link from "next/link";

export const Header = () => {
  const dispatch = useDispatch();

  return (
    <>
      <div className="main-header-settings">
        <div className="main-header-inner-settings">
          <Link href={"/"} className="font-bold text-xl">
            Better - fitness
          </Link>
          <div className="flex justify-between items-center h-full space-x-3">
            <Link href={"/login"}>
              <CustomButton
                color="bg-blue-500"
                className="p-3 sm:block hidden "
              >
                Log in
              </CustomButton>
            </Link>
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
      <CustomOpenMenu />
    </>
  );
};
