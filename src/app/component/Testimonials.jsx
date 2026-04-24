'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import Image from 'next/image';

const testimonials = [
  {
    name: 'Farhan Ahmed',
    location: 'Gulshan, Dhaka',
    img: 'https://randomuser.me/api/portraits/men/32.jpg',
    review:
      'I was terrified of dentists until I came here. Everything was explained clearly and the treatment was completely painless. Highly professional service.',
    rating: 5,
    service: 'Braces Treatment',
  },
  {
    name: 'Tasnim Akter',
    location: 'Dhanmondi, Dhaka',
    img: 'https://randomuser.me/api/portraits/women/44.jpg',
    review:
      'The clinic is extremely clean and modern. My whitening results were amazing and the staff made me feel very comfortable.',
    rating: 5,
    service: 'Teeth Whitening',
  },
  {
    name: 'Mahbub Rahman',
    location: 'Uttara, Dhaka',
    img: 'https://randomuser.me/api/portraits/men/18.jpg',
    review:
      'My dental implant was done perfectly. Smooth process, advanced technology, and very professional care.',
    rating: 5,
    service: 'Dental Implant',
  },
  {
    name: 'Sumaiya Begum',
    location: 'Mirpur, Dhaka',
    img: 'https://randomuser.me/api/portraits/women/67.jpg',
    review:
      'My child was very scared but the doctor handled everything with care and patience. Truly the best experience.',
    rating: 5,
    service: "Kids' Dentistry",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  const next = () =>
    setIndex((i) => (i + 1) % testimonials.length);

  const prev = () =>
    setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  // AUTO SLIDE (Netflix feel)
  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const t = testimonials[index];

  return (
    <section className="relative py-20 bg-gradient-to-br from-slate-950 via-navy-900 to-slate-900 overflow-hidden">

      {/* background glow */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/10 blur-3xl rounded-full" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 blur-3xl rounded-full" />
      </div>

      <div className="max-w-5xl mx-auto px-4 relative">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="px-5 py-2 bg-white/10 border border-white/10 text-teal-300 text-xs tracking-widest uppercase rounded-full">
            Patient Stories
          </span>

          <h2 className="mt-5 text-3xl md:text-4xl font-bold text-white">
            Real Patient <span className="text-teal-400">Experiences</span>
          </h2>

          <p className="mt-3 text-slate-400 text-sm max-w-xl mx-auto">
            Honest feedback from our patients across Dhaka who trusted us with their smiles.
          </p>
        </motion.div>

        {/* MAIN CARD */}
        <div className="relative">

          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 80, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -80, scale: 0.98 }}
              transition={{ duration: 0.5 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl"
            >

              <div className="flex flex-col md:flex-row gap-8 items-start">

                {/* IMAGE SIDE */}
                <div className="flex flex-col items-center md:items-start shrink-0">
                  <div className="relative">
                    <Image
                      src={t.img}
                      alt={t.name}
                      width={90}
                      height={90}
                      className="w-20 h-20 rounded-2xl object-cover border-2 border-teal-400/40"
                    />
                    <span className="absolute -bottom-2 -right-2 w-5 h-5 bg-teal-500 rounded-full border-2 border-slate-900" />
                  </div>

                  <div className="text-center md:text-left mt-3">
                    <p className="text-white font-semibold">{t.name}</p>
                    <p className="text-slate-400 text-xs">{t.location}</p>

                    <span className="inline-block mt-2 px-3 py-1 bg-teal-500/15 text-teal-300 text-[11px] rounded-full">
                      {t.service}
                    </span>
                  </div>
                </div>

                {/* TEXT */}
                <div className="flex-1">
                  <Quote className="w-10 h-10 text-teal-400/30 mb-4" />

                  <p className="text-slate-200 text-lg leading-relaxed italic">
                    “{t.review}”
                  </p>

                  <div className="flex gap-1 mt-5">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <span key={i} className="text-yellow-400 text-lg">
                        ★
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>

          {/* CONTROLS */}
          <div className="flex justify-center items-center gap-5 mt-8">

            <button
              onClick={prev}
              className="w-11 h-11 rounded-xl bg-white/10 hover:bg-teal-500/20 border border-white/10 text-white flex items-center justify-center transition"
            >
              <ChevronLeft />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`transition-all ${
                    i === index
                      ? 'w-6 h-2 bg-teal-400 rounded-full'
                      : 'w-2 h-2 bg-white/30 rounded-full'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-11 h-11 rounded-xl bg-white/10 hover:bg-teal-500/20 border border-white/10 text-white flex items-center justify-center transition"
            >
              <ChevronRight />
            </button>

          </div>

        </div>
      </div>
    </section>
  );
}