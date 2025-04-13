"use client";
import { motion } from "framer-motion";
import { FaGraduationCap, FaBookOpen, FaSearch } from "react-icons/fa";
import { RiGlobalFill } from "react-icons/ri";
import { Button } from "../basic-setup/Button";

const TrainingCertification = () => {
  const trainingItems = [
    {
      title: "Take IELTS",
      description:
        "There are many variations of passages of available, but the majority have suffered freedom alteration.",
      icon: <FaGraduationCap className="text-3xl text-blue-600" />,
      image:
        "https://images.pexels.com/photos/7092454/pexels-photo-7092454.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      title: "Citizionship Test",
      description:
        "There are many variations of passages of available, but the majority have suffered freedom alteration.",
      icon: <RiGlobalFill className="text-3xl text-blue-600" />,
      image:
        "https://images.pexels.com/photos/5989928/pexels-photo-5989928.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      title: "PTE Coaching",
      description:
        "There are many variations of passages of available, but the majority have suffered freedom alteration.",
      icon: <FaBookOpen className="text-3xl text-blue-600" />,
      image:
        "https://images.pexels.com/photos/4101143/pexels-photo-4101143.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  ];

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const hoverVariants = {
    hover: {
      y: -10,
      transition: { duration: 0.3 },
    },
  };

  const combinedVariants = {
    ...itemVariants,
    hover: hoverVariants.hover,
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="space-y-2 mb-12 flex flex-col justify-center items-center text-center w-full"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-sm sm:text-base text-gray-600">
            TRAINING & CERTIFICATION
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-snug">
            Get the Immigration
            <br />
            Trainings you
            <span className="text-yellow-500 font-extrabold"> Deserve</span>
          </h2>
          <div className="w-12 h-1 bg-yellow-500 mt-2"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trainingItems.map((item, index) => (
            <motion.div
              key={index}
              initial="hidden"
              animate="visible"
              variants={combinedVariants}
              transition={{ delay: index * 0.1 }}
              whileHover="hover"
              className="bg-white rounded-lg overflow-hidden shadow-md"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="mr-4">{item.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {item.title}
                  </h3>
                </div>
                <p className="text-gray-600 mb-6">{item.description}</p>
                {/*  <button className="text-blue-600 font-medium hover:text-blue-800 transition-colors">
                  Learn More →
                </button> */}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <Button
            title={"Discover More"}
            style={"primary-btn"}
            route={"/services"}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default TrainingCertification;
