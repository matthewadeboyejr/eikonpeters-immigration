"use client";
import React from "react";
import { motion } from "framer-motion";
import { RiGlobalLine } from "react-icons/ri";
import Nav from "@/components/home/Nav";
import Breadcrumb from "@/components/basic-setup/Breadcrumb";
import MissionVision from "@/components/about/MissionVision";
import FewReasons from "@/components/home/FewReasons";
import FounderSection from "@/components/about/FounderSection";

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
    <div cla>
      <section className="review-overlay py-20 px-10 md:px-40 bg-blue-50">
        <Breadcrumb prevPage={"Home"} currentPage={"About"} />
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div variants={fadeInUp} className="space-y-8">
            <div className="space-y-2 mb-4">
              <p className="text-sm tracking-wide text-yellow-500">
                ABOUT THE COMPANY
              </p>
              <h2 className="h2 text-4xl font-bold leading-snug text-white">
                Providing the best <br />
                immigration{" "}
                <span className="text-yellow-500 font-extrabold">services</span>
              </h2>
              <div className="w-16 h-1 bg-yellow-500"></div>
            </div>

            <p className="text-yellow-500 text-2xl">
              UK based immigration consultant agency.
            </p>

            <p className="font-normal  text-white">
              We are dedicated to making your immigration journey as smooth and
              stress-free as possible. With years of experience and a team of
              highly knowledgeable professionals, we have helped thousands of
              individuals, families, and businesses navigate the complexities of
              immigration law and find success in their endeavors.
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col gap-6 items-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-full h-full rounded-full overflow-hidden border-4 border-yellow-500 shadow-lg"
            >
              <img
                src="https://images.pexels.com/photos/4353813/pexels-photo-4353813.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Passport"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      <MissionVision />
      <FounderSection />
      <FewReasons />
    </div>
  );
};

export default About;
