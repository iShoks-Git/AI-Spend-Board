import { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useLenis } from "./lib/useLenis.js";
import Nav from "./components/shell/Nav.jsx";
import Footer from "./components/shell/Footer.jsx";
import Landing from "./pages/Landing.jsx";
const DashboardPage = lazy(() => import("./pages/DashboardPage.jsx"));

export default function App() {
  const location = useLocation();
  useLenis();

  return (
    <div className="relative min-h-screen overflow-x-clip">
      <Nav />
      <AnimatePresence mode="wait">
        <Suspense fallback={<div className="grid min-h-[60vh] place-items-center text-white/40 text-xs uppercase tracking-[0.25em]">Loading instrument…</div>}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="*" element={<Landing />} />
          </Routes>
        </Suspense>
      </AnimatePresence>
      <Footer />
    </div>
  );
}
