"use client";
import Breadcrumb from "@/components/basic-setup/Breadcrumb";
import { motion } from "framer-motion";
import { FaCalendarAlt } from "react-icons/fa";
import { IoCheckbox } from "react-icons/io5";
import { fadeInUp, staggerContainer } from "../animation/animation";
import BookButton from "../basic-setup/Button";

const SelfSponsorship = () => {
  return (
    <section className="py-20 px-10 md:px-40  md:mt-10 bg-grey-50">
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
              💼 UK Self-Sponsorship <br />
              <span className="text-yellow-500 font-extrabold">Visa</span>
            </h2>
            <div className="w-16 h-1 bg-yellow-500"></div>
          </div>

          {/* <p className="text-yellow-500 text-2xl">
              Be Your Own Sponsor. Build Your Future in the UK.
            </p> */}

          <p className="text-yellow-500 text-2xl font-bold">
            In Partnership with Leading Immigration Experts
          </p>

          <p className="font-normal text-black">
            The UK&apos;s Self-Sponsorship pathway offers a unique opportunity
            for entrepreneurs and professionals to take control of their journey
            to the UK through the development of a business. If you have a
            viable business idea or want to expand your existing business to the
            UK, this route may be suitable for you.
          </p>

          <ul className="text-black">
            <p className="font-medium ">What we offer</p>
            <li className="flex items-start space-x-4">
              <IoCheckbox className="flex-shrink-0 text-yellow-600 mt-1" />
              <p>Support with setting up your UK company</p>
            </li>
            <li className="flex items-start space-x-4">
              <IoCheckbox className="flex-shrink-0 text-yellow-600 mt-1" />
              <p>
                Initial information about the sponsor licence process and
                requirements{" "}
              </p>
            </li>
            <li className="flex items-start space-x-4">
              <IoCheckbox className="flex-shrink-0 text-yellow-600 mt-1" />
              <p>
                Referral to trusted immigration professionals regulated at OISC
                Level 2/3 or by the Solicitors Regulation Authority{" "}
                <code>(SRA)</code>
              </p>
            </li>
            <li className="flex items-start space-x-4">
              <IoCheckbox className="flex-shrink-0 text-yellow-600 mt-1" />
              <p>Business planning assistance and operational guidance</p>
            </li>
            <li className="flex items-start space-x-4">
              <IoCheckbox className="flex-shrink-0 text-yellow-600 mt-1" />
              <p>
                Assistance with gathering documentation and business plans for
                onward referral
              </p>
            </li>
            <li className="flex items-start space-x-4">
              <IoCheckbox className="flex-shrink-0 text-yellow-600 mt-1" />
              <p>Ongoing non-legal support throughout your business journey</p>
            </li>
          </ul>
          <p className="text-black border-y py-4">
            <span className="font-bold">
              Please note: As a registered IAA Level 1 Organisation
            </span>
            , we do not provide immigration advice or assistance on the Global
            Talent Visa directly. However, we work in partnership with qualified
            immigration professionals who are authorised to assist at Level 2 or
            3.
          </p>
          <p className="text-black">
            Take charge of your future, build a business you believe in, and
            explore life in the UK — with the right professionals supporting
            every step. Let&apos;s help you lay the foundation for your UK
            success story.
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
              src="https://images.pexels.com/photos/13802125/pexels-photo-13802125.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="happy man"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default SelfSponsorship;
