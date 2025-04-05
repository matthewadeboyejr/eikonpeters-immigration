import About from "@/components/home/About";
import ConsultationSection from "@/components/home/ConsultationSection";
import Faq from "@/components/home/Faq";
import FewReasons from "@/components/home/FewReasons";
import Header from "@/components/home/Header";
import Nav from "@/components/home/Nav";
import HeaderTwo from "@/components/home/Nav";
import ServicesSection from "@/components/home/ServiceSection";
import Testimonials from "@/components/home/Testimonials";
import TrainingSection from "@/components/home/TrainingCertification";
import Image from "next/image";

export default function Home() {
  return (
    <main className="">
      <Header />
      <About />
      <FewReasons />
      <TrainingSection />
      <ServicesSection />
      <Testimonials />
      <ConsultationSection />
      <Faq />
    </main>
  );
}
