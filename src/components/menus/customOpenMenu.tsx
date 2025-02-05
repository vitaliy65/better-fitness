"use client";

import React from "react";
import Link from "next/link";
import { LinkList } from "../Lists/linkList";
import { LinkItem } from "../Lists/linkItem";
import { CustomButton } from "../buttons/customButton";
import { GridLinkList } from "../Lists/gridLinkList";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/state/store";
import { closeSideMenu } from "../../app/state/sideMenu/sideMenuSlice";
import { motion } from "motion/react";
import "../../style/customOpenMenu.css";
import { AnimatePresence } from "motion/react";

export const CustomOpenMenu = ({ className }: { className?: string }) => {
  const openMenu = useSelector((state: RootState) => state.sideMenu.open);
  const dispatch = useDispatch();

  return (
    <AnimatePresence>
      {openMenu ? (
        <div className="fixed z-30 flex justify-end w-screen h-screen overflow-x-hidden">
          <motion.div
            className={`custom-open-menu-class ${className}`}
            initial={{ translateX: window.innerWidth }}
            animate={{ translateX: 0 }}
            exit={{ translateX: window.innerWidth }}
            transition={{ duration: 1 }}
          >
            <div className="flex justify-end items-center h-fit space-x-3">
              <Link href={"/"} className="w-fit text-xl">
                Need help?
              </Link>
              <CustomButton color="bg-blue-500" className="p-3 text-white">
                Log in
              </CustomButton>
              <CustomButton
                onClick={() => {
                  dispatch(closeSideMenu());
                }}
                color="bg-blue-500"
                className="p-3 text-white"
              >
                Close
              </CustomButton>
            </div>
            <div>
              <LinkList>
                <LinkItem to="/">Products</LinkItem>
                <LinkItem to="/">Store</LinkItem>
                <LinkItem to="/">About us</LinkItem>
                <LinkItem to="/">For business</LinkItem>
                <LinkItem to="/">Blog</LinkItem>
                <LinkItem to="/">Affiliate Program</LinkItem>
                <LinkItem to="/">Careers</LinkItem>
                <LinkItem to="/">Contacts</LinkItem>
              </LinkList>
            </div>
            <div>
              <GridLinkList>
                <LinkItem to="/">Terms of Service</LinkItem>
                <LinkItem to="/">Subscription terms</LinkItem>
                <LinkItem to="/">Privacy policy</LinkItem>
                <LinkItem to="/">Money-back policy</LinkItem>
              </GridLinkList>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
};
