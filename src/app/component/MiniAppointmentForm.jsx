









"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { CalendarDays, User, Phone } from 'lucide-react';

const schema = z.object({
  name: z.string().min(2),
  phone: z.string().min(11),
  service: z.string().min(1),
});

const services = [
  'Teeth Cleaning',
  'Dental Fillings',
  'Root Canal',
  'Teeth Whitening',
  'Braces / Invisalign',
  'Dental Implants',
];

export default function MiniAppointmentForm({ onSuccess }) {
  const { register, handleSubmit, reset, formState: { isSubmitting, errors } } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    await new Promise(r => setTimeout(r, 900));
    toast.success('Request received. We will call you back within 2 hours.');
    reset();
    if (onSuccess) onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-1">Full name</label>
        <div className="relative">
          <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          <input {...register('name')} className="input-field pl-10" placeholder="Your name" />
        </div>
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-1">Phone</label>
        <div className="relative">
          <Phone className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          <input {...register('phone')} className="input-field pl-10" placeholder="01XXXXXXXXX" />
        </div>
        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-1">Service</label>
        <select {...register('service')} className="input-field appearance-none">
          <option value="">Select a service…</option>
          {services.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service.message}</p>}
      </div>

      <div className="flex items-center gap-3">
        <button type="submit" disabled={isSubmitting} className="btn-primary px-5 py-3">
          {isSubmitting ? 'Sending…' : 'Request Appointment'}
        </button>
        <button type="button" onClick={() => { reset(); if (onSuccess) onSuccess(); }} className="btn-outline px-4 py-3">Cancel</button>
      </div>
    </form>
  );
}
