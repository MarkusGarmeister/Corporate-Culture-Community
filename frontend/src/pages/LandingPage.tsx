import { Hero } from "../components/landing/Hero";
import { Features } from "../components/landing/Features";
import { About } from "../components/landing/About";
import { CTA } from "../components/landing/CTA";
import { Footer } from "../components/Footer";
import { Events } from "../components/landing/Events";

export const LandingPage = () => {
  return (
    <>
      <Hero />
      <Features />
      <About />
      <Events />
      <CTA />
      <Footer />
    </>
  );
};
