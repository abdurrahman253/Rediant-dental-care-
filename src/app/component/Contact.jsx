"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import {
  MapPin,
  Phone,
  Mail,
  User,
  MessageSquare,
  Send,
  Clock,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Shield,
  HeartHandshake,
  MessageCircle,
  ChevronRight,
  Star,
  Zap,
  Navigation,
  PhoneCall,
} from "lucide-react";

// ─── Validation Schema ───────────────────────────────────────────
const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .min(11, "Please enter a valid mobile number")
    .regex(/^(\+8801|01)[3-9]\d{8}$/, "Enter a valid Bangladesh number (01XXXXXXXXX)"),
  message: z.string().min(10, "Please write at least 10 characters"),
});

// ─── Animation Variants ──────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const cardItem = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// ─── Clinic Open Status Hook ─────────────────────────────────────
function useClinicStatus() {
  const [status, setStatus] = useState({ open: false, label: "", nextOpen: "" });

  useEffect(() => {
    const now = new Date();
    const day = now.getDay(); // 0=Sun, 5=Fri, 6=Sat
    const hour = now.getHours();
    const minute = now.getMinutes();
    const time = hour + minute / 60;

    let open = false;
    let label = "";
    let nextOpen = "";

    if (day === 5) {
      // Friday
      open = time >= 16 && time < 21;
      label = open ? "Open until 9:00 PM" : "Opens at 4:00 PM";
      nextOpen = "Fri 4:00 PM";
    } else if (day === 0) {
      // Sunday — closed
      open = false;
      label = "Closed today";
      nextOpen = "Mon 9:00 AM";
    } else {
      open = time >= 9 && time < 21;
      label = open ? "Open until 9:00 PM" : "Opens at 9:00 AM";
      nextOpen = "Tomorrow 9:00 AM";
    }

    setStatus({ open, label, nextOpen });
  }, []);

  return status;
}

// ─── Floating WhatsApp Button ────────────────────────────────────
function WhatsAppFloat() {
  return (
    <motion.a
      href="https://wa.me/8801800000000"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl"
      style={{
        background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
        boxShadow: "0 8px 32px rgba(37,211,102,0.45)",
      }}
      title="Chat on WhatsApp"
    >
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full animate-ping opacity-30 bg-green-400" />
      <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7 relative">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.558 4.136 1.535 5.875L.057 23.25a.75.75 0 00.916.916l5.375-1.478A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.712 9.712 0 01-4.964-1.36l-.356-.212-3.695 1.016 1.016-3.695-.212-.356A9.712 9.712 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
      </svg>
    </motion.a>
  );
}

