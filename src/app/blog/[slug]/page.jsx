import { blogs } from "@/data/blogs";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Clock, Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function BlogDetails({ params }) {
  const { slug } = await params;
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    return notFound(); // Standard Next.js 404
  }

  return (
    <article className="min-h-screen bg-white pb-20">
      {/* Hero Header */}
      <header className="max-w-4xl mx-auto pt-16 px-6">
        <Link 
          href="/blog" 
          className="flex items-center gap-2 text-slate-500 hover:text-teal-600 transition-colors mb-8 group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to Articles
        </Link>

        <div className="space-y-4 mb-10">
          <span className="px-3 py-1 rounded-full bg-teal-50 text-teal-600 text-sm font-medium border border-teal-100">
            {blog.category}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
            {blog.title}
          </h1>
          <div className="flex items-center gap-6 text-slate-500 text-sm pt-2">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              {blog.date}
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              {blog.readTime}
            </div>
          </div>
        </div>

        <div className="relative h-[300px] md:h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            priority
            className="object-cover"
          />
        </div>
      </header>

      {/* Content Section */}
      <div className="max-w-3xl mx-auto px-6 mt-16">
        <div className="prose prose-slate prose-lg lg:prose-xl">
          {blog.content.map((item, i) => {
            if (item.type === "paragraph") {
              return (
                <p key={i} className="text-slate-600 leading-relaxed mb-6">
                  {item.text}
                </p>
              );
            }
            if (item.type === "heading") {
              return (
                <h2 key={i} className="text-2xl md:text-3xl font-bold text-slate-900 mt-12 mb-6">
                  {item.text}
                </h2>
              );
            }
            if (item.type === "list") {
              return (
                <ul key={i} className="space-y-4 my-8">
                  {item.items.map((li, idx) => (
                    <li key={idx} className="flex gap-3 text-slate-600">
                      <span className="h-2 w-2 rounded-full bg-teal-500 mt-2.5 flex-shrink-0" />
                      {li}
                    </li>
                  ))}
                </ul>
              );
            }
            return null;
          })}
        </div>

        {/* Footer CTA */}
        <div className="mt-20 p-8 rounded-3xl bg-slate-50 border border-slate-100 text-center">
          <h3 className="text-xl font-bold text-slate-900">Need dental advice?</h3>
          <p className="text-slate-500 mt-2 mb-6">Book an appointment with our experts today.</p>
          <button className="bg-teal-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-teal-700 transition shadow-lg shadow-teal-200">
            Book Appointment
          </button>
        </div>
      </div>
    </article>
  );
}