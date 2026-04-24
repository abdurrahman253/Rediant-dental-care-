"use client";

import { useEffect, useState } from 'react';
import Navbar from './component/Navbar';
import Hero from './component/Hero';
import Stats from './component/Stats';
import Services from './component/Services';
import WhyChooseUs from './component/WhyChooseUs';
import Doctors from './component/Doctors';
import Testimonials from './component/Testimonials';
import AppointmentForm from './component/AppointmentForm';
import BlogPreview from './component/BlogPreview';
import Contact from './component/Contact';
import Footer from './component/Footer';
import QuickBookingStrip from './component/QuickBookingStrip';
import AppointmentModal from './component/AppointmentModal';

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    let lenis;
    let rafId;
    (async () => {
      try {
        const LenisModule = await import('lenis');
        const Lenis = LenisModule.default || LenisModule.Lenis || LenisModule;
        lenis = new Lenis({ duration: 1.2, easing: (t) => t });
        const raf = (time) => {
          lenis.raf(time);
          rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);
      } catch (e) {
        // lenis failed to load — fine to continue
      }
    })();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (lenis && lenis.destroy) lenis.destroy();
    };
  }, []);
  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-[#F8FAFC] to-[#EEF4FF] dark:bg-navy-950">
      <Navbar onBookClick={() => setModalOpen(true)} />
      <Hero onBookClick={() => setModalOpen(true)} />
      <QuickBookingStrip />
      <Stats />
      <Services />
      <WhyChooseUs />
      <Doctors />
      <Testimonials />
      <AppointmentForm />
      <BlogPreview />
      <Contact />
    

      <AppointmentModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  );
}