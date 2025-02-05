import React from "react";
import Link from "next/link";
import { LinkList } from "../Lists/linkList";
import { LinkItem } from "../Lists/linkItem";
import { CustomButton } from "../buttons/customButton";
import { GridLinkList } from "../Lists/gridLinkList";
import { motion } from "motion/react";
import "../../style/customOpenMenu.css";

export const CustomOpenMenu = ({
  isMdScreen,
  handleClose,
}: {
  isMdScreen: boolean;
  handleClose: () => void;
}) => {
  return (
    <motion.div
      className="custom-open-menu-class"
      initial={{ translateX: window.innerWidth }}
      animate={{ translateX: 0 }}
      exit={{ translateX: window.innerWidth }}
      transition={{ duration: 1 }}
    >
      <div className="flex justify-end items-center h-16 space-x-3">
        <Link href={"/"} className="mr-4">
          Need help?
        </Link>
        {isMdScreen ? (
          <>
            <CustomButton color="bg-blue-500" className="p-3 text-white">
              Log in
            </CustomButton>
            <CustomButton
              onClick={handleClose}
              color="bg-blue-500"
              className="p-3 text-white"
            >
              Menu
            </CustomButton>
          </>
        ) : (
          <CustomButton
            onClick={handleClose}
            color="bg-blue-500"
            className="p-3 text-white"
          >
            Menu
          </CustomButton>
        )}
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
  );
};
