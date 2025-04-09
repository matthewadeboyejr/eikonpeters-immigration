import { motion } from "framer-motion";
import { FaCalendarAlt, FaCheck, FaUserGraduate } from "react-icons/fa";
import { IoCheckbox } from "react-icons/io5";
import { fadeInUp, staggerContainer } from "../animation/animation";
import BookButton from "../basic-setup/Button";

const Student = () => {
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
            postgraduate, or specialized courses, we provide all the support you
            need to make your journey seamless and stress-free. From choosing
            the right school to preparing your visa application, we walk you
            through every stage with expert guidance and care.
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
            Get it right from the start. Study with peace of mind. Let us handle
            the details—so you can focus on your academic goals.
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
              src="https://images.pexels.com/photos/31513417/pexels-photo-31513417/free-photo-of-graduates-celebrating-in-ceremony-attire.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="happy man"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Student;
