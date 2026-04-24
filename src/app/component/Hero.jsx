"use client";

import Image from "next/image";
import { ChevronRight, Phone } from "lucide-react";

const IMAGES = [
  "https://i.postimg.cc/4nCXJMSB/hero-image-1.jpg",
  "https://i.postimg.cc/FH4JpnHf/hero-image-2.jpg",
  "https://i.postimg.cc/JnvskpFD/hero-image-3.jpg",
  "https://i.postimg.cc/gk9wcB8n/hero-image-4.png",
  "https://i.postimg.cc/0NHQTtPV/hero-image-5.jpg",
];

export default function Hero() {
  return (
    <section className="flex items-center min-h-screen pt-24 bg-white md:pt-28 lg:pt-32">
      <div className="grid items-center grid-cols-1 gap-10 px-4 py-10 mx-auto max-w-7xl sm:px-6 lg:px-12 lg:grid-cols-2 lg:gap-14">

        {/* LEFT CONTENT */}
        <div className="space-y-5 text-center lg:text-left">

          <p className="text-xs font-medium tracking-widest text-teal-600 uppercase sm:text-sm">
            World-Class Dental Care
          </p>

          <h1 className="text-3xl font-semibold leading-tight text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl">
            Exceptional dental care for every stage of your journey
          </h1>

          <p className="max-w-lg mx-auto text-sm text-gray-500 lg:mx-0 sm:text-base">
            We are committed to providing top-notch dental care in a comfortable and friendly environment.
          </p>

          {/* CTA */}
          <div className="flex flex-col items-center justify-center gap-3 pt-3 sm:flex-row sm:gap-4 lg:justify-start">

            <button className="flex items-center justify-center w-full gap-2 px-6 py-3 text-white transition bg-teal-600 shadow-md sm:w-auto rounded-xl hover:bg-teal-700">
              Book Appointment
              <ChevronRight className="w-4 h-4" />
            </button>

            <a
              href="tel:+8801800000000"
              className="flex items-center justify-center w-full gap-2 px-5 py-3 text-gray-700 transition border sm:w-auto rounded-xl hover:bg-gray-100"
            >
              <Phone className="w-4 h-4" />
              Call Now
            </a>

          </div>

          {/* FEATURES */}
          <div className="grid grid-cols-3 gap-3 pt-6 mt-6 text-xs text-center text-gray-600 border-t sm:gap-6 sm:text-sm lg:text-left">

            <div>
              <p className="font-semibold text-gray-900">Experience</p>
              <p>Expert Doctor</p>
            </div>

            <div>
              <p className="font-semibold text-gray-900">Personalized</p>
              <p>Care</p>
            </div>

            <div>
              <p className="font-semibold text-gray-900">Flexible</p>
              <p>Payment</p>
            </div>

          </div>

        </div>

        {/* RIGHT IMAGE COLLAGE */}
        <div className="relative w-full">

          {/* MOBILE: SIMPLE STACK */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:hidden">
            {IMAGES.slice(0, 4).map((img, i) => (
              <div
                key={i}
                className={`relative overflow-hidden rounded-2xl shadow-md ${
                  i === 0 || i === 3 ? "h-40" : "h-28"
                }`}
              >
                <Image
                  src={img}
                  alt="Dental care"
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          {/* DESKTOP: ORIGINAL COLLAGE */}
          <div className="hidden lg:flex justify-center gap-4 h-[600px]">

            {/* Column 1 */}
            <div className="flex flex-col justify-center gap-4">
              <div className="w-[160px] xl:w-[180px] h-[240px] relative rounded-[30px] overflow-hidden shadow-lg">
                <Image src={IMAGES[0]} alt="" fill className="object-cover" />
              </div>
              <div className="w-[160px] xl:w-[180px] h-[170px] relative rounded-[30px] overflow-hidden shadow-lg">
                <Image src={IMAGES[4]} alt="" fill className="object-cover" />
              </div>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-4">
              <div className="w-[160px] xl:w-[180px] h-[170px] relative rounded-[30px] overflow-hidden shadow-lg">
                <Image src={IMAGES[1]} alt="" fill className="object-cover" />
              </div>
              <div className="w-[160px] xl:w-[180px] h-[240px] relative rounded-[30px] overflow-hidden shadow-lg">
                <Image src={IMAGES[2]} alt="" fill className="object-cover" />
              </div>
            </div>

            {/* Column 3 */}
            <div className="flex items-center">
              <div className="w-[180px] xl:w-[200px] h-[420px] relative rounded-[40px] overflow-hidden shadow-xl">
                <Image src={IMAGES[3]} alt="" fill className="object-cover" />
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}