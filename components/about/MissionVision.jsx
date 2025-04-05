"use client";
import { motion } from "framer-motion";
import { FaBullseye, FaEye, FaHandshake, FaChartLine } from "react-icons/fa";

const MissionVision = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}

        <motion.div
          className="space-y-2 mb-12 flex flex-col justify-center items-center text-center w-full"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-sm sm:text-base text-gray-600">OUR PURPOSE</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-snug">
            Driving innovation through clarity of vision
            <br />
            <span className="text-yellow-500 font-extrabold">
              and commitment to our mission
            </span>
          </h2>
          <div className="w-12 h-1 bg-yellow-500 mt-2"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Mission Card */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center mb-6">
              <div className="bg-yellow-100 p-3 rounded-full mr-4">
                <FaBullseye className="text-yellow-600 text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Our Mission</h3>
            </div>
            <p className="text-gray-600 mb-6">
              To empower individuals and businesses through innovative
              immigration solutions that simplify complex processes, ensuring
              seamless transitions and life-changing opportunities worldwide.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2">✓</span>
                <span className="text-gray-700">
                  Simplify immigration processes
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2">✓</span>
                <span className="text-gray-700">Provide expert guidance</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2">✓</span>
                <span className="text-gray-700">
                  Deliver exceptional client experiences
                </span>
              </li>
            </ul>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            transition={{ delay: 0.2 }}
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center mb-6">
              <div className="bg-yellow-100 p-3 rounded-full mr-4">
                <FaEye className="text-yellow-600 text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Our Vision</h3>
            </div>
            <p className="text-gray-600 mb-6">
              To become the most trusted global immigration partner, breaking
              down borders and building bridges that connect talent with
              opportunity, fostering cultural exchange and economic growth.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-yellow-50 p-4 rounded-lg">
                <FaHandshake className="text-yellow-600 text-2xl mb-2" />
                <h4 className="font-medium text-gray-800">Global Trust</h4>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <FaChartLine className="text-yellow-600 text-2xl mb-2" />
                <h4 className="font-medium text-gray-800">Economic Growth</h4>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Core Values */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          transition={{ delay: 0.4 }}
          className="mt-16 bg-[#2B65B0] rounded-xl p-8 text-white"
        >
          <h3 className="text-2xl font-bold mb-6">Our Core Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Integrity",
                desc: "Honest, ethical practices in all we do",
              },
              {
                title: "Innovation",
                desc: "Continually improving our services",
              },
              {
                title: "Empathy",
                desc: "Understanding each client's unique journey",
              },
              {
                title: "Excellence",
                desc: "Striving for the highest standards",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="bg-white/10 p-4 rounded-lg backdrop-blur-sm"
              >
                <h4 className="font-bold text-lg mb-2">{value.title}</h4>
                <p className="text-white">{value.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MissionVision;
