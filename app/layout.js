import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/home/Nav";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/* export const metadata = {
  title: "Horizon Immigration | Visa & Relocation Experts",
  description:
    "Trusted immigration consultants for Canada, UK, USA, and Australia visas. Get professional help with work, study, and family immigration.",
}; */

export const metadata = {
  title: "Eikon Immigration | Visa & Relocation Experts",
  description:
    "Trusted immigration consultants for Canada, UK, USA, and Australia visas. Get professional help with work, study, and family immigration.",
  keywords: [
    "immigration consultants",
    "visa help",
    "Canada immigration",
    "UK visa",
    "work permit",
    "study visa",
    "family sponsorship",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body>
        <Nav />
        {children}
      </body>
    </html>
  );
}
