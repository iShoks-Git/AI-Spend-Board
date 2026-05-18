import { motion } from "framer-motion";
import Dashboard from "../components/dashboard/Dashboard.jsx";

export default function DashboardPage() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="relative pt-12"
    >
      <Dashboard />
    </motion.main>
  );
}
