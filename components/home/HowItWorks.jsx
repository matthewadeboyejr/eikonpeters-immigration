"use client";
import { FaRoute, FaTools, FaPaperPlane, FaHeadset } from "react-icons/fa";
import { motion } from "framer-motion";
import BookButton, { Button } from "../basic-setup/Button";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaRoute className="text-3xl text-blue-600" />,
      title: "Personalized Roadmap",
      description:
        "Start with a consultation where we listen to your needs and provide a step-by-step plan tailored to your specific goals. You will know exactly what to expect at every stage.",

      bgColor: "bg-blue-50",
    },
    {
      icon: <FaTools className="text-3xl text-green-600" />,
      title: "We Get to Work",
      description:
        "Our team takes care of the heavy lifting—gathering documents, writing legal arguments, completing forms, and ensuring everything meets the Home Office's strict requirements.",

      bgColor: "bg-green-50",
    },
    {
      icon: <FaPaperPlane className="text-3xl text-purple-600" />,
      title: "Submit & Support",
      description:
        "We will submit your application and monitor its progress. If the Home Office requires any additional information, we will notify you immediately, assist you in responding promptly, and work to maximise the chances of a positive outcome.",

      bgColor: "bg-purple-50",
    },
  ];

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="space-y-2 mb-12 flex flex-col justify-center items-center text-center w-full"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/*   <p className="text-sm sm:text-base text-gray-600">
            COUNTRIES YOU CAN VISIT
          </p> */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-snug">
            How it works?
          </h2>
          <div className="w-12 h-1 bg-yellow-500 mt-2"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`${step.bgColor} rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col`}
            >
              <div className="flex items-center mb-4">
                <div className="bg-white p-3 rounded-full shadow-sm mr-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  {step.title}
                </h3>
              </div>
              <p className="text-gray-600 mb-4 flex-grow">{step.description}</p>
              <div className="text-2xl mt-auto pt-4 border-t border-white/30">
                {step.visual}
              </div>
              <div className="flex justify-center mt-4">
                <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block ml-2 text-gray-400">→</div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-16 bg-white rounded-xl p-8 shadow-sm text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Begin Your Journey?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our step-by-step process takes the stress out of immigration. Know
            exactly what to expect at every stage.
          </p>

          <Button
            title={"Book Consultation"}
            style={"primary-btn"}
            route={"https://forms.gle/SdekGucyTiim16Yh6"}
            viewicon={"hidden"}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
