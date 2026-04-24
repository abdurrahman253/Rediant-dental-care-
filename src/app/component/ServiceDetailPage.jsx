"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ShieldCheck,
  Layers,
  Sparkles,
  Activity,
  ScanLine,
  Wrench,
  Wind,
  Crown,
  Zap,
  Clock,
  Heart,
  Star,
  Smile,
  TrendingUp,
  Award,
  Sun,
  Palette,
  Shield,
  Eye,
  Target,
  ChevronDown,
  Calendar,
  Timer,
  RefreshCw,
  CheckCircle2,
  ArrowRight,
  Phone,
} from "lucide-react";


// ── Icon Maps ───────────────────────────────────────────────
const iconMap = {
  ShieldCheck, Layers, Sparkles, Activity, ScanLine, Wrench, Wind, Crown,
};
const benefitIconMap = {
  Zap, Clock, Heart, Star, Smile, TrendingUp, Award, Sun, Palette,
  Shield, Eye, Target, Activity,
};

// ── Animation Variants ───────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const slideIn = {
  hidden: { opacity: 0, x: -24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// ── FAQ Accordion Item ───────────────────────────────────────
function FAQItem({ faq, index }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      variants={slideIn}
      className="border border-slate-100 rounded-xl overflow-hidden bg-white hover:border-teal-200 transition-colors duration-300"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left gap-4 group"
        aria-expanded={open}
      >
        <div className="flex items-start gap-3">
          <span
            className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center transition-all duration-300 ${
              open
                ? "bg-teal-500 text-white"
                : "bg-slate-100 text-slate-400 group-hover:bg-teal-50 group-hover:text-teal-500"
            }`}
          >
            {index + 1}
          </span>
          <span
            className={`text-sm font-semibold transition-colors duration-200 ${
              open ? "text-teal-700" : "text-slate-700 group-hover:text-teal-600"
            }`}
          >
            {faq.q}
          </span>
        </div>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex-shrink-0"
        >
          <ChevronDown
            className={`w-4 h-4 transition-colors ${open ? "text-teal-500" : "text-slate-400"}`}
          />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="px-6 pb-5 pt-0 pl-14">
              <p className="text-sm text-slate-500 leading-relaxed">{faq.a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Main Page Component ──────────────────────────────────────
export default function ServiceDetailPage({ service }) {
  
  const IconComponent = iconMap[service.icon] || ShieldCheck;

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ══════════════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════════════ */}
      <section className="relative h-[70vh] min-h-[500px] max-h-[700px] overflow-hidden">
        {/* Background Image */}
        <Image
          src={service.heroImage}
          alt={service.title}
          fill
          className="object-cover object-center scale-105"
          priority
          sizes="100vw"
          style={{ filter: "brightness(0.75)" }}
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(
              135deg,
              rgba(2, 32, 50, 0.88) 0%,
              rgba(15, 118, 110, 0.55) 50%,
              rgba(0, 0, 0, 0.3) 100%
            )`,
          }}
        />

        {/* Animated noise texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          }}
        />

        {/* Content */}
        <div className="relative h-full flex flex-col justify-end max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 pt-24">

          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute top-8 left-4 sm:left-6 lg:left-8"
          >
            <Link
              href="/#services"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium transition-colors duration-200 group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
              Back to Services
            </Link>
          </motion.div>

          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="flex items-center gap-2 text-xs text-white/50 mb-4"
          >
            <Link href="/" className="hover:text-white/80 transition-colors">Home</Link>
            <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
            <Link href="/#services" className="hover:text-white/80 transition-colors">Services</Link>
            <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
            <span className="text-white/70">{service.title}</span>
          </motion.div>

          {/* Icon + Title */}
          <div className="flex items-end gap-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.7, rotate: -15 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
              className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-2xl flex-shrink-0 mb-1`}
            >
              <IconComponent className="w-8 h-8 text-white" strokeWidth={1.75} />
            </motion.div>

            <div>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <h1
                  className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  {service.title}
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.6 }}
                className="text-white/65 text-base mt-2 max-w-xl leading-relaxed"
              >
                {service.shortDesc}
              </motion.p>
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 56L1440 56L1440 28C1200 0 960 56 720 28C480 0 240 56 0 28V56Z" fill="#f8fafc" />
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          MAIN CONTENT
      ══════════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

          {/* ── LEFT COLUMN ── */}
          <div className="lg:col-span-2 space-y-8">

            {/* About Card */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              className="bg-white rounded-2xl p-8 shadow-[0_2px_20px_rgba(0,0,0,0.06)] border border-slate-100/80"
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className={`w-1 h-8 rounded-full bg-gradient-to-b ${service.gradient}`}
                />
                <h2
                  className="text-2xl font-black text-slate-800 tracking-tight"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  About This Service
                </h2>
              </div>
              <p className="text-slate-500 leading-relaxed text-[0.95rem]">
                {service.about}
              </p>

              {/* Stat chips */}
              <div className="mt-6 flex flex-wrap gap-3">
                {[
                  { icon: Timer, label: "Duration", value: service.duration },
                  { icon: RefreshCw, label: "Recovery", value: service.recovery },
                  { icon: CheckCircle2, label: "Result", value: "Proven" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="flex items-center gap-2.5 bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5"
                  >
                    <stat.icon className="w-4 h-4 text-teal-500 flex-shrink-0" />
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">
                        {stat.label}
                      </p>
                      <p className="text-sm font-bold text-slate-700">{stat.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Benefits List */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              className="bg-white rounded-2xl p-8 shadow-[0_2px_20px_rgba(0,0,0,0.06)] border border-slate-100/80"
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={`w-1 h-8 rounded-full bg-gradient-to-b ${service.gradient}`}
                />
                <h2
                  className="text-2xl font-black text-slate-800 tracking-tight"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  Key Benefits
                </h2>
              </div>

              <motion.ul
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {service.benefits.map((benefit, i) => {
                  const BenefitIcon =
                    benefitIconMap[benefit.icon] || CheckCircle2;
                  return (
                    <motion.li
                      key={i}
                      variants={slideIn}
                      className="group flex items-start gap-4 bg-gradient-to-br from-slate-50 to-white border border-slate-100 rounded-xl p-4 hover:border-teal-200 hover:shadow-md transition-all duration-300"
                    >
                      <div
                        className={`flex-shrink-0 w-9 h-9 rounded-lg bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300`}
                      >
                        <BenefitIcon className="w-4 h-4 text-white" strokeWidth={2} />
                      </div>
                      <p className="text-sm text-slate-600 leading-snug font-medium mt-1">
                        {benefit.text}
                      </p>
                    </motion.li>
                  );
                })}
              </motion.ul>
            </motion.div>

            {/* FAQ Accordion */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              className="bg-white rounded-2xl p-8 shadow-[0_2px_20px_rgba(0,0,0,0.06)] border border-slate-100/80"
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={`w-1 h-8 rounded-full bg-gradient-to-b ${service.gradient}`}
                />
                <h2
                  className="text-2xl font-black text-slate-800 tracking-tight"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  Frequently Asked Questions
                </h2>
              </div>

              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="space-y-3"
              >
                {service.faqs.map((faq, i) => (
                  <FAQItem key={i} faq={faq} index={i} />
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN (Sticky) ── */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-5">

              {/* Pricing Card */}
              <motion.div
                initial={{ opacity: 0, x: 32, scale: 0.97 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative overflow-hidden bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-slate-100"
              >
                {/* Top gradient bar */}
                <div
                  className={`h-1.5 w-full bg-gradient-to-r ${service.gradient}`}
                />

                <div className="p-7">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400 mb-1">
                        Service Fee
                      </p>
                      <p
                        className="text-3xl font-black text-slate-800 tracking-tight"
                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                      >
                        {service.price}
                      </p>
                    </div>
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg`}
                    >
                      <IconComponent className="w-6 h-6 text-white" strokeWidth={1.75} />
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-3 mb-6">
                    {[
                      { icon: Timer, label: "Appointment Duration", value: service.duration },
                      { icon: RefreshCw, label: "Recovery Time", value: service.recovery },
                      { icon: CheckCircle2, label: "Consultation", value: "Free" },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0"
                      >
                        <div className="flex items-center gap-2.5 text-slate-500">
                          <item.icon className="w-4 h-4 text-teal-400 flex-shrink-0" />
                          <span className="text-xs font-medium">{item.label}</span>
                        </div>
                        <span className="text-xs font-bold text-slate-700">
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Buttons */}
                  <div className="space-y-3">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Link
                        href="/appointment"
                        className={`w-full flex items-center justify-center gap-2.5 bg-gradient-to-r ${service.gradient} text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl hover:brightness-110 transition-all duration-300 text-sm tracking-wide`}
                      >
                        <Calendar className="w-4 h-4 flex-shrink-0" />
                        Book Appointment
                        <ArrowRight className="w-4 h-4 ml-auto" />
                      </Link>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Link
                        href="/contact"
                        className="w-full flex items-center justify-center gap-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold py-3.5 px-6 rounded-xl border border-slate-200 hover:border-slate-300 transition-all duration-300 text-sm"
                      >
                        <Phone className="w-4 h-4 flex-shrink-0" />
                        Call Us Now
                      </Link>
                    </motion.div>
                  </div>

                  {/* Trust note */}
                  <p className="text-center text-xs text-slate-400 mt-4 leading-relaxed">
                    🔒 Free consultation · Flexible payment plans available
                  </p>
                </div>
              </motion.div>

              {/* Office Hours Card */}
              <motion.div
                initial={{ opacity: 0, x: 32 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15, duration: 0.6 }}
                className="bg-white rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-slate-100"
              >
                <h3
                  className="text-lg font-black text-slate-800 mb-5"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  Office Hours
                </h3>

                <div className="space-y-2.5">
                  {[
                    { day: "Monday – Tuesday", hours: "7:00 am – 7:00 pm", open: true },
                    { day: "Wednesday", hours: "8:00 am – 5:00 pm", open: true },
                    { day: "Thursday", hours: "8:00 am – 4:00 pm", open: true },
                    { day: "Friday", hours: "7:00 am – 7:00 pm", open: true },
                    { day: "Saturday – Sunday", hours: "Closed", open: false },
                  ].map((slot) => (
                    <div
                      key={slot.day}
                      className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0"
                    >
                      <span className="text-xs font-semibold text-slate-500">
                        {slot.day}
                      </span>
                      <span
                        className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                          slot.open
                            ? "text-teal-700 bg-teal-50"
                            : "text-slate-400 bg-slate-50"
                        }`}
                      >
                        {slot.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Ask the Expert Card */}
              <motion.div
                initial={{ opacity: 0, x: 32 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="relative overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-white"
              >
                {/* Background decoration */}
                <div
                  className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10"
                  style={{
                    background: `radial-gradient(circle, white 0%, transparent 70%)`,
                  }}
                />

                <h3
                  className="text-lg font-black mb-2"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  Have a Question?
                </h3>
                <p className="text-white/60 text-xs leading-relaxed mb-5">
                  Our dental experts are happy to answer any questions before your visit.
                </p>

                <div className="space-y-2.5">
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full bg-white/10 border border-white/15 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-teal-400/60 focus:bg-white/15 transition-all duration-200"
                  />
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full bg-white/10 border border-white/15 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-teal-400/60 focus:bg-white/15 transition-all duration-200"
                  />
                  <textarea
                    placeholder="Your question..."
                    rows={3}
                    className="w-full bg-white/10 border border-white/15 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-teal-400/60 focus:bg-white/15 transition-all duration-200 resize-none"
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-teal-500 hover:bg-teal-400 text-white font-semibold py-3 rounded-lg text-sm transition-colors duration-200"
                  >
                    Send Message
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          BOTTOM CTA BANNER
      ══════════════════════════════════════════════ */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden my-8"
      >
        <div
          className="max-w-7xl mx-auto rounded-3xl px-8 py-12 sm:py-16 text-center overflow-hidden mb-7"
          style={{
            background: `linear-gradient(135deg, #0f766e 0%, #0891b2 50%, #0d9488 100%)`,
          }}
        >
          {/* BG decoration */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-10 pointer-events-none"
            style={{ background: "radial-gradient(circle, white 0%, transparent 60%)" }}
          />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/60 mb-3">
              Ready to Begin?
            </p>
            <h2
              className="text-3xl sm:text-4xl font-black text-white mb-4 tracking-tight"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Schedule Your {service.title} Appointment
            </h2>
            <p className="text-white/70 max-w-xl mx-auto text-sm leading-relaxed mb-8">
              Join thousands of satisfied patients who trust us with their smiles. Your first consultation is completely free.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/appointment"
                className="inline-flex items-center gap-2.5 bg-white text-teal-700 font-bold px-8 py-4 rounded-full shadow-xl hover:shadow-2xl hover:bg-teal-50 transition-all duration-300 text-sm tracking-wide group"
              >
                <Calendar className="w-4 h-4" />
                Book Free Consultation
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/#services"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white font-semibold text-sm transition-colors duration-200 group"
              >
                Explore Other Services
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}