import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/home/Nav";
import Footer from "@/components/home/Footer";
import Script from "next/script";

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
      <head>
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-MG7XNLJM');
            `,
          }}
        />
      </head>
      <body>
        <Nav />
        {children}
        <Footer />
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MG7XNLJM"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
      </body>
    </html>
  );
}
