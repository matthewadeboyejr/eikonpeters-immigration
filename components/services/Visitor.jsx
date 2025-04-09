import { motion } from "framer-motion";
import { FaCalendarAlt, FaCheck, FaUserGraduate } from "react-icons/fa";
import { IoCheckbox } from "react-icons/io5";
import { fadeInUp, staggerContainer } from "../animation/animation";
import BookButton from "../basic-setup/Button";

const Visitor = () => {
  return (
    <section className="py-20 px-10 md:px-40  md:mt-10 bg-white">
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div variants={fadeInUp} className="space-y-8">
          <div className="space-y-2 mb-4">
            {/*  <p className="text-sm tracking-wide text-yellow-500">
                BESTSELLING
              </p> */}
            <h2 className="h2 text-4xl font-bold leading-snug text-blacke">
              ✈️ UK Visitor&apos;s <br />
              <span className="text-yellow-500 font-extrabold"> Visa </span>
            </h2>
            <div className="w-16 h-1 bg-yellow-500"></div>
          </div>

          <p className="text-yellow-500 text-2xl">
            Visit the UK for Tourism, Family, or Business—Stress-Free
          </p>

          <p className="font-normal text-black">
            Planning a trip to the UK? Whether you're visiting loved ones,
            exploring iconic sights, or attending a business meeting, the UK
            Visitor&apos;s Visa is your key to a smooth and legal entry. We make
            the process simple and clear—from gathering the right documents to
            submitting your application and preparing for your visa interview.
          </p>
          <ul className="text-black">
            <p className="font-medium ">Our Visitor Visa Support Covers:</p>
            <li className="flex items-start space-x-4">
              <IoCheckbox className="flex-shrink-0 text-yellow-600 mt-1" />
              <p>Tourist, family, and business visit applications</p>
            </li>
            <li className="flex items-start space-x-4">
              <IoCheckbox className="flex-shrink-0 text-yellow-600 mt-1" />
              <p>Accurate document checklist & application support</p>
            </li>
            <li className="flex items-start space-x-4">
              <IoCheckbox className="flex-shrink-0 text-yellow-600 mt-1" />
              <p>Financial proof guidance and cover letter preparation</p>
            </li>
            <li className="flex items-start space-x-4">
              <IoCheckbox className="flex-shrink-0 text-yellow-600 mt-1" />
              <p> Interview tips and pre-departure advice</p>
            </li>
          </ul>
          <p className="text-black">
            Travel with confidence. Arrive with peace of mind. We&apos;ll ensure
            your visitor visa process is efficient, accurate, and stress-free.
          </p>

          <BookButton />
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="flex flex-col gap-6 items-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-full h-full rounded-sm overflow-hidden border-4 border-yellow-500 shadow-lg"
          >
            <img
              src="https://images.pexels.com/photos/31460158/pexels-photo-31460158/free-photo-of-capturing-big-ben-through-smartphone-in-london.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="happy man"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Visitor;
