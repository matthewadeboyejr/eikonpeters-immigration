"use client";

import { motion } from "framer-motion";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
} from "react-icons/fa";
import { RiGlobalLine } from "react-icons/ri";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const ConsultationSection = () => {
  return (
    <section className=" contact-overlay py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div variants={fadeInUp} className="space-y-8">
            <div className="space-y-2 mb-4">
              <p className="text-sm opacity-50 tracking-wide">
                CONTACT WITH US
              </p>
              <h2 className="h2 text-4xl font-bold leading-snug">
                Book your
                <span className="text-yellow-500 font-extrabold">
                  {" "}
                  consultation
                </span>
              </h2>
              <div className="w-16 h-1 bg-yellow-500"></div>
            </div>

            <p className="font-semibold">
              We are dedicated to making your immigration journey as smooth and
              stress-free as possible.
            </p>

            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="text-yellow-500 text-3xl">
                  <RiGlobalLine />
                </div>
                <div>
                  <p className="text-xl font-bold">Best Immigration Services</p>
                  <p className="font-semibold text-sm">
                    We provide expert immigration services with a personal
                    touch.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Consultation Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 rounded-lg shadow-sm"
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="+1 (___) ___-____"
                  />
                </div>
                <div>
                  <label htmlFor="service" className="block text-gray-700 mb-2">
                    Service Needed
                  </label>
                  <select
                    id="service"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  >
                    <option value="">Select a service</option>
                    <option value="family-visa">Family Visa</option>
                    <option value="student-visa">Student Visa</option>
                    <option value="work-visa">Work Visa</option>
                    <option value="business-visa">Business Visa</option>
                    <option value="tourist-visa">Tourist Visa</option>
                  </select>
                </div>
              </div> */}

              {/*   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="date" className="block text-gray-700 mb-2">
                    Preferred Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      id="date"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition pr-10"
                    />
                    <FaCalendarAlt className="absolute right-3 top-3.5 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label htmlFor="time" className="block text-gray-700 mb-2">
                    Preferred Time
                  </label>
                  <select
                    id="time"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  >
                    <option value="">Select time</option>
                    <option value="09:00">09:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="13:00">01:00 PM</option>
                    <option value="14:00">02:00 PM</option>
                    <option value="15:00">03:00 PM</option>
                    <option value="16:00">04:00 PM</option>
                  </select>
                </div>
              </div> */}

              <div>
                <label htmlFor="message" className="block text-gray-700 mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="Tell us about your immigration needs..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="primary-btn w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                Book Consultation Now
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ConsultationSection;
