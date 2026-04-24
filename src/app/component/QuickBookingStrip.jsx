"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import toast from "react-hot-toast";
import { CalendarDays, Sparkles, ArrowRight, User, Phone, Zap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  "Teeth Cleaning",
  "Dental Fillings",
  "Root Canal",
  "Teeth Whitening",
  "Braces / Invisalign",
  "Dental Implants",
];

export default function QuickBookingStrip() {
  const [form, setForm] = useState({ name: "", phone: "", service: "" });
  const containerRef = useRef(null);

  useEffect(() => {
    // GSAP Entrance: Subtle expansion and blur-to-clear effect
    gsap.fromTo(
      containerRef.current,
      { 
        width: "80%", 
        opacity: 0, 
        filter: "blur(10px)" 
      },
      {
        width: "100%",
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.5,
        ease: "expo.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 95%",
        },
      }
    );
  }, []);

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) return toast.error("Details required");
    toast.success("We'll call you shortly!");
    setForm({ name: "", phone: "", service: "" });
  };

  return (
    <section className="relative z-20 px-4 mt-10 md:mt-14 lg:mt-16" ref={containerRef}>
      <div className="max-w-6xl mx-auto">
        <div className="relative group">
          {/* Animated Glow Backdrop */}
          <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-[3rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          
          <div className="relative bg-white/80 backdrop-blur-3xl border border-white/50 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] rounded-[2.5rem] overflow-hidden">
            <form onSubmit={submit} className="flex flex-col items-center gap-2 p-2 lg:flex-row lg:p-3">
              
              {/* Badge/Title Section */}
              <div className="flex items-center gap-4 px-6 py-3 lg:border-r border-slate-100 min-w-max">
                <div className="relative">
                  <div className="absolute inset-0 bg-teal-400 rounded-full animate-ping opacity-20"></div>
                  <div className="relative p-3 text-white bg-teal-600 shadow-lg rounded-2xl">
                    <Zap className="w-5 h-5 fill-current" />
                  </div>
                </div>
                <div className="hidden sm:block">
                  <p className="text-[10px] font-bold text-teal-600 uppercase tracking-[0.2em] leading-none mb-1">Express</p>
                  <h4 className="text-sm font-black tracking-tight uppercase text-slate-800">Booking</h4>
                </div>
              </div>

              {/* Interactive Inputs */}
              <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-3 lg:px-4">
                
                {/* Name Input */}
                <div className="relative flex items-center group/input">
                  <User className="absolute w-4 h-4 transition-colors left-4 text-slate-400 group-focus-within/input:text-teal-500" />
                  <input
                    type="text"
                    placeholder="Patient Name"
                    className="w-full py-4 pr-4 text-sm font-medium transition-all border-transparent outline-none pl-11 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-teal-500/20 rounded-2xl"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>

                {/* Phone Input */}
                <div className="relative flex items-center group/input">
                  <Phone className="absolute w-4 h-4 transition-colors left-4 text-slate-400 group-focus-within/input:text-teal-500" />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full py-4 pr-4 text-sm font-medium transition-all border-transparent outline-none pl-11 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-teal-500/20 rounded-2xl"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>

                {/* Service Select */}
                <div className="relative flex items-center group/input">
                  <CalendarDays className="absolute w-4 h-4 transition-colors left-4 text-slate-400 group-focus-within/input:text-teal-500" />
                  <select
                    className="w-full py-4 pr-4 text-sm font-medium transition-all border-transparent outline-none appearance-none cursor-pointer pl-11 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-teal-500/20 rounded-2xl text-slate-600"
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                  >
                    <option value="">Choose Service</option>
                    {services.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full lg:w-auto px-8 py-4 bg-slate-900 hover:bg-teal-600 text-white rounded-[1.5rem] font-bold text-sm flex items-center justify-center gap-3 transition-colors duration-500 group/btn shadow-xl shadow-slate-900/10"
              >
                <span>Reserve Now</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
              </motion.button>
            </form>
          </div>
        </div>

        {/* Floating Trust Indicator */}
        <div className="flex justify-center mt-6">
          <div className="flex items-center gap-2 px-4 py-2 border rounded-full shadow-sm bg-white/50 border-white/80">
            <Sparkles className="w-3 h-3 text-teal-500" />
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              Join 500+ satisfied patients this month
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}