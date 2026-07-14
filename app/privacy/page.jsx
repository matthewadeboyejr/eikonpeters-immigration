"use client";

import React from "react";
import { motion } from "framer-motion";
import Breadcrumb from "@/components/basic-setup/Breadcrumb";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function PrivacyPolicy() {
  return (
    <div className="bg-white min-h-screen">
      {/* Header Banner */}
      <section className="bg-gray-900 pt-32 pb-16 px-6 md:px-20 lg:px-40">
        <div className="max-w-4xl mx-auto">
          <Breadcrumb prevPage="Home" currentPage="Privacy Policy" />
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-extrabold text-white mt-4"
          >
            Privacy &amp; Data Protection Policy
          </motion.h1>
          <div className="w-16 h-1 bg-yellow-500 mt-4 rounded-full"></div>
          <p className="text-gray-400 text-sm mt-3 font-semibold">
            Last Updated: {new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })}
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16 px-6 md:px-20 lg:px-40">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInUp}
          className="max-w-4xl mx-auto prose prose-lg prose-yellow text-gray-700"
        >
          <p className="lead font-medium text-lg text-gray-600 mb-8">
            At Eikon Peters Immigration Services, we take your privacy and data security seriously. This privacy policy explains how we collect, process, secure, and use the information you share with us when navigating our website and portals.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">1. Information We Collect</h2>
          <p>
            We only collect personal information that is necessary to deliver our services, process callback consultation requests, or send newsletter updates. This includes:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Consultation Requests:</strong> Your name, email address, phone number, and details regarding your visa or immigration query.</li>
            <li><strong>Newsletter &amp; Guide Downloads:</strong> Your email address, used to deliver newsletter campaigns and welcome resources.</li>
            <li><strong>Web Traffic Analytics:</strong> Anonymous usage patterns (page views, session durations, device types, and general country locations) captured via Google Analytics.</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">2. How We Use Your Data</h2>
          <p>
            Your information is processed transparently and lawfully. We utilize the gathered data to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Schedule, verify, and complete consultation calls.</li>
            <li>Register you as a newsletter subscriber and deliver visa policy updates.</li>
            <li>Optimize site speeds, layouts, and popular guides using aggregated traffic analytics.</li>
            <li>Meet statutory compliance and regulation standards set by governing immigration authorities.</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">3. Data Sharing &amp; Third-Party Services</h2>
          <p>
            We do <strong>not</strong> sell, rent, or trade your personal data. To provide a seamless digital portal, we partner with trusted, secure cloud services who adhere to strict data protection standards:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Supabase:</strong> Secure database storage for lead captures, administrative guides, and user logs.</li>
            <li><strong>Brevo:</strong> Secure transactional and newsletter delivery platform used to dispatch consultation details and updates.</li>
            <li><strong>Google Analytics / Tag Manager:</strong> Traffic measurement and event tracking for optimization purposes.</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">4. Security Measures</h2>
          <p>
            We implement comprehensive technical and organizational safeguards to protect your personal information against unauthorized access, loss, modification, or exposure. All communication between your browser and our platform is encrypted using Secure Socket Layer (SSL) certificates.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">5. Cookies &amp; Tracking</h2>
          <p>
            Our website uses cookies to remember user sessions, capture anonymous traffic patterns via Google Analytics, and run Appointlet booking modules. You can configure your browser settings to reject cookies, though some features (such as appointment scheduling) may function incorrectly.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">6. Your Rights</h2>
          <p>
            You hold full ownership of your personal data. You have the right to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Request a copy of the personal information we hold on file.</li>
            <li>Correct or update inaccurate information.</li>
            <li>Request the permanent erasure of your lead profiles or email subscriptions.</li>
            <li>Unsubscribe from email campaigns at any time using the link in the footer or by contacting us.</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">7. Contact Information</h2>
          <p>
            If you have questions about this policy, wish to update your data, or would like to request file deletion, please contact us:
          </p>
          <p className="bg-gray-50 border border-gray-100 rounded-2xl p-6 font-semibold text-gray-800">
            Email: <a href="mailto:info@eikonpetersimmigration.com" className="text-yellow-600 hover:text-yellow-700 transition-colors">info@eikonpetersimmigration.com</a><br />
            Consultation Scope: Regulated level 1 visa pathways
          </p>
        </motion.div>
      </section>
    </div>
  );
}
