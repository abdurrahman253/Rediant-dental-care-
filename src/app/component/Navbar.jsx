"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShieldCheck, Calendar } from "lucide-react";
import Logo from "./logo";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Doctors", href: "#doctors" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navLinks.map((l) => l.href.replace("#", ""));
      const pos = window.scrollY + 150;

      for (const s of sections) {
        const el = document.getElementById(s);
        if (el) {
          const { offsetTop, offsetHeight } = el;
          if (pos >= offsetTop && pos < offsetTop + offsetHeight) {
            setActive(s);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href) => {
    const id = href.replace("#", "");
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 ${
          scrolled ? "py-3" : "py-6"
        }`}
      >
        <div 
          className={`max-w-7xl mx-auto transition-all duration-500 rounded-[24px] px-6 flex items-center justify-between ${
            scrolled 
              ? "bg-white/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/20 py-3" 
              : "bg-transparent py-0"
          }`}
        >
          {/* Logo Section */}
          <div className="flex items-center gap-8">
            <button onClick={() => scrollTo("#home")} className="transition hover:opacity-80">
              <Logo variant="color" size="sm" />
            </button>

            {/* Desktop Navigation */}
            <div className="items-center hidden gap-1 lg:flex">
              {navLinks.map((l) => {
                const isActive = active === l.href.replace("#", "");
                return (
                  <button
                    key={l.href}
                    onClick={() => scrollTo(l.href)}
                    className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                      isActive ? "text-teal-600" : "text-slate-600 hover:text-teal-500"
                    }`}
                  >
                    {l.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute bottom-0 left-2 right-2 h-0.5 bg-teal-600 rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Section */}
          <div className="flex items-center gap-3">
            <div className="flex-col items-end hidden mr-4 md:flex">
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Emergency?</span>
              <a href="tel:+8801777678707" className="text-sm font-semibold transition text-slate-900 hover:text-teal-600">
                (880) 1777-678707
              </a>
            </div>

            <button
              onClick={() => scrollTo("#contact")}
              className="hidden sm:flex items-center gap-2 px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-full font-medium shadow-lg shadow-teal-600/20 transition-all active:scale-95"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>

            {/* Mobile Toggle */}
            <button
              onClick={() => setOpen(!open)}
              className="p-2.5 rounded-full lg:hidden bg-slate-100 text-slate-600 hover:bg-teal-50 hover:text-teal-600 transition"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="absolute top-24 left-6 right-6 p-6 bg-white rounded-[32px] shadow-2xl border border-slate-100 lg:hidden"
            >
              <div className="grid gap-2">
                {navLinks.map((l) => (
                  <button
                    key={l.href}
                    onClick={() => scrollTo(l.href)}
                    className="flex items-center justify-between w-full px-5 py-4 font-medium text-left transition text-slate-700 hover:bg-teal-50 hover:text-teal-600 rounded-2xl"
                  >
                    {l.label}
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-50">
                       <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                    </div>
                  </button>
                ))}
              </div>
              
              <button className="flex items-center justify-center w-full gap-2 py-4 mt-6 font-bold text-white bg-teal-600 shadow-xl rounded-2xl shadow-teal-600/20">
                <Calendar className="w-5 h-5" />
                Book Now
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}