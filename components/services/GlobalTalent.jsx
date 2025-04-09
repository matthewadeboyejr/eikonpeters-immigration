"use client";
import Breadcrumb from "@/components/basic-setup/Breadcrumb";
import { motion } from "framer-motion";
import { FaCalendarAlt } from "react-icons/fa";
import { IoCheckbox } from "react-icons/io5";
import { fadeInUp, staggerContainer } from "../animation/animation";

const GlobalTalent = () => {
  return (
    <section className="globaltalent-overlay py-20 px-10 md:px-40 bg-blue-50 md:mt-10">
      <Breadcrumb prevPage={"Home"} currentPage={"Services"} />
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div variants={fadeInUp} className="space-y-8">
          <div className="space-y-2 mb-4">
            <p className="text-sm tracking-wide text-yellow-500">BESTSELLING</p>
            <h2 className="h2 text-4xl font-bold leading-snug text-white">
              🌍 UK Global <br />
              Global{" "}
              <span className="text-yellow-500 font-extrabold">
                Talent Visa
              </span>
            </h2>
            <div className="w-16 h-1 bg-yellow-500"></div>
          </div>

          {/* <p className="text-yellow-500 text-2xl">
              Unlock Global Opportunities with the UK Global Talent Visa
            </p> */}
          <p className="text-yellow-500 text-2xl font-bold">
            In Partnership with Leading Immigration Experts
          </p>

          <p className="font-normal  text-white ">
            The UK Global Talent Visa is designed for exceptional individuals in
            the fields of science, engineering, technology, arts, and culture.
            This flexible visa allows you to live and work in the UK without
            needing a job offer — provided you receive an endorsement from a
            recognised body.
          </p>

          <ul className="text-white">
            <p className="font-medium ">What we offer</p>
            <li className="flex items-start space-x-4">
              <IoCheckbox className="flex-shrink-0 text-yellow-600 mt-1" />
              <p>Initial consultation and eligibility screening</p>
            </li>
            <li className="flex items-start space-x-4">
              <IoCheckbox className="flex-shrink-0 text-yellow-600 mt-1" />
              <p>
                General information on the visa pathway and endorsement process
              </p>
            </li>
            <li className="flex items-start space-x-4">
              <IoCheckbox className="flex-shrink-0 text-yellow-600 mt-1" />
              <p>
                Direct referral to our partner immigration firm regulated at
                Level 2/3 or by the Solicitors Regulation Authority
                <code>(SRA)</code>
              </p>
            </li>
            <li className="flex items-start space-x-4">
              <IoCheckbox className="flex-shrink-0 text-yellow-600 mt-1" />
              <p>Support in gathering documentation needed before referral</p>
            </li>
            <li className="flex items-start space-x-4">
              <IoCheckbox className="flex-shrink-0 text-yellow-600 mt-1" />
              <p>
                Ongoing communication and coordination to ensure a smooth
                process
              </p>
            </li>
          </ul>
          <p className="text-white border-y py-4">
            <span className="font-bold">
              Please note: As a registered IAA Level 1 Organisation
            </span>
            , we do not provide immigration advice or assistance on the Global
            Talent Visa directly. However, we work in partnership with qualified
            immigration professionals who are authorised to assist at Level 2 or
            3.
          </p>
          <p className="text-white">
            Let&apos;s help you take the next step in your global journey.
            We&apos;ll connect you to the right experts while providing you with
            the information and support you need from the start.
          </p>

          <a
            href="https://forms.gle/SdekGucyTiim16Yh6"
            className="hidden md:inline-flex items-center primary-btn"
          >
            <FaCalendarAlt className="mr-2" />
            Book Consultation
          </a>
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
              src="https://images.pexels.com/photos/6084407/pexels-photo-6084407.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="happy woman"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default GlobalTalent;
