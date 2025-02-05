"use client";

import React, { useState, useEffect } from "react";
import { CustomButton } from "./buttons/customButton";
import { CustomOpenMenu } from "./menus/customOpenMenu";
import { AnimatePresence } from "motion/react";
import "../style/mainHeader.css";

export const Header = () => {
  const [isMdScreen, setIsMdScreen] = useState(true);
  const [openMenu, setOpenMenu] = useState(false);

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMdScreen(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="main-header-settings">
        <div className="main-header-inner-settings">
          <span className="font-bold text-xl">Better - fitness</span>
          <div className="flex justify-between items-center h-full space-x-3">
            {isMdScreen ? (
              <>
                <CustomButton color="bg-blue-500" className="p-3">
                  Log in
                </CustomButton>
                <CustomButton
                  onClick={handleOpenMenu}
                  color="bg-blue-500"
                  className="p-3"
                >
                  Menu
                </CustomButton>
              </>
            ) : (
              <CustomButton
                onClick={handleOpenMenu}
                color="bg-blue-500"
                className="p-3"
              >
                Menu
              </CustomButton>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {openMenu ? (
          <CustomOpenMenu
            isMdScreen={isMdScreen}
            handleClose={() => {
              setOpenMenu(!openMenu);
            }}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
};
