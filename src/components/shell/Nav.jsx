import { Link, useLocation } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Nav() {
  const { scrollY } = useScroll();
  const bg     = useTransform(scrollY, [0, 80], ["rgba(8,8,10,0)", "rgba(8,8,10,0.75)"]);
  const blur   = useTransform(scrollY, [0, 80], ["blur(0px)", "blur(16px)"]);
  const border = useTransform(scrollY, [0, 80], ["rgba(255,255,255,0)", "rgba(255,255,255,0.06)"]);
  const loc = useLocation();

  return (
    <motion.header
      style={{ backgroundColor: bg, backdropFilter: blur, WebkitBackdropFilter: blur, borderBottom: "1px solid", borderBottomColor: border }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 md:px-8">
        <Link to="/" className="group flex items-center gap-2.5">
          <motion.span
            initial={{ rotate: 0 }}
            whileHover={{ rotate: 45 }}
            transition={{ type: "spring", stiffness: 200, damping: 14 }}
            className="grid h-8 w-8 place-items-center rounded-md bg-gradient-to-br from-ember to-copper text-ink-950"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2 22 20 H 2 Z" fill="currentColor"/></svg>
          </motion.span>
          <span className="font-display text-xl tracking-tight">Forge</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-white/70 md:flex">
          {[
            ["Materials",  "#materials"],
            ["Engineering","#engineering"],
            ["Providers",  "#providers"],
            ["Pricing",    "#pricing"],
          ].map(([label, href]) => (
            <a key={href} href={href} className="relative transition-colors hover:text-bone">
              <span>{label}</span>
              <motion.span layoutId="navhover" className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-bone transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/dashboard" className={`btn ${loc.pathname === "/dashboard" ? "btn-primary" : "btn-ghost"}`}>
            <span>Open Dashboard</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
