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
import { useState, useRef } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import emailjs from "@emailjs/browser";
import { fadeInUp } from "../animation/animation";

const ContactUs = () => {
  const [date, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const formRef = useRef();

  // Style Customization Options
  const styles = {
    primaryColor: "#F59E0B",
    secondaryColor: "#3B82F6",
    calendar: {
      borderRadius: "0.5rem",
      borderColor: "#E5E7EB",
      activeDateColor: "#F59E0B",
    },
    timeSelect: {
      borderColor: "#E5E7EB",
      focusRingColor: "#3B82F6",
    },
  };

  // Generate time slots from 9AM to 5PM
  const timeSlots = [];
  for (let hour = 9; hour <= 17; hour++) {
    timeSlots.push(`${hour}:00`);
    if (hour < 17) timeSlots.push(`${hour}:30`);
  }

  const timeFormat = {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
    setShowCalendar(false);
  };

  const serviceID = "service_1zxv8it";
  const businessTemplateID = "template_ztc8eet";
  const publicKey = "7kXv19UEGTBacAU-h";
  const clientTemplateID = "template_4lpxnzg";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formattedDate = date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const currentDate = new Date().toLocaleString("en-US", timeFormat);

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      service: e.target.service.value,
      date: formattedDate,
      time: selectedTime,
      booked_date: currentDate,
      message: e.target.message.value,
      timestamp: Date.now(),
    };

    try {
      await emailjs.send(serviceID, businessTemplateID, formData, publicKey);
      await emailjs.send(serviceID, clientTemplateID, formData, publicKey);

      setSubmitStatus("success");
      formRef.current.reset();
      setDate(new Date());
      setSelectedTime("");
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <section className="contact-overlay py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}

          <motion.div variants={fadeInUp} className="space-y-8">
            <div className="space-y-2 mb-4">
              <p className="text-sm opacity-50 tracking-wide">
                CONTACT WITH US
              </p>
              <h2 className="h2 text-4xl font-bold leading-snug">
                Want to Connect With{" "}
                <span className="text-yellow-500 font-extrabold">
                  Our Team?
                </span>
              </h2>
              <div className="w-16 h-1 bg-yellow-500"></div>
            </div>

            <p className="font-semibold">
              Schedule a free callback, and one of our team members will connect
              with you to discuss your requirements and assess your case.
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
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              {/* Service Selection */}
              <div>
                <label htmlFor="service" className="block text-gray-700 mb-2">
                  Service Needed
                </label>
                <select
                  id="service"
                  name="service"
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

              {/* Calendar Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <label htmlFor="date" className="block text-gray-700 mb-2">
                    Preferred Date
                  </label>
                  <div
                    className="flex items-center border border-gray-300 rounded-lg px-4 py-3 cursor-pointer"
                    onClick={() => setShowCalendar(!showCalendar)}
                    style={{ borderColor: styles.calendar.borderColor }}
                  >
                    <FaCalendarAlt className="text-gray-400 mr-2" />
                    <span>{date.toLocaleDateString()}</span>
                  </div>

                  {showCalendar && (
                    <div className="absolute z-10 mt-1 bg-white p-4 rounded-lg shadow-lg border border-gray-200">
                      <Calendar
                        onChange={handleDateChange}
                        value={date}
                        minDate={new Date()}
                        className="border-none"
                        tileClassName={({ date: calendarDate }) =>
                          calendarDate.toDateString() === date.toDateString()
                            ? "bg-amber-500 text-white rounded-full"
                            : null
                        }
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="time" className="block text-gray-700 mb-2">
                    Preferred Time
                  </label>
                  <select
                    id="time"
                    name="time"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    required
                    style={{
                      borderColor: styles.timeSelect.borderColor,
                      "--tw-ring-color": styles.timeSelect.focusRingColor,
                    }}
                  >
                    <option value="">Select time</option>
                    {timeSlots.map((time) => (
                      <option key={time} value={time}>
                        {parseInt(time.split(":")[0]) >= 12
                          ? `${
                              parseInt(time.split(":")[0]) === 12
                                ? 12
                                : parseInt(time.split(":")[0]) - 12
                            }:${time.split(":")[1]} PM`
                          : `${time} AM`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Availability Tracker */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-2">
                  Selected Appointment
                </h4>
                {date && selectedTime ? (
                  <p className="text-blue-600">
                    {date.toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}{" "}
                    at {selectedTime}
                  </p>
                ) : (
                  <p className="text-gray-500">Please select date and time</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-700 mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="Tell us about your immigration needs..."
                ></textarea>
              </div>

              {submitStatus === "success" && (
                <div className="bg-green-100 text-green-800 p-3 rounded-lg">
                  Thank you! We've received your request and will contact you
                  shortly.
                </div>
              )}
              {submitStatus === "error" && (
                <div className="bg-red-100 text-red-800 p-3 rounded-lg">
                  Something went wrong. Please try again or contact us directly.
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 px-6 rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                style={{ backgroundColor: styles.primaryColor }}
              >
                {isSubmitting ? "Sending..." : "Book Consultation Now"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
