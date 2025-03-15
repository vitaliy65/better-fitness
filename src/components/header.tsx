"use client";

import React, { useEffect, useState } from "react";
import { CustomButton } from "./buttons/customButton";
import { useDispatch } from "react-redux";
import "@/style/mainHeader.css";
import { openSideMenu } from "@/app/state/sideMenu/sideMenuSlice";
import Link from "next/link";
import { CustomOpenMenu } from "./menus/customOpenMenu";
import axios from "axios";
import { APP_URL } from "@/utils/constants";

export const Header = () => {
  const dispatch = useDispatch();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userInfo = JSON.parse(localStorage.getItem("user") || "");
      if (userInfo) {
        await axios
          .post(`${APP_URL}/api/auth/me`, { token: userInfo.token })
          .then((res) => {
            setIsAuthorized(res.data.valid);
          })
          .catch(() => {
            setIsAuthorized(false);
          });
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <>
      <div className="main-header-settings">
        <div className="main-header-inner-settings">
          <Link href={"/"} className="font-bold text-xl">
            Better - fitness
          </Link>
          <div className="flex justify-between items-center h-full space-x-3">
            {isAuthorized ? (
              <Link href={"/profile"}>
                <CustomButton
                  color="bg-blue-500"
                  className="p-3 sm:block hidden"
                >
                  Profile
                </CustomButton>
              </Link>
            ) : (
              <Link href={"/login"}>
                <CustomButton
                  color="bg-blue-500"
                  className="p-3 sm:block hidden"
                >
                  Log in
                </CustomButton>
              </Link>
            )}

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
