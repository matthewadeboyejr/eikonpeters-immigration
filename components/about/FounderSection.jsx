"use client ";

import { motion } from "framer-motion";
import {
  FaGlobeAmericas,
  FaBalanceScale,
  FaUserGraduate,
  FaHandshake,
} from "react-icons/fa";

const FounderSection = () => {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Founder Image */}
          <div className="relative group">
            <img
              src="https://eikonpeters.co.uk/assets/new-founder-3Tm8_JP-.jpg"
              alt="Founder"
              className="rounded-xl shadow-xl transform group-hover:scale-101 transition-transform"
            />
            <div className="absolute -inset-4 border-2 border-yellow-200 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          {/* Founder Content */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-900">
              <span className="text-yellow-600">Global Vision,</span>
              <br />
              Founder Commitment
            </h2>

            <div className="space-y-4 text-gray-600">
              <p>
                Eikon Peters Immigration Services Ltd, under the leadership of
                founder Olamide Adedeji, is shaped by years of practical
                engagement in global immigration and cross-border policy
                development. Olamide has engaged with hundreds of individuals,
                families, and professionals, providing trusted guidance through
                various immigration processes across the UK and beyond. His
                experience spans government collaboration, corporate relocation,
                academic visa programs, and humanitarian pathways, making him a
                respected voice in the immigration space. Olamide is a
                registered OISC Immigration Adviser, committed to ethical and
                compliant immigration support. Beyond formal services, he has
                also contributed to his community through informal advisory
                roles, seminars, and mentoring—helping many take informed steps
                towards legal migration pathways.
              </p>

              <div className="flex items-start space-x-4">
                <FaUserGraduate className="flex-shrink-0 text-yellow-600 mt-1" />
                <p>
                  A recognized expert in both immigration strategy and
                  Information Technology, Olamide has trained over 1500
                  professionals and developed mentorship and certification
                  programs across Canada, the UK, Australia, Nigeria, and the
                  United States.
                </p>
              </div>

              <div className="flex items-start space-x-4">
                <FaHandshake className="flex-shrink-0 text-yellow-600 mt-1" />
                <p>
                  His unique approach combines rigorous legal expertise with
                  deep cultural understanding, having personally assisted
                  clients from 8+ countries in achieving their immigration
                  goals.
                </p>
              </div>
            </div>

            <div className="mt-8 border-l-4 border-yellow-600 pl-4">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Olamide Adedeji
              </h3>
              <p className="text-gray-600 font-medium">
                Immigration Strategist | Global Mobility Expert | Information
                Technology Leader | Agile Practitioner | Strategic Solutions
                Driver
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {[
                { icon: <FaGlobeAmericas />, text: "8+ Countries Served" },
                { icon: <FaBalanceScale />, text: "98% Success Rate" },
                {
                  icon: <FaUserGraduate />,
                  text: "1500+ Professionals Trained",
                },
                { icon: <FaHandshake />, text: "100+ Cases Managed" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg text-center shadow-sm"
                >
                  <div className="text-yellow-600 text-2xl mb-2">
                    {item.icon}
                  </div>
                  <p className="text-sm font-medium">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FounderSection;
