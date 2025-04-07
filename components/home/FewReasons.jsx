"use client";

import { FaUserTie, FaGlobe, FaShieldAlt, FaHeadset } from "react-icons/fa";
import { motion } from "motion/react";

const features = [
  {
    icon: <FaUserTie size={30} />,
    title: "Expert Consultants",
    description:
      "Our team of professionals ensures a smooth visa process with expert guidance.",
  },
  {
    icon: <FaGlobe size={30} />,
    title: "Global Reach",
    description:
      "We provide services for multiple countries with success-driven strategies.",
  },
  {
    icon: <FaShieldAlt size={30} />,
    title: "Secure & Trusted",
    description:
      "Your documents and data are handled with utmost security and transparency.",
  },
  {
    icon: <FaHeadset size={30} />,
    title: "Customer Support",
    description:
      "Reliable customer service that’s always ready to help you with your queries.",
  },
];

const FeatureCard = ({ icon, title, description, delay }) => (
  <motion.div
    className="bg-white shadow-lg rounded-2xl p-6 text-center hover:shadow-xl transition-shadow"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    viewport={{ once: true }}
  >
    <div className="text-primary mb-4 text-yellow-500">{icon}</div>
    <h3 className="font-semibold text-lg mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </motion.div>
);

const FewReasons = () => {
  return (
    <section className=" reason-overlay py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <motion.div
          className="space-y-2 mb-12 flex flex-col justify-center items-center text-center w-full"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-sm sm:text-base text-gray-600">
            COUNTRIES YOU CAN VISIT
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-snug">
            Few reasons to choose <br />
            our visa{" "}
            <span className="text-yellow-500 font-extrabold">company</span>
          </h2>
          <div className="w-12 h-1 bg-red-500 mt-2"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, idx) => (
            <FeatureCard key={idx} {...item} delay={idx * 0.2} />
          ))}
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-green-900 md:rounded-full mx-5 rounded-2xl px-6 py-2 mt-12 md:mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md"
      >
        <p className="text-white text-center text-sm sm:text-base font-medium flex items-center gap-3">
          <span>
            <img
              className="max-w-7 h-7 rounded-full"
              src="../images/iaa.png"
              alt="iaa logo"
            />
          </span>
          <span>Top rated by customers & IAA Registered</span>
        </p>

        <button className="secondary-btn">Discover More</button>
      </motion.div>
    </section>
  );
};

export default FewReasons;
