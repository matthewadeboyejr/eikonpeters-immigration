"use client";

import { motion } from "framer-motion";
import {
  FaUsers,
  FaUmbrellaBeach,
  FaGraduationCap,
  FaHome,
  FaBriefcase,
} from "react-icons/fa";
import { RiGlobalFill } from "react-icons/ri";
import { Button } from "../basic-setup/Button";

const ServicesSection = () => {
  const services = [
    {
      name: "Global Talent",
      icon: <RiGlobalFill className="text-2xl text-yellow-600" />,
      id: "global-talent",
    },
    {
      name: "Tourist Visa",
      icon: <FaUmbrellaBeach className="text-2xl text-yellow-600" />,
      id: "visitor",
    },
    {
      name: "Student Visa",
      icon: <FaGraduationCap className="text-2xl text-yellow-600" />,
      id: "student",
    },
    {
      name: "Residence Visa",
      icon: <FaHome className="text-2xl text-yellow-600" />,
      id: "self-sponsorship",
    },
    {
      name: "Business Visa",
      icon: <FaBriefcase className="text-2xl text-yellow-600" />,
      id: "business-license",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-amber-50 ">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="space-y-2 mb-12 flex flex-col  w-full"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-sm sm:text-base text-gray-600">WHAT WE OFFER</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-snug">
            Outstanding immigration
            <br />
            visa
            <span className="text-yellow-500 font-extrabold"> services.</span>
          </h2>
          <div className="w-12 h-1 bg-yellow-500 mt-2"></div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-gray-50 p-6 rounded-lg text-center cursor-pointer transition-all hover:shadow-md"
            >
              <div className="flex justify-center mb-3">{service.icon}</div>
              <h3 className="text-lg font-medium text-gray-800">
                {service.name}
              </h3>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="text-xl font-semibold text-gray-800 mb-6">
            Get visa with 100% success rate
          </p>

          <Button
            title={"Apply Now"}
            style={"primary-btn"}
            route={"/contact"}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
