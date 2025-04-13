"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "../basic-setup/Button";

const Header = () => {
  const router = useRouter();

  return (
    <header className="header-overlay px-6 md:px-20 lg:px-40 py-10 flex items-center ">
      <motion.div
        className="text-white space-y-6 max-w-4xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <motion.h1
          className="text-5xl sm:text-6xl md:text-6xl lg:text-7xl font-semibold leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.1 }}
        >
          Best Visa <span className="text-yellow-500 font-extrabold">&</span>{" "}
          Immigration Services
        </motion.h1>

        <motion.p
          className="text-base sm:text-lg md:text-xl font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.2 }}
        >
          Get the best solution for all types of Visa & Immigration
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.2 }}
        >
          <Button
            title={"Explore More"}
            style={"primary-btn"}
            route={"/services"}
          />

          <Button
            title={"Contact Now"}
            style={"secondary-btn"}
            route={"/contact"}
            viewicon={"hidden"}
          />
        </motion.div>
      </motion.div>
    </header>
  );
};

export default Header;
