"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, Lock, Trophy } from "lucide-react";

export default function BettorDaysLanding() {
  // 👉 Add your image URLs below. If empty, the gallery stays hidden.
  // images[0] will be used as a subtle hero background overlay if provided.
  const images: string[] = [
    // "/your-hero.jpg",
    // "/your-first-image.jpg",
    // "/your-second-image.jpg",
  ];

  return (
    <main className="relative min-h-screen text-white flex items-center justify-center p-5 sm:p-6 overflow-hidden pt-[calc(env(safe-area-inset-top)+16px)] pb-[calc(env(safe-area-inset-bottom)+24px)]">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        {images[0] && (
          <div
            className="absolute inset-0 bg-center bg-cover opacity-20"
            style={{ backgroundImage: `url(${images[0]})` }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-br from-[#00190a] via-[#013d16] to-[#026920]" />
      </div>

      {/* Content */}
      <section className="text-center w-full max-w-xl sm:max-w-2xl md:max-w-3xl space-y-7 sm:space-y-8">
        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs sm:text-sm backdrop-blur-sm"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Trophy className="w-4 h-4 text-[#7CFC00]" />
          <span>Private group • Daily picks • Live alerts</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Bettor Days
          <span className="block text-[#7CFC00]">Bet smarter. Win more.</span>
        </motion.h1>

        {/* CENTERED CTA (all devices) */}
        <motion.div
          className="flex flex-col items-center gap-3"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.45 }}
        >
          <a
            href="https://whop.com/rakko-was-board"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Gain access to Bettor Days on Whop"
            title="Gain access to Bettor Days"
            className="inline-flex h-14 px-10 items-center justify-center rounded-3xl text-xl font-extrabold bg-[#7CFC00] text-black hover:bg-[#66dd00] shadow-[0_10px_30px_rgba(124,252,0,0.35)] ring-4 ring-[#7CFC00]/40 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#7CFC00]/60 active:scale-[.99]"
          >
            Gain access to Bettor Days <ArrowRight className="ml-2" />
          </a>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <Lock className="w-4 h-4" />
            <span>Secure Whop checkout</span>
          </div>
        </motion.div>

        {/* Subhead */}
        <motion.p
          className="text-base sm:text-lg md:text-xl text-gray-100/90"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Daily, data‑backed plays with clear reasoning and real‑time alerts. Join the private group and
          start placing sharper tickets today.
        </motion.p>

        {/* Quick benefits */}
        <motion.ul
          className="grid grid-cols-1 md:grid-cols-3 gap-2.5 sm:gap-3 pt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {[
            "Daily picks",
            "Private Discord access",
            "Live line alerts",
          ].map((t, i) => (
            <li key={i} className="flex items-center justify-center gap-2 bg-white/10 rounded-xl py-3 px-4 border border-white/10">
              <CheckCircle className="text-[#7CFC00] w-5 h-5" />
              <span className="text-sm md:text-base text-gray-100">{t}</span>
            </li>
          ))}
        </motion.ul>

        {/* Image gallery (optional) */}
        {images.length > 1 && (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-3 pt-4 sm:pt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.5 }}
          >
            {images.slice(0, 3).map((src, i) => (
              <div key={i} className="overflow-hidden rounded-2xl bg-white/5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="Bettor Days" className="w-full h-36 sm:h-44 md:h-48 object-cover hover:scale-105 transition-transform" />
              </div>
            ))}
          </motion.div>
        )}
      </section>
    </main>
  );
}
