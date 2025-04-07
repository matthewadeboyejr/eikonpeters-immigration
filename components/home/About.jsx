"use client";
import React from "react";
import { motion } from "framer-motion";
import { RiGlobalLine } from "react-icons/ri";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const About = () => {
  return (
    <section className="py-20 px-10 md:px-40 bg-white">
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div variants={fadeInUp} className="space-y-8">
          <div className="space-y-2 mb-4">
            <p className="text-sm opacity-50 tracking-wide">
              ABOUT THE COMPANY
            </p>
            <h2 className="h2 text-4xl font-bold leading-snug">
              Providing the best <br />
              immigration{" "}
              <span className="text-yellow-500 font-extrabold">services</span>
            </h2>
            <div className="w-16 h-1 bg-yellow-500"></div>
          </div>

          <p className="text-yellow-500 text-2xl">
            UK based immigration consultant agency.
          </p>

          <p className="font-normal opacity-70">
            We are committed to making your immigration journey seamless and
            stress-free. Backed by years of experience and a team of seasoned
            professionals, we have successfully guided hundreds of individuals,
            families, and businesses through the complexities of immigration
            law—helping them achieve their goals with confidence.
          </p>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="text-yellow-500 text-3xl">
                <RiGlobalLine />
              </div>
              <div>
                <p className="text-xl font-bold">Best Immigration Services</p>
                <p className="opacity-50 text-sm">
                  We provide expert immigration services with a personal touch.
                </p>
              </div>
            </div>
          </div>

          <button className="primary-btn mt-6">Discover More</button>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="relative flex flex-col gap-6 items-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-56 h-56 rounded-full overflow-hidden border-4 border-yellow-500 shadow-lg"
          >
            <img
              src="https://images.pexels.com/photos/4353813/pexels-photo-4353813.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Passport"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <div className="flex gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-36 h-36 rounded-lg overflow-hidden shadow-md"
            >
              <img
                src="https://images.pexels.com/photos/16511266/pexels-photo-16511266/free-photo-of-elderly-couple-holding-a-sign-while-walking-on-a-street-during-a-protest.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Immigration"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-36 h-36 rounded-lg overflow-hidden shadow-md relative"
            >
              <img
                src="https://images.pexels.com/photos/4880419/pexels-photo-4880419.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Client"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 right-2 bg-blue-900 text-white px-3 py-1 rounded-md flex items-center gap-1 shadow-md">
                <span className="font-bold text-lg"></span>
                <span className="text-sm">Satisfied Clients</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
