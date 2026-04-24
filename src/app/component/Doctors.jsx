'use client';

import { motion } from 'framer-motion';
import { Share2, Link, Mail } from 'lucide-react';
import Image from 'next/image';

const doctors = [
  {
    name: 'Dr. Arif Rahman',
    title: 'BDS, MDS (Orthodontics)',
    specialty: 'Chief Orthodontist',
    experience: '15 years experience',
    img: 'https://i.postimg.cc/L631qHDg/image-18-800x800.jpg',
  },
  {
    name: 'Dr. Sadia Islam',
    title: 'BDS, FCPS (Oral Surgery)',
    specialty: 'Oral & Maxillofacial Surgeon',
    experience: '11 years experience',
    img: 'https://i.postimg.cc/xCNmqMpY/image-17-800x800.jpg',
  },
  {
    name: 'Dr. Tahmid Hossain',
    title: 'BDS, MS (Endodontics)',
    specialty: 'Endodontist & Implant Specialist',
    experience: '9 years experience',
    img: 'https://i.postimg.cc/qMwNJ1Mf/image-20-800x800.jpg',
  },
  {
    name: 'Dr. Nusrat Jahan',
    title: 'BDS, PGT (Cosmetic Dentistry)',
    specialty: 'Cosmetic Dentist',
    experience: '7 years experience',
    img: 'https://i.postimg.cc/90jDMSqx/image-19-800x800.jpg',
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const card = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function Doctors() {
  return (
    <section
      id="doctors"
      className="relative py-20 bg-gradient-to-br from-white via-slate-50 to-blue-50 overflow-hidden"
    >
      {/* subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-teal-100/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white shadow-sm border border-slate-100 text-teal-600 text-xs font-semibold tracking-widest uppercase">
            Trusted Experts
          </span>

          <h2 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900">
            Meet our <span className="text-teal-600">Dentists</span>
          </h2>

          <p className="mt-4 text-slate-500 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Our highly experienced dental specialists are committed to delivering safe,
            modern, and patient-focused treatments with precision and care.
          </p>

          <div className="mt-6">
            <a
              href="/doctors"
              className="inline-flex items-center px-6 py-3 rounded-full bg-teal-600 text-white text-sm font-medium hover:bg-teal-500 transition"
            >
              View All Doctors
            </a>
          </div>
        </motion.div>

        {/* GRID */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {doctors.map((doc, i) => (
            <motion.div
              key={doc.name}
              variants={card}
              className="group relative bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500"
            >

              {/* IMAGE */}
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={doc.img}
                  alt={doc.name}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/10 to-transparent" />

                {/* social icons */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  {[Share2, Link, Mail].map((Icon, idx) => (
                    <button
                      key={idx}
                      className="w-9 h-9 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-teal-500 transition"
                    >
                      <Icon className="w-4 h-4" />
                    </button>
                  ))}
                </div>
              </div>

              {/* INFO */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-slate-900 group-hover:text-teal-600 transition">
                  {doc.name}
                </h3>

                <p className="text-xs text-teal-600 font-medium mt-1">
                  {doc.specialty}
                </p>

                <p className="text-xs text-slate-500 mt-1">
                  {doc.title}
                </p>

                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
                  <span className="w-2 h-2 rounded-full bg-teal-500" />
                  {doc.experience}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}