// ─── Trust Badge Row ─────────────────────────────────────────────
function TrustRow() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const badges = [
    { icon: Shield, text: "Your Information is Completely Safe", sub: "Privacy Protected" },
    { icon: Zap, text: "Response in 10–15 Minutes", sub: "Lightning Fast Reply" },
    { icon: HeartHandshake, text: "We Are Always By Your Side", sub: "We Truly Care" },
    { icon: Star, text: "2,000+ Happy Patients", sub: "Happy Patients" },
  ];

  return (
    <motion.div
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10"
    >
      {badges.map(({ icon: Icon, text, sub }) => (
        <motion.div
          key={sub}
          variants={cardItem}
          className="group relative flex items-center gap-3 bg-white rounded-2xl px-4 py-3.5 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_20px_rgba(15,118,110,0.1)] hover:border-teal-100 transition-all duration-300"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
            <Icon className="w-4 h-4 text-teal-600" strokeWidth={1.75} />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-bold text-slate-700 leading-tight truncate">{text}</p>
            <p className="text-[10px] text-slate-400 font-medium mt-0.5">{sub}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

// ─── Info Card ───────────────────────────────────────────────────
function InfoCard({ icon: Icon, label, value, color, bgFrom, bgTo, borderColor, delay = 0 }) {
  return (
    <motion.div
      variants={cardItem}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.25 }}
      className="relative group bg-white rounded-2xl border border-slate-100 shadow-[0_2px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)] overflow-hidden p-5 transition-all duration-300"
    >
      {/* Top accent */}
      <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${bgFrom} ${bgTo} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

      <div
        className="w-11 h-11 rounded-2xl flex items-center justify-center mb-4 shadow-sm"
        style={{ background: `linear-gradient(135deg, var(--from), var(--to))` }}
        style={{
          background: `linear-gradient(135deg, ${bgFrom.replace("from-", "").replace("[", "").replace("]", "")}, ${bgTo.replace("to-", "").replace("[", "").replace("]", "")})`,
        }}
      >
        <Icon className={`w-5 h-5 ${color}`} strokeWidth={1.75} />
      </div>
      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400 mb-1.5">{label}</p>
      <p className="text-sm text-slate-700 font-semibold leading-relaxed whitespace-pre-line">{value}</p>
    </motion.div>
  );
}

// ─── Input Field Component ───────────────────────────────────────
function FormField({ label, icon: Icon, error, children, required }) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-500">
        {label}
        {required && <span className="text-teal-500 text-xs">*</span>}
      </label>
      <div className="relative group">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-teal-500 transition-colors duration-200 pointer-events-none z-10">
          <Icon className="w-4 h-4" strokeWidth={1.75} />
        </div>
        {children}
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="text-red-500 text-xs flex items-center gap-1.5 mt-1"
          >
            <span className="w-3.5 h-3.5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 text-red-500 font-bold text-[9px]">!</span>
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Map Component ───────────────────────────────────────────────
function MapEmbed() {
  return (
    <div className="relative rounded-3xl overflow-hidden border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.08)] h-64 sm:h-72 bg-slate-50">
      {/* Replace src with your real Google Maps embed URL */}
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.526309013046!2d90.41338657610228!3d23.78029648886682!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7715a40e4a1%3A0x1c73f0bf8e7ca7f2!2sGulshan-1%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1714000000000!5m2!1sen!2sbd"
        width="100%"
        height="100%"
        style={{ border: 0, filter: "saturate(1.1) contrast(1.05)" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Dental Clinic Location — Gulshan, Dhaka"
      />

      {/* Map overlay badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="absolute bottom-4 left-4 flex items-center gap-2.5 bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-2.5 shadow-xl border border-white"
      >
        <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-400 flex items-center justify-center shadow-sm">
          <Navigation className="w-3.5 h-3.5 text-white" fill="white" />
        </div>
        <div>
          <p className="text-[11px] font-bold text-slate-800">Smile Dental Clinic</p>
          <p className="text-[10px] text-slate-400">House 12, Road 11, Gulshan-1</p>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Hours Timeline ──────────────────────────────────────────────
function HoursCard({ clinicStatus }) {
  const schedule = [
    { days: "Sat – Thu", hours: "9:00 AM – 9:00 PM", active: true },
    { days: "Friday", hours: "4:00 PM – 9:00 PM", active: true },
    { days: "Government Holidays", hours: "Closed", active: false },
  ];

  return (
    <motion.div
      variants={cardItem}
      className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_16px_rgba(0,0,0,0.06)] p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-100 flex items-center justify-center">
            <Clock className="w-4 h-4 text-violet-600" strokeWidth={1.75} />
          </div>
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-500">Office Hours</p>
        </div>
        {/* Live status pill */}
        <div
          className={`flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full ${
            clinicStatus.open
              ? "bg-green-50 text-green-700 border border-green-100"
              : "bg-red-50 text-red-600 border border-red-100"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              clinicStatus.open ? "bg-green-500 animate-pulse" : "bg-red-400"
            }`}
          />
          {clinicStatus.open ? "Open Now" : "Closed"}
        </div>
      </div>

      <div className="space-y-2.5">
        {schedule.map(({ days, hours, active }) => (
          <div
            key={days}
            className={`flex items-center justify-between py-2 px-3 rounded-xl transition-colors ${
              active
                ? "bg-slate-50 hover:bg-teal-50/60 group"
                : "bg-slate-50/50 opacity-60"
            }`}
          >
            <span className="text-xs font-semibold text-slate-600 group-hover:text-teal-700 transition-colors">{days}</span>
            <span
              className={`text-[11px] font-bold px-2.5 py-1 rounded-lg ${
                active
                  ? "text-teal-700 bg-teal-50 group-hover:bg-teal-100 transition-colors"
                  : "text-slate-400 bg-slate-100"
              }`}
            >
              {hours}
            </span>
          </div>
        ))}
      </div>

      <p className="mt-4 text-[11px] text-slate-400 text-center leading-relaxed">
        {clinicStatus.open
          ? `✅ ${clinicStatus.label} · We're ready to help`
          : `ℹ️ ${clinicStatus.label} · Next opening: ${clinicStatus.nextOpen}`}
      </p>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN CONTACT PAGE
// ═══════════════════════════════════════════════════════════════
export default function ContactPage() {
  const clinicStatus = useClinicStatus();
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const [formSuccess, setFormSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting, touchedFields },
  } = useForm({ resolver: zodResolver(schema), mode: "onBlur" });

  const watchedFields = watch();

  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 1400));
    setFormSuccess(true);
    toast.success("Your message has been sent! We will contact you shortly.", {
      duration: 5000,
      style: {
        background: "#0f766e",
        color: "white",
        borderRadius: "12px",
        fontWeight: "600",
        fontSize: "13px",
      },
      iconTheme: { primary: "white", secondary: "#0f766e" },
    });
    setTimeout(() => {
      reset();
      setFormSuccess(false);
    }, 3500);
  };

  const inputBase =
    "w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3.5 text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-400 focus:bg-white transition-all duration-200 font-medium";

  return (
    <>
      <WhatsAppFloat />

      <section
        id="contact"
        ref={sectionRef}
        className="relative min-h-screen overflow-hidden"
        style={{
          background:
            "linear-gradient(175deg, #f0fdfa 0%, #f8fafc 30%, #eff6ff 70%, #f0fdfa 100%)",
        }}
      >
        {/* ── Ambient Background Blobs ── */}
        <div
          className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none opacity-40"
          style={{
            background:
              "radial-gradient(circle, rgba(20,184,166,0.12) 0%, transparent 65%)",
            filter: "blur(60px)",
            transform: "translate(-30%, -30%)",
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-30"
          style={{
            background:
              "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 65%)",
            filter: "blur(60px)",
            transform: "translate(20%, 20%)",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-[400px] h-[400px] rounded-full pointer-events-none opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(56,189,248,0.15) 0%, transparent 65%)",
            filter: "blur(48px)",
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* ── Dot grid ── */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #0f766e 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">

          {/* ══════════════════════════════════════
              SECTION HEADER
          ══════════════════════════════════════ */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="text-center mb-12 lg:mb-16"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
              <span className="text-xs font-black uppercase tracking-[0.2em] text-teal-600 bg-teal-50 border border-teal-100 px-4 py-1.5 rounded-full">
                Get In Touch
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
            </div>

            {/* Title */}
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-5 leading-[1.08]"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              <span className="text-slate-900">Contact </span>
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #0f766e 0%, #0891b2 60%, #0d9488 100%)",
                }}
              >
                With Us
              </span>
            </h1>

            {/* Sub */}
            <p className="text-slate-500 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              We are located in Gulshan, Dhaka. We are always by your side for any dental problem.
              <span className="text-teal-600 font-semibold">
                {" "}Book your appointment today.
              </span>
            </p>

            {/* Divider */}
            <motion.div
              className="mt-7 flex items-center justify-center gap-3"
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <div className="h-px w-24 bg-gradient-to-r from-transparent to-teal-400" />
              <div className="w-2 h-2 rounded-full bg-teal-400" />
              <div className="h-px w-24 bg-gradient-to-l from-transparent to-teal-400" />
            </motion.div>
          </motion.div>

          {/* ══════════════════════════════════════
              TRUST BADGES ROW
          ══════════════════════════════════════ */}
          <TrustRow />

          {/* ══════════════════════════════════════
              MAIN GRID
          ══════════════════════════════════════ */}
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-10 items-start">

            {/* ── LEFT COLUMN (3 cols) ── */}
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              className="lg:col-span-2 space-y-5"
            >
              {/* Map */}
              <MapEmbed />

              {/* Info Cards */}
              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3"
              >
                {/* Address */}
                <motion.div
                  variants={cardItem}
                  whileHover={{ y: -3, scale: 1.02 }}
                  transition={{ duration: 0.25 }}
                  className="group relative bg-white rounded-2xl border border-slate-100 shadow-[0_2px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_32px_rgba(15,118,110,0.12)] overflow-hidden p-5 transition-all duration-300"
                >
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-400 flex items-center justify-center mb-3.5 shadow-md shadow-teal-200 group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="w-5 h-5 text-white" strokeWidth={1.75} />
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 mb-1.5">Address</p>
                  <p className="text-sm text-slate-700 font-semibold leading-snug">
                    House 12, Road 11<br />
                    Gulshan-1, Dhaka 1212
                  </p>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-teal-600 text-[11px] font-bold mt-2.5 hover:text-teal-700 group/link"
                  >
                    Directions
                    <ChevronRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                  </a>
                </motion.div>

                {/* Phone */}
                <motion.div
                  variants={cardItem}
                  whileHover={{ y: -3, scale: 1.02 }}
                  transition={{ duration: 0.25 }}
                  className="group relative bg-white rounded-2xl border border-slate-100 shadow-[0_2px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_32px_rgba(56,189,248,0.12)] overflow-hidden p-5 transition-all duration-300"
                >
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-sky-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-sky-400 flex items-center justify-center mb-3.5 shadow-md shadow-blue-200 group-hover:scale-110 transition-transform duration-300">
                    <Phone className="w-5 h-5 text-white" strokeWidth={1.75} />
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 mb-1.5">Phone</p>
                  <p className="text-sm text-slate-700 font-semibold leading-snug">
                    +880 1777-678707<br />
                    +880 1452-458521
                  </p>
                  <a
                    href="tel:+8801777678707"
                    className="inline-flex items-center gap-1 text-blue-600 text-[11px] font-bold mt-2.5 hover:text-blue-700 group/link"
                  >
                    Call Now
                    <ChevronRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                  </a>
                </motion.div>
              </motion.div>

              {/* Hours Card */}
              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <HoursCard clinicStatus={clinicStatus} />
              </motion.div>

              {/* WhatsApp CTA Banner */}
              <motion.a
                href="https://wa.me/8801777678707"
                target="_blank"
                rel="noopener noreferrer"
                variants={cardItem}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -3 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-4 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white rounded-2xl p-4 shadow-lg shadow-green-200 cursor-pointer group"
              >
                <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <MessageCircle className="w-5 h-5 text-white" strokeWidth={1.75} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-black">Message on WhatsApp</p>
                  <p className="text-xs text-white/75 mt-0.5 leading-snug">
                    Contact us on WhatsApp for a quick response
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-white/80 flex-shrink-0 group-hover:translate-x-1 transition-transform duration-200" />
              </motion.a>
            </motion.div>

            {/* ── RIGHT COLUMN (2 cols) ── */}
            <motion.div
              ref={formRef}
              variants={fadeRight}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              className="lg:col-span-3"
            >
              <div className="relative bg-white rounded-3xl border border-slate-100/80 shadow-[0_8px_48px_rgba(0,0,0,0.09)] overflow-hidden">
                
                {/* Top gradient bar */}
                <div className="h-1 w-full bg-gradient-to-r from-teal-500 via-cyan-400 to-blue-500" />

                {/* Header */}
                <div className="px-8 pt-8 pb-6 border-b border-slate-50">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2
                        className="text-2xl font-black text-slate-800 tracking-tight mb-1.5"
                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                      >
                        Send Us a Message
                      </h2>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        Fill in your details — we will get back to you within{" "}
                        <span className="text-teal-600 font-semibold">
                          10–15 minutes
                        </span>.
                      </p>
                    </div>
                    {/* Response time badge */}
                    <div className="flex-shrink-0 flex flex-col items-center bg-teal-50 border border-teal-100 rounded-2xl px-3.5 py-2.5 text-center">
                      <Zap className="w-4 h-4 text-teal-500 mb-1" strokeWidth={2} />
                      <p className="text-[10px] font-black text-teal-700 leading-tight">10–15</p>
                      <p className="text-[9px] text-teal-500 font-semibold">min reply</p>
                    </div>
                  </div>
                </div>

                {/* Form Body */}
                <div className="px-8 py-7">
                  <AnimatePresence mode="wait">
                    {formSuccess ? (
                      // ── Success State ──
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.92 }}
                        transition={{ duration: 0.4 }}
                        className="py-12 flex flex-col items-center text-center"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
                          className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center shadow-xl shadow-teal-200 mb-5"
                        >
                          <CheckCircle2 className="w-8 h-8 text-white" strokeWidth={2.5} />
                        </motion.div>
                        <h3
                          className="text-xl font-black text-slate-800 mb-2"
                          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                        >
                          Message Sent!
                        </h3>
                        <p className="text-sm text-slate-500 max-w-xs leading-relaxed">
                          We have received your message. Our team will contact you shortly.
                        </p>
                      </motion.div>
                    ) : (
                      // ── Form ──
                      <motion.form
                        key="form"
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-5"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        {/* Name + Phone Row */}
                        <div className="grid sm:grid-cols-2 gap-5">
                          <FormField
                            label="Your Name"
                            icon={User}
                            error={errors.name?.message}
                            required
                          >
                            <input
                              {...register("name")}
                              placeholder="Enter your full name"
                              className={`${inputBase} ${
                                errors.name
                                  ? "border-red-300 bg-red-50 focus:border-red-400 focus:ring-red-200"
                                  : touchedFields.name && watchedFields.name?.length >= 2
                                  ? "border-teal-300 bg-teal-50/30 focus:border-teal-400"
                                  : ""
                              }`}
                            />
                            {touchedFields.name && watchedFields.name?.length >= 2 && !errors.name && (
                              <CheckCircle2 className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-teal-500 pointer-events-none" />
                            )}
                          </FormField>

                          <FormField
                            label="Mobile Number"
                            icon={Phone}
                            error={errors.phone?.message}
                            required
                          >
                            <input
                              {...register("phone")}
                              placeholder="01XXXXXXXXX"
                              type="tel"
                              className={`${inputBase} ${
                                errors.phone
                                  ? "border-red-300 bg-red-50 focus:border-red-400 focus:ring-red-200"
                                  : touchedFields.phone && !errors.phone
                                  ? "border-teal-300 bg-teal-50/30 focus:border-teal-400"
                                  : ""
                              }`}
                            />
                            {touchedFields.phone && !errors.phone && (
                              <CheckCircle2 className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-teal-500 pointer-events-none" />
                            )}
                          </FormField>
                        </div>

                        {/* Message */}
                        <FormField
                          label="Your Message"
                          icon={MessageSquare}
                          error={errors.message?.message}
                          required
                        >
                          <textarea
                            {...register("message")}
                            rows={5}
                            placeholder="Write about your dental problem or any questions..."
                            className={`${inputBase} pt-3.5 resize-none leading-relaxed ${
                              errors.message
                                ? "border-red-300 bg-red-50 focus:border-red-400 focus:ring-red-200"
                                : touchedFields.message && watchedFields.message?.length >= 10
                                ? "border-teal-300 bg-teal-50/30"
                                : ""
                            }`}
                            style={{ paddingTop: "14px" }}
                          />
                        </FormField>

                        {/* Privacy note */}
                        <div className="flex items-start gap-2.5 bg-slate-50 rounded-xl px-4 py-3 border border-slate-100">
                          <Shield className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" strokeWidth={1.75} />
                          <p className="text-[11px] text-slate-400 leading-relaxed">
                            Your personal information will remain completely confidential. We never share it with third parties.
                          </p>
                        </div>

                        {/* Submit Button */}
                        <motion.button
                          type="submit"
                          disabled={isSubmitting}
                          whileHover={!isSubmitting ? { scale: 1.015, y: -1 } : {}}
                          whileTap={!isSubmitting ? { scale: 0.985 } : {}}
                          className="relative w-full flex items-center justify-center gap-2.5 text-white font-bold py-4 px-8 rounded-xl text-sm tracking-wide overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300"
                          style={{
                            background: isSubmitting
                              ? "linear-gradient(135deg, #0f766e, #0891b2)"
                              : "linear-gradient(135deg, #0f766e 0%, #0891b2 50%, #0d9488 100%)",
                            boxShadow: isSubmitting
                              ? "none"
                              : "0 8px 28px rgba(15,118,110,0.35)",
                          }}
                        >
                          {/* Shimmer */}
                          {!isSubmitting && (
                            <span
                              className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
                              style={{
                                background:
                                  "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
                              }}
                            />
                          )}

                          {isSubmitting ? (
                            <>
                              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin flex-shrink-0" />
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4 flex-shrink-0" strokeWidth={2} />
                              Send Message
                              <ArrowRight className="w-4 h-4 ml-auto flex-shrink-0" />
                            </>
                          )}
                        </motion.button>

                        {/* OR Divider */}
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-px bg-slate-100" />
                          <span className="text-[11px] text-slate-300 font-semibold uppercase tracking-wider">
                            Or
                          </span>
                          <div className="flex-1 h-px bg-slate-100" />
                        </div>

                        {/* Phone CTA */}
                        <motion.a
                          href="tel:+8801777678707"
                          whileHover={{ scale: 1.015 }}
                          whileTap={{ scale: 0.985 }}
                          className="w-full flex items-center justify-center gap-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold py-3.5 rounded-xl border border-slate-200 hover:border-slate-300 transition-all duration-200 text-sm"
                        >
                          <PhoneCall className="w-4 h-4 text-teal-600 flex-shrink-0" strokeWidth={2} />
                          Call Directly: 01800-000000
                        </motion.a>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>

                {/* Footer strip */}
                <div className="px-8 py-4 bg-slate-50/70 border-t border-slate-50 flex flex-col sm:flex-row items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Sparkles className="w-3.5 h-3.5 text-teal-400" strokeWidth={2} />
                    <span className="font-medium">Trusted by 2,000+ patients in Dhaka</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
                    ))}
                    <span className="text-[11px] text-slate-500 font-semibold ml-1">4.9 / 5</span>
                  </div>
                </div>
              </div>

              {/* Testimonial snippet below form */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="mt-4 flex items-center gap-4 bg-white/60 backdrop-blur-sm rounded-2xl px-5 py-4 border border-white/80 shadow-sm"
              >
                <div className="flex -space-x-2 flex-shrink-0">
                  {["bg-teal-400", "bg-blue-400", "bg-violet-400"].map((color, i) => (
                    <div
                      key={i}
                      className={`w-8 h-8 rounded-full ${color} border-2 border-white flex items-center justify-center text-white text-[10px] font-black`}
                    >
                      {["R", "S", "F"][i]}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-500 leading-snug">
                  <span className="font-bold text-slate-700">Rafiq, Sultana & Farhan</span> contacted us this week.
                  <span className="text-teal-600 font-semibold"> You can too!</span>
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* ══════════════════════════════════════
              BOTTOM CTA
          ══════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-16 relative overflow-hidden rounded-3xl px-8 py-12 text-center"
            style={{
              background:
                "linear-gradient(135deg, #0f766e 0%, #0891b2 50%, #0d9488 100%)",
            }}
          >
            {/* Decoration */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none"
              style={{
                background: "radial-gradient(circle, white 0%, transparent 60%)",
              }}
            />
            <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-white/5 pointer-events-none" />
            <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full bg-white/5 pointer-events-none" />

            <div className="relative">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-white/60 mb-3">
                Why Wait Any Longer?
              </p>
              <h2
                className="text-3xl sm:text-4xl font-black text-white mb-3 tracking-tight"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Book Your Appointment Today
              </h2>
              <p className="text-white/70 text-sm max-w-lg mx-auto leading-relaxed mb-8">
                Your beautiful smile is the reward for our hard work. First consultation is completely free.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <motion.a
                  href="/appointment"
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2.5 bg-white text-teal-700 font-black px-8 py-4 rounded-full shadow-2xl hover:bg-teal-50 transition-all duration-300 text-sm tracking-wide"
                >
                  <Sparkles className="w-4 h-4" />
                  Book Free Consultation
                  <ArrowRight className="w-4 h-4" />
                </motion.a>

                <motion.a
                  href="https://wa.me/8801777678707"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 text-white/85 hover:text-white font-semibold text-sm transition-colors duration-200 border border-white/25 px-6 py-4 rounded-full hover:border-white/50 hover:bg-white/10"
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat on WhatsApp
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}