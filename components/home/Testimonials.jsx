"use client";
import { motion } from "framer-motion";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";

const Testimonials = () => {
  const reviews = [
    {
      quote:
        "The team provided excellent service throughout my visa application process. Everything was handled professionally.",
      author: "Robert Johnson",
      role: "Business Visa Client",
      rating: 5,
    },
    {
      quote:
        "I got my student visa approved in just 3 weeks! Their guidance was invaluable for my documents preparation.",
      author: "Sarah Williams",
      role: "Student Visa Client",
      rating: 5,
    },
    {
      quote:
        "Our family reunion was made possible thanks to their expertise. Highly recommend their services.",
      author: "Michael Brown",
      role: "Family Visa Client",
      rating: 4,
    },
    {
      quote:
        "Fast and efficient service. They made the complex immigration process seem simple.",
      author: "Emily Davis",
      role: "Work Visa Client",
      rating: 5,
    },
    {
      quote:
        "Professional team that guided me through every step. My visa was approved without any issues.",
      author: "David Wilson",
      role: "Investor Visa Client",
      rating: 5,
    },
    {
      quote:
        "Exceptional service! They went above and beyond to help with my spouse&apos;s visa application.",
      author: "Jennifer Lee",
      role: "Family Visa Client",
      rating: 5,
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const intervalRef = useRef(null);

  // Auto-scroll functionality
  useEffect(() => {
    const startAutoScroll = () => {
      intervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % Math.ceil(reviews.length / 3));
      }, 5000);
    };

    startAutoScroll();
    return () => clearInterval(intervalRef.current);
  }, [reviews.length]);

  const handleDotClick = (index) => {
    setActiveIndex(index);
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % Math.ceil(reviews.length / 3));
    }, 5000);
  };

  // Calculate visible reviews based on activeIndex
  const visibleReviews = reviews.slice(activeIndex * 3, activeIndex * 3 + 3);

  return (
    <section className="review-overlay  py-20 px-4 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="space-y-2 mb-12 flex flex-col justify-center items-center text-center w-full"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-sm sm:text-base text-white">OUR TESTIMONIALS</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-snug text-white">
            What they’re talking about
            <br />
            the
            <span className="text-yellow-500 font-extrabold"> consultancy</span>
          </h2>
          <div className="w-12 h-1 bg-yellow-500 mt-2"></div>
        </motion.div>

        {/* Review Cards Container */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
        >
          {visibleReviews.map((review, index) => (
            <motion.div
              key={`${activeIndex}-${index}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow h-full"
            >
              <div className="flex justify-between items-start mb-6">
                <FaQuoteLeft className="text-3xl text-blue-100" />
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`text-lg ${
                        i < review.rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <p className="text-gray-600 mb-8">{review.quote}</p>

              <div className="border-t pt-6">
                <h4 className="font-semibold text-gray-900">{review.author}</h4>
                <p className="text-sm text-gray-500">{review.role}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Navigation Dots */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center mt-4 space-x-2"
        >
          {[...Array(Math.ceil(reviews.length / 3))].map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === activeIndex ? "bg-blue-600 w-6" : "bg-gray-300"
              }`}
              aria-label={`Go to review set ${index + 1}`}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
