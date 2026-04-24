"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import {
  MapPin, Phone, Mail, Clock, Heart, Star, Calendar, Sparkles,
} from "lucide-react";

// ─── Brand Social SVG Icons ─────────────────────────────────────
const FacebookIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const YoutubeIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
  </svg>
);

// ─── Logo ───────────────────────────────────────────────────────
function Logo({ variant = "color", size = "md", className = "" }) {
  const iconSizes = { sm: 32, md: 40, lg: 56 };
  const iconSize = iconSizes[size];
  const colors = {
    color: { icon: "#0f766e", sparkle: "#0891b2", text: "#0f172a" },
    white: { icon: "#ffffff",  sparkle: "#99f6e4",  text: "#ffffff" },
    dark:  { icon: "#0f172a",  sparkle: "#0f766e",  text: "#0f172a" },
  };
  const c = colors[variant];
  const textSizes = { sm: ["16px", "9px"], md: ["21px", "10px"], lg: ["30px", "13px"] };
  const [titleSz, subSz] = textSizes[size];

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg width={iconSize} height={iconSize} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 6C15.5 6 12 8.5 12 12V20C12 22 11.5 26 10 30C9.5 31.5 10 34 12 34C14 34 14.5 32 15 30C15.5 28 16 26 17 24.5C17.5 23.5 18.5 23 20 23C21.5 23 22.5 23.5 23 24.5C24 26 24.5 28 25 30C25.5 32 26 34 28 34C30 34 30.5 31.5 30 30C28.5 26 28 22 28 20V12C28 8.5 24.5 6 20 6Z"
          fill={c.icon} fillOpacity="0.12" />
        <path d="M20 6C15.5 6 12 8.5 12 12V20C12 22 11.5 26 10 30C9.5 31.5 10 34 12 34C14 34 14.5 32 15 30C15.5 28 16 26 17 24.5C17.5 23.5 18.5 23 20 23C21.5 23 22.5 23.5 23 24.5C24 26 24.5 28 25 30C25.5 32 26 34 28 34C30 34 30.5 31.5 30 30C28.5 26 28 22 28 20V12C28 8.5 24.5 6 20 6Z"
          stroke={c.icon} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <g opacity="0.9">
          <path d="M26 10L27.5 13L30.5 14.5L27.5 16L26 19L24.5 16L21.5 14.5L24.5 13L26 10Z" fill={c.sparkle} />
        </g>
      </svg>
      <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", color: c.text }}>
        <div style={{ fontSize: titleSz, fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
          Radiant
        </div>
        <div style={{ fontSize: subSz, fontWeight: 600, lineHeight: 1.2, letterSpacing: "0.14em", textTransform: "uppercase", opacity: 0.55 }}>
          Dental Care
        </div>
      </div>
    </div>
  );
}

// ─── Data ───────────────────────────────────────────────────────
const footerLinks = {
  Services: [
    { label: "Teeth Cleaning",   href: "/services/teeth-cleaning"  },
    { label: "Teeth Whitening",  href: "/services/teeth-whitening" },
    { label: "Root Canal",       href: "/services/root-canal"      },
    { label: "Dental Implants",  href: "/services/dental-implants" },
    { label: "Braces & Aligners",href: "/services/braces"          },
    { label: "Kids' Dentistry",  href: "/services/kids-dentistry"  },
  ],
  "Quick Links": [
    { label: "About Us",          href: "/about"       },
    { label: "Our Doctors",       href: "/team"        },
    { label: "Book Appointment",  href: "/appointment" },
    { label: "Blog",              href: "/blog"        },
    { label: "FAQ",               href: "/faq"         },
    { label: "Contact",           href: "#contact"     },
  ],
};

const socials = [
  { Icon: FacebookIcon,  href: "#", label: "Facebook"  },
  { Icon: InstagramIcon, href: "#", label: "Instagram" },
  { Icon: YoutubeIcon,   href: "#", label: "YouTube"   },
];

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } } };
const popIn   = { hidden: { opacity: 0, y: 20, scale: 0.96 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } } };

