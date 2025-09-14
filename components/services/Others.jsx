import { motion } from "framer-motion";
import { FaCalendarAlt, FaCheck, FaUserGraduate } from "react-icons/fa";
import { IoCheckbox } from "react-icons/io5";
import { fadeInUp, staggerContainer } from "../animation/animation";
import BookButton from "../basic-setup/Button";

const Others = () => {
  return (
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
            circumstances. Whether you're reuniting with family, extending your
            stay, or exploring alternative routes to residency or
            citizenship—we&apos;re here to support you with clarity and care.
          </p>
          <ul className="text-black">
            <p className="font-medium ">Our Other Services Include:</p>
            <li className="flex items-start space-x-4">
              <IoCheckbox className="flex-shrink-0 text-yellow-600 mt-1" />
              <p>
                Spouse & Family Visas - Support with straightforward
                applications to reunite with loved ones in the UK
              </p>
            </li>
            <li className="flex items-start space-x-4">
              <IoCheckbox className="flex-shrink-0 text-yellow-600 mt-1" />
              <p>
                Visa Extensions - Help with applying to extend your lawful stay
                in the UK where the circumstances are clear
              </p>
            </li>
            <li className="flex items-start space-x-4">
              <IoCheckbox className="flex-shrink-0 text-yellow-600 mt-1" />
              <p>
                British Citizenship - Guidance on straightforward naturalisation
                and registration applications
              </p>
            </li>
            <li className="flex items-start space-x-4">
              <IoCheckbox className="flex-shrink-0 text-yellow-600 mt-1" />
              <p>
                Refusals & Reapplications - Assistance with simple
                reapplications where no appeal or complex legal argument is
                required
              </p>
            </li>
          </ul>
          <p className="text-black">
            No matter your journey, we have a solution for you. Let us help you
            navigate every step toward your UK immigration success.
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
              src="https://images.pexels.com/photos/12885861/pexels-photo-12885861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="happy man"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Others;
