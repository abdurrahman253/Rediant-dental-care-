'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, Users, Smile, Clock } from 'lucide-react';

const stats = [
  {
    icon: Clock,
    value: 10,
    suffix: '+',
    label: 'Years Experience',
  },
  {
    icon: Users,
    value: 5000,
    suffix: '+',
    label: 'Happy Patients',
  },
  {
    icon: Smile,
    value: 100,
    suffix: '%',
    label: 'Satisfaction Rate',
  },
  {
    icon: Award,
    value: 15,
    suffix: '+',
    label: 'Certified Dentists',
  },
];

function CountUp({ target, suffix, start }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startTime;
    const duration = 1800;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;

      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setCount(Math.floor(eased * target));

      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [start, target]);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      className="relative py-20 bg-gradient-to-b from-[#F8FAFC] to-white"
    >
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#0F172A]">
            Trusted Dental Care You Can Rely On
          </h2>
          <p className="mt-2 text-sm md:text-base text-slate-500">
            Real results from real patients
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 md:gap-8">

          {stats.map((item, i) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -4 }}
                className="relative group"
              >

                {/* Card */}
                <div className="relative p-6 transition-all duration-300 border shadow-sm md:p-8 rounded-2xl bg-white/70 backdrop-blur-xl border-slate-100 hover:shadow-md">

                  {/* Icon */}
                  <div className="flex items-center justify-center w-12 h-12 mb-4 transition md:w-14 md:h-14 rounded-2xl bg-teal-50 group-hover:bg-teal-100">
                    <Icon className="w-6 h-6 text-teal-600" />
                  </div>

                  {/* Number */}
                  <div className="text-3xl md:text-4xl font-semibold text-[#0F172A]">
                    <CountUp
                      target={item.value}
                      suffix={item.suffix}
                      start={inView}
                    />
                  </div>

                  {/* Label */}
                  <p className="mt-1 text-sm text-slate-500">
                    {item.label}
                  </p>

                </div>

              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
}