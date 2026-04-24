'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import {
  User,
  Phone,
  CalendarDays,
  MessageSquare,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Clock,
  PhoneCall,
} from 'lucide-react';

/* ---------------- Schema ---------------- */
const schema = z.object({
  name: z.string().min(2),
  phone: z.string().regex(/^(\+88)?01[0-9]{9}$/),
  service: z.string().min(1),
  date: z.string().min(1),
  message: z.string().optional(),
});

const services = [
  'Teeth Cleaning',
  'Teeth Whitening',
  'Root Canal',
  'Braces & Aligners',
  'Dental Implants',
  "Kids' Dentistry",
  'General Checkup',
  'Emergency Care',
];

/* ---------------- Component ---------------- */
export default function Appointment() {
  const [step, setStep] = useState(1);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  /* ---------------- FIXED STEP VALIDATION ---------------- */
  const nextStep = async () => {
    let fieldsToValidate = [];

    if (step === 1) {
      fieldsToValidate = ['name', 'phone'];
    }

    if (step === 2) {
      fieldsToValidate = ['service'];
    }

    if (step === 3) {
      fieldsToValidate = ['date'];
    }

    const valid = await trigger(fieldsToValidate);

    if (!valid) return;

    setStep((s) => s + 1);
  };

  const prevStep = () => setStep((s) => s - 1);

  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 1200));

    const msg = `Hello Doctor, I want appointment:
Name: ${data.name}
Phone: ${data.phone}
Service: ${data.service}
Date: ${data.date}
Message: ${data.message || 'N/A'}`;

    const whatsappURL = `https://wa.me/8801777678707?text=${encodeURIComponent(msg)}`;

    window.open(whatsappURL, '_blank');

    toast.success('Appointment sent via WhatsApp!');
    reset();
    setStep(1);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <section className="relative py-20 bg-gradient-to-br from-white via-[#F8FAFC] to-[#EEF4FF] overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-200/20 blur-3xl rounded-full" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-200/20 blur-3xl rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative grid lg:grid-cols-2 gap-12 items-center">

        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <span className="px-4 py-1 bg-teal-50 text-teal-600 text-xs rounded-full border border-teal-100">
            Book Appointment
          </span>

          <h2 className="text-4xl font-bold text-slate-900">
            Get Your <span className="text-teal-500">Perfect Smile</span> Easily
          </h2>

          <p className="text-slate-500">
            Simple 3-step booking system designed for patients in Bangladesh.
          </p>

          <div className="p-4 bg-white rounded-2xl border shadow-sm flex gap-3">
            <Clock className="text-teal-500" />
            <div>
              <p className="text-sm font-semibold">Instant Confirmation</p>
              <p className="text-xs text-slate-500">We respond within 30 minutes</p>
            </div>
          </div>

          <a
            href="tel:+8801777678707"
            className="inline-flex items-center gap-2 bg-teal-500 text-white px-5 py-3 rounded-xl"
          >
            <PhoneCall size={18} />
            Call Now
          </a>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="bg-white rounded-3xl shadow-xl p-8 border"
        >

          {/* STEP INDICATOR */}
          <div className="flex justify-between mb-6">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-1 w-full mx-1 rounded ${
                  step >= s ? 'bg-teal-500' : 'bg-slate-200'
                }`}
              />
            ))}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

            <AnimatePresence mode="wait">

              {/* STEP 1 */}
              {step === 1 && (
                <motion.div key="s1">
                  <label className="text-sm">Your Name</label>
                  <input
                    {...register('name')}
                    className="w-full border p-3 rounded-xl mt-1"
                  />
                  {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}

                  <label className="text-sm mt-4 block">Phone</label>
                  <input
                    {...register('phone')}
                    className="w-full border p-3 rounded-xl mt-1"
                  />

                  <button type="button" onClick={nextStep} className="btn-primary mt-5 w-full">
                    Next <ChevronRight size={18} />
                  </button>
                </motion.div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <motion.div key="s2">
                  <label className="text-sm">Service</label>
                  <select {...register('service')} className="w-full border p-3 rounded-xl mt-2">
                    <option value="">Select</option>
                    {services.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>

                  <div className="flex gap-2 mt-5">
                    <button type="button" onClick={prevStep} className="btn-outline w-full">
                      Back
                    </button>
                    <button type="button" onClick={nextStep} className="btn-primary w-full">
                      Next
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <motion.div key="s3">
                  <label className="text-sm">Date</label>
                  <input
                    type="date"
                    min={today}
                    {...register('date')}
                    className="w-full border p-3 rounded-xl mt-2"
                  />

                  <label className="text-sm mt-4 block">Message</label>
                  <textarea {...register('message')} className="w-full border p-3 rounded-xl mt-2" />

                  <div className="flex gap-2 mt-5">
                    <button type="button" onClick={prevStep} className="btn-outline w-full">
                      Back
                    </button>
                    <button type="button" onClick={nextStep} className="btn-primary w-full">
                      Review
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 4 */}
              {step === 4 && (
                <motion.div key="s4" className="text-center space-y-4">
                  <CheckCircle2 className="text-green-500 mx-auto" size={40} />
                  <p className="font-semibold">Confirm Appointment</p>

                  <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
                    {isSubmitting ? 'Booking...' : 'Confirm via WhatsApp'}
                  </button>
                </motion.div>
              )}

            </AnimatePresence>
          </form>
        </motion.div>
      </div>
    </section>
  );
}