// ════════════════════════════════════════════════════════════════
// FOOTER — default export
// ════════════════════════════════════════════════════════════════
export default function Footer() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <footer ref={ref} className="relative bg-slate-900 border-t border-slate-800/60 overflow-hidden">

      {/* Ambient top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-32 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at top, rgba(20,184,166,0.08) 0%, transparent 70%)" }}
      />

      {/* ── PRE-FOOTER CTA STRIP ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65 }}
        className="relative border-b border-slate-800/60"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="text-center sm:text-left">
            <p
              className="text-white font-bold text-base mb-0.5"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Ready for a healthier, more confident smile?
            </p>
            <p className="text-slate-400 text-sm">First consultation is free. No commitment needed.</p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <motion.a
              href="/appointment"
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white font-bold px-6 py-3 rounded-full text-sm shadow-lg shadow-teal-900/30 transition-all duration-300"
            >
              <Calendar className="w-4 h-4" />
              Book Now
            </motion.a>
            <motion.a
              href="tel:+8801800000000"
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 border border-white/15 hover:border-white/25 hover:bg-white/10 text-white/80 hover:text-white font-semibold px-5 py-3 rounded-full text-sm transition-all duration-200"
            >
              <Phone className="w-4 h-4" />
              Call Us
            </motion.a>
          </div>
        </div>
      </motion.div>

      {/* ── MAIN GRID ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"
        >
          {/* Brand */}
          <motion.div variants={popIn} className="lg:col-span-1 space-y-5">
            <Link href="/">
              <Logo variant="white" size="md" />
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Premium dental care in the heart of Dhaka — where world-class expertise meets genuine compassion. Your smile, our pride.
            </p>

            <div className="flex gap-2.5">
              {socials.map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-xl bg-white/[0.06] hover:bg-teal-500/20 border border-white/[0.08] hover:border-teal-500/30 flex items-center justify-center text-slate-400 hover:text-teal-400 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>

            <div className="flex items-center gap-2 pt-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <span className="text-xs text-slate-500 font-medium">4.9 · 2,000+ reviews</span>
            </div>
          </motion.div>

          {/* Services + Quick Links */}
          {Object.entries(footerLinks).map(([heading, items]) => (
            <motion.div key={heading} variants={popIn}>
              <h4
                className="text-white font-black mb-5"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "15px" }}
              >
                {heading}
              </h4>
              <ul className="space-y-2.5">
                {items.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="group flex items-center gap-2 text-slate-400 hover:text-teal-400 text-sm transition-colors duration-200"
                    >
                      <span className="w-1 h-1 rounded-full bg-teal-600/40 group-hover:bg-teal-400 transition-colors flex-shrink-0" />
                      <span className="group-hover:translate-x-0.5 transition-transform duration-200">{label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Contact Info */}
          <motion.div variants={popIn}>
            <h4
              className="text-white font-black mb-5"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "15px" }}
            >
              Contact Us
            </h4>
            <ul className="space-y-4">
              {[
                { Icon: MapPin, text: "House 12, Road 11\nGulshan-1, Dhaka 1212\nBangladesh",   href: "https://maps.google.com",              color: "text-teal-500"   },
                { Icon: Phone,  text: "+880 1777-678707\n+880 1452-458521",                     href: "tel:+8801777678707",                   color: "text-blue-400"   },
                { Icon: Mail,   text: "hello@radiantdental.com.bd",                             href: "mailto:hello@radiantdental.com.bd",    color: "text-violet-400" },
                { Icon: Clock,  text: "Sat–Thu: 9AM–9PM\nFriday: 4PM–9PM",                     href: "#contact",                            color: "text-amber-400"  },
              ].map(({ Icon, text, href, color }) => (
                <li key={text}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="flex gap-3 group"
                  >
                    <Icon className={`w-4 h-4 ${color} shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-200`} strokeWidth={1.75} />
                    <span className="text-slate-400 text-sm leading-relaxed whitespace-pre-line group-hover:text-slate-300 transition-colors duration-200">
                      {text}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="border-t border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-500 text-xs">
            © {new Date().getFullYear()} Radiant Dental Care. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 text-xs text-slate-600">
              <a href="/privacy" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
              <span>·</span>
              <a href="/terms" className="hover:text-slate-400 transition-colors">Terms</a>
            </div>
            <p className="text-slate-500 text-xs flex items-center gap-1.5">
              Made with <Heart className="w-3 h-3 text-rose-500 fill-rose-500 mx-0.5" /> in Dhaka, Bangladesh
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}