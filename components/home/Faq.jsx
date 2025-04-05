"use client";

import React, { useState } from "react";
import { IoAdd, IoRemove } from "react-icons/io5";

import { motion } from "framer-motion";
import FAQ from "@/data/FAQ";

const Faq = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);
  const [slice, setSlice] = useState(6);
  const toggleDropdown = (Id) => {
    setIsDropdownOpen((prev) => (prev === Id ? null : Id));
  };

  const handleSlice = () => {
    if (slice === 5) {
      setSlice(10);
    } else setSlice(5);
  };

  return (
    <section className=" space-y-10 p-10 bg-primary rounded-xl mt-32 mx-5">
      <motion.div
        className="space-y-2 mb-12 flex flex-col  w-full"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <p className="text-sm sm:text-base text-gray-600">
          QUESTIONS & ANSWERS
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-snug">
          Common questions to know before using
          <br />
          Our
          <span className="text-yellow-500 font-extrabold"> services.</span>
        </h2>
        <div className="w-12 h-1 bg-yellow-500 mt-2"></div>
      </motion.div>

      <div>
        <ul className="space-y-5 ">
          {FAQ.slice(1, slice).map((faq) => (
            <motion.li
              initial={{
                y: 100,
                opacity: 0,
              }}
              whileInView={{ y: 0, x: 0, opacity: 1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 1, stiffnes: 1000, velocity: -100 }}
              key={faq.id}
              className="space-y-3 border border-secondary/30  p-5 rounded-3xl"
            >
              <p
                onClick={() => toggleDropdown(faq.id)}
                className="flex items-center justify-between text-xl hover:cursor-pointer"
              >
                <span className="text-black md:text-lg text-sm">
                  {faq?.question}
                </span>
                <span className="text-secondary">
                  {isDropdownOpen === faq?.id ? <IoRemove /> : <IoAdd />}
                </span>
              </p>

              {isDropdownOpen === faq.id && (
                <p className="flex items-center justify-between text-black opacity-60">
                  {faq?.answer}
                </p>
              )}
            </motion.li>
          ))}
        </ul>
      </div>
      <motion.div
        initial={{
          y: 100,
          opacity: 0,
        }}
        whileInView={{ y: 0, x: 0, opacity: 1 }}
        transition={{ duration: 1, stiffnes: 1000, velocity: -100 }}
        className=" flex md:flex-row flex-col  w-full items-center justify-center space-x-5 space-y-5 md:space-y-0   "
      >
        <button onClick={handleSlice} className=" primary-btn  ">
          {slice === 5 ? "More" : "Collapse"}
        </button>
      </motion.div>
    </section>
  );
};

export default Faq;
