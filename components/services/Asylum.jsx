import { motion } from "framer-motion";
import { FaCalendarAlt, FaCheck, FaUserGraduate } from "react-icons/fa";
import { IoCheckbox } from "react-icons/io5";
import { fadeInUp, staggerContainer } from "../animation/animation";
import BookButton from "../basic-setup/Button";

const Asylum = () => {
  return (
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
              <span className="text-yellow-500 font-extrabold">Protection</span>
            </h2>
            <div className="w-16 h-1 bg-yellow-500"></div>
          </div>

          <p className="text-yellow-500 text-2xl">
            Seeking Safety? We&apos;re Here to Help.
          </p>

          <p className="font-normal text-black">
            If you are fleeing persecution, violence, or serious harm in your
            home country, you may be eligible to seek protection in the UK
            through the asylum or humanitarian protection process. While Eikon
            Peters Immigration Services Ltd is not authorised to advise directly
            on these types of complex matters, we work closely with trusted and
            qualified legal partners who are fully authorised to support clients
            at this level.
          </p>
          <ul className="text-black">
            <p className="font-medium ">What We Offer</p>
            <li className="flex items-start space-x-4">
              <IoCheckbox className="flex-shrink-0 text-yellow-600 mt-1" />
              <p>General information on available protection routes</p>
            </li>
            <li className="flex items-start space-x-4">
              <IoCheckbox className="flex-shrink-0 text-yellow-600 mt-1" />
              <p>
                {" "}
                Referral to specialist legal advisers authorised to handle
                asylum and humanitarian protection cases
              </p>
            </li>
            <li className="flex items-start space-x-4">
              <IoCheckbox className="flex-shrink-0 text-yellow-600 mt-1" />
              <p>Guidance on how to prepare for your initial consultation</p>
            </li>
          </ul>
          <p className="text-black border-y py-4">
            At
            <span className="font-bold">
              Eikon Peters Immigration Services Ltd
            </span>
            , we are registered with the Immigration Advice Authority to provide
            immigration advice and services at Level 1 only. All matters beyond
            our regulatory scope, including asylum and humanitarian protection,
            are referred to suitably regulated professionals.
          </p>
          <p className="text-black">
            Your safety matters. Your case deserves expert support. Let us help
            you get the right advice from those fully qualified to provide it.
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
              src="https://images.pexels.com/photos/6646773/pexels-photo-6646773.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="happy man"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Asylum;
