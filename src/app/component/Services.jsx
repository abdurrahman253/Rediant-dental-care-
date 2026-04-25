"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Layers,
  Sparkles,
  Activity,
  ScanLine,
  Wrench,
  Wind,
  Crown,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { services } from "@/data/services";

// Icon map for dynamic rendering
const iconMap = {
  ShieldCheck,
  Layers,
  Sparkles,
  Activity,
  ScanLine,
  Wrench,
  Wind,
  Crown,
};

// Stagger container variants
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 48, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

function ServiceCard({ service, index }) {
  const IconComponent = iconMap[service.icon] || ShieldCheck;

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative group"
    >
      {/* Gradient border glow on hover */}
      <div
        className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"
        style={{
          background: `linear-gradient(135deg, ${
            service.glowColor.replace("0.3", "0.8")
          }, transparent)`,
        }}
      />

      {/* Card */}
      <div className="relative h-full flex flex-col bg-white/80 backdrop-blur-xl border border-white/60 rounded-2xl p-7 shadow-[0_4px_24px_rgba(0,0,0,0.06)] group-hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] transition-all duration-500 overflow-hidden">
        
        {/* Subtle background gradient on hover */}
        <div
          className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100 rounded-2xl"
          style={{
            background: `radial-gradient(circle at top right, ${service.glowColor.replace("0.3", "0.06")}, transparent 60%)`,
          }}
        />

        {/* Top stripe accent */}
        <div
          className={`absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        />

        {/* Icon */}
        <div className="relative mb-5">
          <div
            className="flex items-center justify-center transition-shadow duration-300 shadow-lg w-14 h-14 rounded-xl group-hover:shadow-xl"
           style={{ background: service.gradientStyle }}
          >
            <motion.div
              whileHover={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.4 }}
            >
              <IconComponent className="text-white w-7 h-7" strokeWidth={1.75} />
            </motion.div>
          </div>
          {/* Floating index number */}
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-slate-100 text-slate-400 text-[10px] font-bold rounded-full flex items-center justify-center">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Content */}
        <div className="relative flex flex-col flex-1">
          <h3 className="text-[1.05rem] font-bold text-slate-800 mb-2.5 tracking-tight group-hover:text-teal-700 transition-colors duration-300">
            {service.title}
          </h3>
          <p className="flex-1 mb-5 text-sm leading-relaxed text-slate-500">
            {service.shortDesc}
          </p>

          {/* CTA */}
          <Link
            href={`/services/${service.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-600 group/link"
          >
            <span className="relative">
              View Details
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-teal-500 group-hover/link:w-full transition-all duration-300" />
            </span>
            <motion.div
              className="flex items-center"
              initial={{ x: 0 }}
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-1" />
            </motion.div>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function ServicesSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative overflow-hidden py-28"
      style={{
        background:
          "linear-gradient(180deg, #f0fdfa 0%, #f8fafc 50%, #f0f9ff 100%)",
      }}
    >
      {/* Decorative blobs */}
      <div
        className="absolute top-0 rounded-full pointer-events-none left-1/4 w-96 h-96 opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(20,184,166,0.18) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute right-0 rounded-full pointer-events-none bottom-16 w-80 h-80 opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(56,189,248,0.25) 0%, transparent 70%)",
          filter: "blur(48px)",
        }}
      />
      <div
        className="absolute left-0 w-64 h-64 rounded-full pointer-events-none top-1/2 opacity-15"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(15,118,110,1) 1px, transparent 1px), linear-gradient(90deg, rgba(15,118,110,1) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        
        {/* ── Section Header ── */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="mb-16 text-center lg:mb-20"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-5">
            <div className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-teal-600 bg-teal-50 border border-teal-100 px-4 py-1.5 rounded-full">
              Why Choose Us
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
          </div>

          {/* Title */}
          <h2
            className="mb-5 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            <span className="text-slate-900">Our Premium </span>
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #0f766e 0%, #0ea5e9 60%, #0d9488 100%)",
              }}
            >
              Services
            </span>
          </h2>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-lg leading-relaxed text-slate-500">
            World-class dental care delivered with precision, compassion, and the
            most advanced technology available — tailored entirely to you.
          </p>

          {/* Decorative line */}
          <motion.div
            className="flex items-center justify-center gap-3 mt-8"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
          >
            <div className="w-24 h-px bg-gradient-to-r from-transparent to-teal-400" />
            <div className="w-2 h-2 bg-teal-400 rounded-full" />
            <div className="w-24 h-px bg-gradient-to-l from-transparent to-teal-400" />
          </motion.div>
        </motion.div>

        {/* ── Services Grid ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-6"
        >
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </motion.div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-center mt-14"
        >
          <Link
            href="/services"
            className="group inline-flex items-center gap-2.5 bg-gradient-to-r from-teal-600 to-cyan-500 hover:from-teal-700 hover:to-cyan-600 text-white font-semibold px-8 py-4 rounded-full shadow-lg shadow-teal-500/25 hover:shadow-xl hover:shadow-teal-500/30 transition-all duration-300 text-sm tracking-wide"
          >
            Explore All Services
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>

          <p className="mt-4 text-sm text-slate-400">
            Not sure which service is right for you?{" "}
            <Link
              href="/appointment"
              className="font-medium text-teal-600 underline hover:text-teal-700 underline-offset-2"
            >
              Book a free consultation
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}