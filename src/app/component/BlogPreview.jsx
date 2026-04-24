'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const posts = [
  {
    id: 1,
    title: '5 Signs You Need to See a Dentist Immediately',
    excerpt:
      "Ignoring early dental symptoms can lead to serious infection. Learn the warning signs every patient should know.",
    category: 'Oral Health',
    readTime: '4 min read',
    date: 'July 12, 2025',
    img: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&q=80',
    slug: '5-signs-you-need-dentist',
  },
  {
    id: 2,
    title: 'How to Make Teeth Whitening Last Longer',
    excerpt:
      'Dentist-approved care routine to maintain whitening results and protect enamel health long-term.',
    category: 'Cosmetic Dentistry',
    readTime: '3 min read',
    date: 'June 28, 2025',
    img: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&q=80',
    slug: 'teeth-whitening-tips',
  },
  {
    id: 3,
    title: "A Parent's Guide to Kids' First Dental Visit",
    excerpt:
      'Step-by-step guidance to make your child’s first dental visit calm, positive, and fear-free.',
    category: 'Pediatric Dentistry',
    readTime: '5 min read',
    date: 'June 10, 2025',
    img: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=600&q=80',
    slug: 'kids-first-dental-visit',
  },
];

const categoryColors = {
  'Oral Health': 'bg-teal-50 text-teal-600',
  'Cosmetic Dentistry': 'bg-violet-50 text-violet-600',
  'Pediatric Dentistry': 'bg-emerald-50 text-emerald-600',
};

export default function Blog() {
  return (
    <section className="py-24 bg-gradient-to-b from-white via-slate-50 to-white relative overflow-hidden">

      {/* subtle background glow */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-teal-100/20 blur-3xl rounded-full" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-100/20 blur-3xl rounded-full" />

      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-xs px-4 py-1 rounded-full bg-teal-50 text-teal-600 border border-teal-100">
            Dental Tips & Insights
          </span>

          <h2 className="text-4xl font-bold mt-4 text-slate-900">
            Dental Insights for a{' '}
            <span className="text-teal-500">Healthier Smile</span>
          </h2>

          <p className="text-slate-500 mt-3 leading-relaxed">
            Trusted dental knowledge from experienced doctors in Dhaka.
            Helping you stay safe, informed, and confident before treatment.
          </p>
        </motion.div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="group bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden cursor-pointer"
            >

              {/* IMAGE */}
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={post.img}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                <span className={`absolute top-4 left-4 text-xs px-3 py-1 rounded-full ${categoryColors[post.category]}`}>
                  {post.category}
                </span>
              </div>

              {/* CONTENT */}
              <div className="p-6">

                <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                  <Clock size={14} />
                  {post.readTime}
                  <span>•</span>
                  {post.date}
                </div>

                <h3 className="font-semibold text-slate-900 group-hover:text-teal-600 transition leading-snug">
                  {post.title}
                </h3>

                <p className="text-sm text-slate-500 mt-2 line-clamp-2">
                  {post.excerpt}
                </p>

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 mt-5 text-teal-600 text-sm font-medium group-hover:gap-3 transition-all"
                >
                  Read More
                  <ArrowRight size={16} />
                </Link>

              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}