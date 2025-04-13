import { motion } from "framer-motion";
import { FaCalendarAlt, FaCheck, FaUserGraduate } from "react-icons/fa";
import { IoCheckbox } from "react-icons/io5";
import { fadeInUp, staggerContainer } from "../animation/animation";

const BusinessLicense = () => {
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
              📄 UK Business License <br />
              <span className="text-yellow-500 font-extrabold">Support </span>
            </h2>
            <div className="w-16 h-1 bg-yellow-500"></div>
          </div>

          <p className="text-yellow-500 text-2xl">
            Lay the Right Foundations for Your UK Business
          </p>

          <p className="font-normal text-black">
            Starting a business in the UK? Whether you&apos;re setting up a
            consultancy, importing goods, or launching an online brand, having
            the right structure and licenses is key to long-term success. At
            Eikon Peters Immigration Services Ltd, we support
            entrepreneurs—especially those relocating to the UK—as they navigate
            the early stages of setting up a business. While we don&apos;t
            directly advise on licensing or regulatory compliance, we connect
            our clients with trusted professionals who do.
          </p>
          <ul className="text-black">
            <p className="font-medium ">What we offer</p>
            <li className="flex items-start space-x-4">
              <IoCheckbox className="flex-shrink-0 text-yellow-600 mt-1" />
              <p>General guidance on UK business setup and immigration links</p>
            </li>
            <li className="flex items-start space-x-4">
              <IoCheckbox className="flex-shrink-0 text-yellow-600 mt-1" />
              <p>Referrals to qualified business and legal professionals</p>
            </li>
            <li className="flex items-start space-x-4">
              <IoCheckbox className="flex-shrink-0 text-yellow-600 mt-1" />
              <p>
                Immigration support within the scope of our OISC Level 1
                authorisation
              </p>
            </li>
            <li className="flex items-start space-x-4">
              <IoCheckbox className="flex-shrink-0 text-yellow-600 mt-1" />
              <p>
                Insights on how your business setup might impact your
                immigration application
              </p>
            </li>
          </ul>
          <p className="text-black border-y py-4">
            <span className="font-bold">
              Please note: As a registered IAA Level 1 Organisation
            </span>
            , we do not provide immigration advice or assistance on the UK
            Business License Visa directly. However, we work in partnership with
            qualified immigration professionals who are authorised to assist at
            Level 2 or 3.
          </p>
          <p className="text-black">
            Let&apos;s get you started—confidently and compliantly.
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
  );
};

export default BusinessLicense;
