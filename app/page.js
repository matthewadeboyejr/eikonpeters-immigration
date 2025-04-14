import About from "@/components/home/About";
import ContactUs from "@/components/home/ContactUs";
import Faq from "@/components/home/Faq";
import FewReasons from "@/components/home/FewReasons";
import Header from "@/components/home/Header";
import HowItWorks from "@/components/home/HowItWorks";

import ServicesSection from "@/components/home/ServiceSection";
import Testimonials from "@/components/home/Testimonials";

export default function Home() {
  return (
    <main className="">
      <Header />
      <About />
      <FewReasons />
      <HowItWorks />
      <ServicesSection />
      <Testimonials />
      <ContactUs />
      <Faq />
    </main>
  );
}
