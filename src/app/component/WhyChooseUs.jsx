'use client';

import { motion } from 'framer-motion';
import { HeartPulse, Cpu, Wallet, Smile, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

const features = [
  {
    icon: HeartPulse,
    title: 'Pain-Free Treatment',
    description: 'Gentle modern anesthesia ensures completely comfortable dental care experience.',
    color: 'text-rose-500',
    bg: 'bg-rose-50',
  },
  {
    icon: Cpu,
    title: 'Modern Equipment',
    description: 'Advanced digital X-rays, 3D imaging, and laser technology for precise treatment.',
    color: 'text-teal-500',
    bg: 'bg-teal-50',
  },
  {
    icon: Wallet,
    title: 'Transparent Pricing',
    description: 'Clear treatment cost before starting. No hidden charges, fully honest care.',
    color: 'text-emerald-500',
    bg: 'bg-emerald-50',
  },
  {
    icon: Smile,
    title: 'Patient-First Care',
    description: 'Every treatment plan is designed with comfort, safety, and trust in mind.',
    color: 'text-violet-500',
    bg: 'bg-violet-50',
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 25 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function WhyUs() {
  return (
    <section
      id="about"
      className="relative py-20 bg-gradient-to-br from-white via-slate-50 to-teal-50 overflow-hidden"
    >
      {/* background glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-teal-100/30 blur-3xl rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* LEFT IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=90"
                alt="Dentist working"
                width={800}
                height={1000}
                className="w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
            </div>

            {/* Floating trust badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute top-10 -right-6 bg-white shadow-xl rounded-2xl p-4 border border-slate-100 max-w-[200px]"
            >
              <CheckCircle2 className="w-6 h-6 text-teal-500 mb-2" />
              <p className="text-sm font-semibold text-slate-800 leading-tight">
                Trusted Dental Clinic in Bangladesh
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Providing safe care since 2014
              </p>
            </motion.div>

            {/* soft decoration */}
            <div className="absolute -bottom-8 -left-8 w-52 h-52 bg-teal-200/20 rounded-full blur-3xl" />
          </motion.div>

          {/* RIGHT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* badge */}
            <span className="inline-flex items-center gap-2 px-5 py-2 bg-white shadow-sm border border-slate-100 rounded-full text-teal-600 text-xs font-semibold tracking-widest uppercase">
              Why Choose Us
            </span>

            {/* heading */}
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
              Dental Care You Can{' '}
              <span className="text-teal-600">Trust</span>
            </h2>

            {/* subtitle */}
            <p className="text-slate-500 text-sm leading-relaxed max-w-xl">
              We combine advanced dental technology with compassionate care to ensure
              safe, comfortable, and affordable treatment for every patient in Bangladesh.
            </p>

            {/* FEATURES */}
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid sm:grid-cols-2 gap-5"
            >
              {features.map((f, i) => {
                const Icon = f.icon;

                return (
                  <motion.div
                    key={f.title}
                    variants={item}
                    className="group p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="flex gap-4">
                      <div className={`w-10 h-10 rounded-xl ${f.bg} flex items-center justify-center group-hover:scale-110 transition`}>
                        <Icon className={`w-5 h-5 ${f.color}`} />
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-slate-800">
                          {f.title}
                        </h4>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                          {f.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* CTA */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() =>
                document.querySelector('#appointment')?.scrollIntoView({
                  behavior: 'smooth',
                })
              }
              className="px-7 py-3 rounded-full bg-teal-600 text-white text-sm font-semibold shadow-md hover:bg-teal-500 transition"
            >
              Schedule a Visit
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}