"use client";

import { motion, AnimatePresence } from 'framer-motion';
import MiniAppointmentForm from './MiniAppointmentForm';

export default function AppointmentModal({ open = true, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ scale: 0.95, y: 12, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 12, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="relative z-50 w-full max-w-md bg-white dark:bg-navy-900 rounded-2xl p-6 shadow-2xl border border-slate-100 dark:border-slate-800"
          >
            <h3 className="text-lg font-semibold mb-2">Request an appointment</h3>
            <p className="text-sm text-slate-500 mb-4">Quick request — we&apos;ll call to confirm within 2 hours.</p>
            <MiniAppointmentForm onSuccess={onClose} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
