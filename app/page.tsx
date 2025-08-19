"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, Lock, Trophy } from "lucide-react";

type Plan = {
  label: string;
  id: string;   // Whop plan id
  url?: string; // optional fallback URL
};

export default function BettorDaysLanding() {
  const [isEmbedded, setIsEmbedded] = React.useState(false);
  React.useEffect(() => {
    try {
      const ref = document.referrer || "";
      setIsEmbedded(window.top !== window.self || ref.includes("whop.com"));
    } catch {
      setIsEmbedded(true);
    }
  }, []);

  React.useEffect(() => {
    if (document.getElementById("whop-checkout-js")) return;
    const s = document.createElement("script");
    s.src = "https://cdn.whop.com/js/checkout.js";
    s.async = true;
    s.id = "whop-checkout-js";
    document.body.appendChild(s);
  }, []);

  // ✅ Correct plans and prices
  const plans: Plan[] = [
    { label: "1 Month — $99.95",   id: "plan_9QvCE95RhlgEs", url: "https://whop.com/checkout/plan_9QvCE95RhlgEs?d2c=true" },
    { label: "Lifetime — $299.95", id: "plan_748wKsMkaEdw9", url: "https://whop.com/checkout/plan_748wKsMkaEdw9?d2c=true" },
  ];

  const images: string[] = [];

  const [openingPlan, setOpeningPlan] = React.useState<string | null>(null);
  const retriesRef = React.useRef(0);

  const tryOpenOverlay = (plan: Plan): boolean => {
    const whop: any = (window as any).WhopCheckout;
    if (whop && typeof whop.open === "function") {
      try {
        whop.open({ plan: plan.id });
        return true;
      } catch {}
    }
    return false;
  };

  const handleJoin = (plan: Plan) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setOpeningPlan(plan.id);

    const attempt = () => {
      if (tryOpenOverlay(plan)) {
        setOpeningPlan(null);
        return;
      }
      if (retriesRef.current < 8) {
        retriesRef.current += 1;
        setTimeout(attempt, 250);
      } else {
        setOpeningPlan(null);
        alert("Checkout overlay couldn't load right now. Please refresh and try again.");
      }
    };

    retriesRef.current = 0;
    attempt();
  };

  return (
    <main className="relative min-h-screen text-white flex items-center justify-center p-5 sm:p-6 overflow-hidden pt-[calc(env(safe-area-inset-top)+16px)] pb-[calc(env(safe-area-inset-bottom)+24px)]">
      <div className="absolute inset-0 -z-10">
        {images[0] && (
          <div
            className="absolute inset-0 bg-center bg-cover opacity-20"
            style={{ backgroundImage: `url(${images[0]})` }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-br from-[#00190a] via-[#013d16] to-[#026920]" />
      </div>

      <section className="text-center w-full max-w-xl sm:max-w-2xl md:max-w-3xl space-y-7 sm:space-y-8">
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs sm:text-sm backdrop-blur-sm">
            <Trophy className="w-4 h-4 text-[#7CFC00]" />
            <span>Private group • Daily picks • Live alerts</span>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Bettor Days
            <span className="block text-[#7CFC00]">Bet smarter. Win more.</span>
          </h1>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.45 }}>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
            {plans.map((plan) => (
              <a
                key={plan.id}
                href={plan.url || "#"}
                onClick={handleJoin(plan)}
                aria-label={`Gain access to Bettor Days — ${plan.label}`}
                title={`Gain access to Bettor Days — ${plan.label}`}
                className={`inline-flex h-14 px-6 sm:px-8 items-center justify-center rounded-3xl text-lg sm:text-xl font-extrabold bg-[#7CFC00] text-black hover:bg-[#66dd00] shadow-[0_10px_30px_rgba(124,252,0,0.35)] ring-4 ring-[#7CFC00]/40 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#7CFC00]/60 active:scale-[.99] ${openingPlan === plan.id ? "opacity-70 pointer-events-none" : ""}`}
              >
                {openingPlan === plan.id ? "Opening checkout…" : plan.label} <ArrowRight className="ml-2" />
              </a>
            ))}
          </div>
          <div className="mt-2 flex items-center justify-center gap-2 text-sm text-gray-300">
            <Lock className="w-4 h-4" />
            <span>Secure Whop checkout</span>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
          <p className="text-base sm:text-lg md:text-xl text-gray-100/90">
            Daily, data-backed plays with clear reasoning and real-time alerts. Join the private group and
            start placing sharper tickets today.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }}>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-2.5 sm:gap-3 pt-2">
            {["Daily picks", "Private Discord access", "Live line alerts"].map((t, i) => (
              <li key={i} className="flex items-center justify-center gap-2 bg-white/10 rounded-xl py-3 px-4 border border-white/10">
                <CheckCircle className="text-[#7CFC00] w-5 h-5" />
                <span className="text-sm md:text-base text-gray-100">{t}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {images.length > 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35, duration: 0.5 }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-3 pt-4 sm:pt-6">
              {images.slice(0, 3).map((src, i) => (
                <div key={i} className="overflow-hidden rounded-2xl bg-white/5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="Bettor Days" className="w-full h-36 sm:h-44 md:h-48 object-cover hover:scale-105 transition-transform" />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </section>
    </main>
  );
}
