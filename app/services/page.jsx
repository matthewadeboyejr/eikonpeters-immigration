"use client";
import Breadcrumb from "@/components/basic-setup/Breadcrumb";
import BookButton from "@/components/basic-setup/Button";
import Asylum from "@/components/services/Asylum";
import BusinessLicense from "@/components/services/BusinessLicense";
import GlobalTalent from "@/components/services/GlobalTalent";
import Others from "@/components/services/Others";
import SelfSponsorship from "@/components/services/SelfSponsorship";
import Student from "@/components/services/Student";
import Visitor from "@/components/services/Visitor";
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
      <GlobalTalent />
      <SelfSponsorship />
      <BusinessLicense />
      <Student />
      <Visitor />
      <Asylum />
      <Others />
    </div>
  );
};

export default page;
