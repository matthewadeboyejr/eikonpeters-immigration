import ContactUs from "@/components/home/ContactUs";
import Faq from "@/components/home/Faq";
import React from "react";

export const metadata = {
  title: "Contact Eikon Immigration | Talk to Our Visa Experts",
  description: "Get in touch with Eikon Immigration consultants. Reach out via email, phone, or WhatsApp for help with UK, Canada, USA, and Australia visas.",
  keywords: ["contact eikon immigration", "book visa consultation", "immigration help phone number", "visa support team"],
};

const page = () => {
  return (
    <div>
      <ContactUs />
      <Faq />
    </div>
  );
};

export default page;
