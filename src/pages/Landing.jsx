import { motion } from "framer-motion";
import Hero        from "../components/landing/Hero.jsx";
import Marquee     from "../components/landing/Marquee.jsx";
import Sculpture   from "../components/landing/Sculpture.jsx";
import Materials   from "../components/landing/Materials.jsx";
import Engineering from "../components/landing/Engineering.jsx";
import Providers   from "../components/landing/Providers.jsx";
import Numbers     from "../components/landing/Numbers.jsx";
import CTA         from "../components/landing/CTA.jsx";

export default function Landing() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      <Hero />
      <Marquee />
      <Sculpture />
      <Materials />
      <Engineering />
      <Providers />
      <Numbers />
      <CTA />
    </motion.main>
  );
}
