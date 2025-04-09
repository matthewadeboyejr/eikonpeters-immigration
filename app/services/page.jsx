"use client";
import Breadcrumb from "@/components/basic-setup/Breadcrumb";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaCheck, FaUserGraduate } from "react-icons/fa";
import { IoCheckbox } from "react-icons/io5";

const page = () => {
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
  return (
    <div>
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
              <p className="text-sm tracking-wide text-yellow-500">
                BESTSELLING
              </p>
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
              The UK Global Talent Visa is designed for exceptional individuals
              in the fields of science, engineering, technology, arts, and
              culture. This flexible visa allows you to live and work in the UK
              without needing a job offer — provided you receive an endorsement
              from a recognised body.
            </p>

            <p className="text-white border-y py-4">
              <span className="font-bold">
                Please note: As a registered IAA Level 1 Organisation
              </span>
              , we do not provide immigration advice or assistance on the Global
              Talent Visa directly. However, we work in partnership with
              qualified immigration professionals who are authorised to assist
              at Level 2 or 3.
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
                  General information on the visa pathway and endorsement
                  process
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
            <p className="text-white">
              Let&apos;s help you take the next step in your global journey.
              We&apos;ll connect you to the right experts while providing you
              with the information and support you need from the start.
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
              for entrepreneurs and professionals to take control of their
              journey to the UK through the development of a business. If you
              have a viable business idea or want to expand your existing
              business to the UK, this route may be suitable for you.
            </p>
            <p className="text-black border-y py-4">
              <span className="font-bold">
                Please note: As a registered IAA Level 1 Organisation
              </span>
              , we do not provide immigration advice or assistance on the Global
              Talent Visa directly. However, we work in partnership with
              qualified immigration professionals who are authorised to assist
              at Level 2 or 3.
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
                  Referral to trusted immigration professionals regulated at
                  OISC Level 2/3 or by the Solicitors Regulation Authority{" "}
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
                <p>
                  Ongoing non-legal support throughout your business journey
                </p>
              </li>
            </ul>
            <p className="text-black">
              Take charge of your future, build a business you believe in, and
              explore life in the UK — with the right professionals supporting
              every step. Let&apos;s help you lay the foundation for your UK
              success story.
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
                src="https://images.pexels.com/photos/13802125/pexels-photo-13802125.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="happy man"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

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
                📄 UK Business License <br />
                <span className="text-yellow-500 font-extrabold">Support </span>
              </h2>
              <div className="w-16 h-1 bg-yellow-500"></div>
            </div>

            <p className="text-yellow-500 text-2xl">
              Secure Your UK Business License with Confidence
            </p>

            <p className="font-normal text-black">
              Setting up a business in the UK? One of the most critical steps is
              obtaining the right business license. Whether you're launching a
              consultancy, retail outlet, import/export company, or any other
              business type, we provide expert guidance to ensure your
              operations meet all legal requirements. Our team helps you
              navigate the licensing process, from selecting the appropriate
              structure to submitting accurate documentation—saving you time,
              money, and unnecessary setbacks.
            </p>
            <ul className="text-black">
              <p className="font-medium ">What we offer</p>
              <li className="flex items-start space-x-4">
                <IoCheckbox className="flex-shrink-0 text-yellow-600 mt-1" />
                <p>Identifying the correct license for your business type</p>
              </li>
              <li className="flex items-start space-x-4">
                <IoCheckbox className="flex-shrink-0 text-yellow-600 mt-1" />
                <p>Assistance with company registration and setups</p>
              </li>
              <li className="flex items-start space-x-4">
                <IoCheckbox className="flex-shrink-0 text-yellow-600 mt-1" />
                <p>Document preparation and application filing</p>
              </li>
              <li className="flex items-start space-x-4">
                <IoCheckbox className="flex-shrink-0 text-yellow-600 mt-1" />
                <p>Ongoing regulatory compliance support</p>
              </li>
            </ul>
            <p className="text-black">
              Start Strong. Stay Compliant. Scale Confidently. We&apos;re here
              to make your business launch in the UK smooth, legal, and
              stress-free.
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
                src="http://images.pexels.com/photos/2955375/pexels-photo-2955375.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="happy man"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

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
                🎓 UK Student
                <br />
                <span className="text-yellow-500 font-extrabold"> Visa </span>
              </h2>
              <div className="w-16 h-1 bg-yellow-500"></div>
            </div>

            <p className="text-yellow-500 text-2xl">
              Study in the UK. Shape Your Future.
            </p>

            <p className="font-normal text-black">
              Dreaming of studying in the UK? The UK Student Visa opens doors to
              world-class education, international experience, and endless
              opportunities. Whether you're applying for undergraduate,
              postgraduate, or specialized courses, we provide all the support
              you need to make your journey seamless and stress-free. From
              choosing the right school to preparing your visa application, we
              walk you through every stage with expert guidance and care.
            </p>
            <ul className="text-black">
              <p className="font-medium ">What we offer</p>
              <li className="flex items-start space-x-4">
                <IoCheckbox className="flex-shrink-0 text-yellow-600 mt-1" />
                <p>School/course selection & application support</p>
              </li>
              <li className="flex items-start space-x-4">
                <IoCheckbox className="flex-shrink-0 text-yellow-600 mt-1" />
                <p>Confirmation of Acceptance for Studies guidance</p>
              </li>
              <li className="flex items-start space-x-4">
                <IoCheckbox className="flex-shrink-0 text-yellow-600 mt-1" />
                <p>Visa application and document preparation</p>
              </li>
              <li className="flex items-start space-x-4">
                <IoCheckbox className="flex-shrink-0 text-yellow-600 mt-1" />
                <p>Pre-departure briefings and support</p>
              </li>
            </ul>
            <p className="text-black">
              Get it right from the start. Study with peace of mind. Let us
              handle the details—so you can focus on your academic goals.
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
                src="https://images.pexels.com/photos/31513417/pexels-photo-31513417/free-photo-of-graduates-celebrating-in-ceremony-attire.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="happy man"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

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
              Visitor&apos;s Visa is your key to a smooth and legal entry. We
              make the process simple and clear—from gathering the right
              documents to submitting your application and preparing for your
              visa interview.
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
              Travel with confidence. Arrive with peace of mind. We&apos;ll
              ensure your visitor visa process is efficient, accurate, and
              stress-free.
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
                src="https://images.pexels.com/photos/31460158/pexels-photo-31460158/free-photo-of-capturing-big-ben-through-smartphone-in-london.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="happy man"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      <section className="py-20 px-10 md:px-40  md:mt-10 bg-gray-50">
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
                🛡️ Asylum & Humanitarian
                <br />
                <span className="text-yellow-500 font-extrabold">
                  Protection
                </span>
              </h2>
              <div className="w-16 h-1 bg-yellow-500"></div>
            </div>

            <p className="text-yellow-500 text-2xl">
              Seeking Safety? We&apos;re Here to Help.
            </p>

            <p className="font-normal text-black">
              If you're fleeing persecution, violence, or serious harm in your
              home country, the UK asylum or humanitarian protection route
              offers a path to safety and stability. We understand how sensitive
              and urgent these situations are, and we&apos;re here to support
              you every step of the way with dignity, respect, and
              confidentiality. Our experienced team offers guidance on preparing
              and submitting your claim, gathering supporting evidence, and
              representing you throughout the process.
            </p>
            <ul className="text-black">
              <p className="font-medium ">Our Services Include:</p>
              <li className="flex items-start space-x-4">
                <IoCheckbox className="flex-shrink-0 text-yellow-600 mt-1" />
                <p>
                  Full assessment of your eligibility for asylum or protection
                </p>
              </li>
              <li className="flex items-start space-x-4">
                <IoCheckbox className="flex-shrink-0 text-yellow-600 mt-1" />
                <p>
                  {" "}
                  Assistance with documentation and country condition evidence
                </p>
              </li>
              <li className="flex items-start space-x-4">
                <IoCheckbox className="flex-shrink-0 text-yellow-600 mt-1" />
                <p>Representation at interviews and hearings</p>
              </li>
              <li className="flex items-start space-x-4">
                <IoCheckbox className="flex-shrink-0 text-yellow-600 mt-1" />
                <p> Ongoing legal and emotional support throughout your case</p>
              </li>
            </ul>
            <p className="text-black">
              Your safety is your right. Your story matters. We&apos;re
              committed to standing with you and helping you find protection in
              the UK.
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
                src="https://images.pexels.com/photos/6646773/pexels-photo-6646773.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="happy man"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
      <section className=" reason-overlay py-20 px-10 md:px-40  md:mt-10 bg-white">
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
                🌍 Other Immigration
                <br />
                <span className="text-yellow-500 font-extrabold">Services</span>
              </h2>
              <div className="w-16 h-1 bg-yellow-500"></div>
            </div>

            <p className="text-yellow-500 text-2xl">
              More Ways We Help You Make the UK Your Home
            </p>

            <p className="font-normal text-black">
              In addition to our core services, we provide a wide range of
              tailored immigration solutions to meet your specific goals and
              circumstances. Whether you're reuniting with family, extending
              your stay, or exploring alternative routes to residency or
              citizenship—we&apos;re here to support you with clarity and care.
            </p>
            <ul className="text-black">
              <p className="font-medium ">Our Other Services Include:</p>
              <li className="flex items-start space-x-4">
                <IoCheckbox className="flex-shrink-0 text-yellow-600 mt-1" />
                <p>
                  Spouse & Family Visas : Reunite and stay with your loved ones
                  in the UK
                </p>
              </li>
              <li className="flex items-start space-x-4">
                <IoCheckbox className="flex-shrink-0 text-yellow-600 mt-1" />
                <p>
                  {" "}
                  Visa Extensions & Appeals : Don&apos;t let your stay be
                  interrupted—get expert support
                </p>
              </li>
              <li className="flex items-start space-x-4">
                <IoCheckbox className="flex-shrink-0 text-yellow-600 mt-1" />
                <p>
                  British Citizenship Applications : Take the final step in
                  making the UK your permanent home
                </p>
              </li>
              <li className="flex items-start space-x-4">
                <IoCheckbox className="flex-shrink-0 text-yellow-600 mt-1" />
                <p>
                  {" "}
                  Refusals & Reapplications: Turn around previous visa setbacks
                  with expert guidance
                </p>
              </li>
            </ul>
            <p className="text-black">
              No matter your journey, we have a solution for you. Let us help
              you navigate every step toward your UK immigration success.
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
                src="https://images.pexels.com/photos/12885861/pexels-photo-12885861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="happy man"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default page;
