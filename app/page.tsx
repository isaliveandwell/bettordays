"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, Lock, Trophy, Users, Award, LineChart } from "lucide-react";

type Plan = {
  label: string;
  id: string;   // Whop plan id
  url?: string; // fallback URL
};

export default function BettorDaysLanding() {
  // Embed awareness (so Whop iframe behaves)
  const [isEmbedded, setIsEmbedded] = React.useState(false);
  React.useEffect(() => {
    try {
      const ref = document.referrer || "";
      setIsEmbedded(window.top !== window.self || ref.includes("whop.com"));
    } catch {
      setIsEmbedded(true);
    }
  }, []);

  // Load Whop checkout (overlay modal)
  React.useEffect(() => {
    if (document.getElementById("whop-checkout-js")) return;
    const s = document.createElement("script");
    s.src = "https://cdn.whop.com/js/checkout.js";
    s.async = true;
    s.id = "whop-checkout-js";
    document.body.appendChild(s);
  }, []);

  // Plans
  const plans: Plan[] = [
    { label: "1 Month — $99.95",   id: "plan_9QvCE95RhlgEs", url: "https://whop.com/checkout/plan_9QvCE95RhlgEs?d2c=true" },
    { label: "Lifetime — $299.95", id: "plan_748wKsMkaEdw9", url: "https://whop.com/checkout/plan_748wKsMkaEdw9?d2c=true" },
  ];
  const primaryPlan = plans[0];

  // Overlay + fallback
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

  const handleJoin = (plan: Plan) => (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
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
        const dest = plan.url || "#";
        try {
          if (isEmbedded) (window.top || window).location.href = dest;
          else window.location.href = dest;
        } catch {
          window.location.href = dest;
        }
      }
    };

    retriesRef.current = 0;
    attempt();
  };

  return (
    <>
      <main className="relative min-h-screen text-white flex items-center justify-center overflow-hidden p-5 sm:p-6 pt-[calc(env(safe-area-inset-top)+20px)] pb-[calc(env(safe-area-inset-bottom)+28px)]">
        {/* Background */}
        <div className="absolute inset-0 -z-20 bg-gradient-to-br from-[#02140a] via-[#053817] to-[#095a26]" />

        {/* Soft grid */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-[0.08]">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Glows */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ duration: 1 }}>
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full blur-3xl bg-[#7CFC00]/20" />
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ duration: 1.2, delay: 0.2 }}>
          <div className="absolute -bottom-32 -right-24 h-96 w-96 rounded-full blur-3xl bg-[#24c943]/20" />
        </motion.div>

        {/* Content */}
        <section className="relative z-10 text-center w-full max-w-[92rem] px-0 space-y-8">
          {/* Badge */}
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div className="mx-auto inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs sm:text-sm backdrop-blur-md border border-white/10 shadow-sm">
              <Trophy className="w-4 h-4 text-[#7CFC00]" />
              <span>High-roller community • $5M+ won • Daily picks</span>
            </div>
          </motion.div>

          {/* Hero */}
          <motion.div initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <div>
              <h1 className="mx-auto max-w-4xl text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.05]">
                <span className="block">Bettor Days</span>
                <span className="bg-gradient-to-r from-[#b7ff5a] via-white to-[#9cff2f] bg-clip-text text-transparent">
                  Bet smarter. Win more.
                </span>
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg md:text-xl text-gray-100/90">
                A private, invite-first community of high rollers sharing sharp plays, real-time line alerts, and strategy.
                Over $5,000,000 in member winnings reported. We highlight talented members with $100k+ results and reward
                consistent profitability.
              </p>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div id="plans" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.45 }}>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
              {plans.map((plan) => (
                <a
                  key={plan.id}
                  href={plan.url || "#"}
                  onClick={handleJoin(plan)}
                  aria-label={`Gain access to Bettor Days — ${plan.label}`}
                  title={`Gain access to Bettor Days — ${plan.label}`}
                  className={`group inline-flex h-14 px-7 sm:px-9 items-center justify-center rounded-3xl text-lg sm:text-xl font-extrabold text-black bg-[#7CFC00] hover:bg-[#66dd00] shadow-[0_8px_40px_rgba(124,252,0,0.35)] ring-4 ring-[#7CFC00]/35 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#7CFC00]/60 active:scale-[.99] transition ${openingPlan === plan.id ? "opacity-70 pointer-events-none" : ""}`}
                >
                  <span className="mr-2">{openingPlan === plan.id ? "Opening checkout…" : plan.label}</span>
                  <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
                </a>
              ))}
            </div>
            <div className="mt-2 flex items-center justify-center gap-2 text-sm text-gray-300">
              <Lock className="w-4 h-4" />
              <span>Secure Whop checkout</span>
            </div>
          </motion.div>

          {/* iPhone-first stats bar */}
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.45 }}>
            <div className="mx-auto grid max-w-5xl grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 text-left">
                <div className="flex items-center gap-3">
                  <LineChart className="w-5 h-5 text-[#7CFC00]" />
                  <span className="text-sm text-white/80">Last 90 days</span>
                </div>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold">73%</span>
                  <span className="text-white/70">hit rate</span>
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 text-left">
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-[#7CFC00]" />
                  <span className="text-sm text-white/80">Member highlights</span>
                </div>
                <div className="mt-1 text-3xl font-extrabold">$5M+</div>
                <div className="text-white/70">in total winnings reported by members</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 text-left">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-[#7CFC00]" />
                  <span className="text-sm text-white/80">Live bots</span>
                </div>
                <div className="mt-1 text-3xl font-extrabold">Real-time updates</div>
                <div className="text-white/70">auto-post line moves, results & entries</div>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Sticky mobile CTA (iPhone) */}
      <div className="fixed inset-x-0 bottom-0 sm:hidden z-50">
        <div className="backdrop-blur bg-black/70 border-t border-white/10 px-4 pt-2 pb-[calc(env(safe-area-inset-bottom)+12px)]">
          <button
            onClick={handleJoin(primaryPlan)}
            className="w-full h-12 rounded-2xl font-extrabold text-black bg-[#7CFC00] hover:bg-[#66dd00] shadow-[0_8px_30px_rgba(124,252,0,0.35)] active:scale-[.99]"
          >
            Join Monthly — $99.95
          </button>
          <a href="#plans" className="mt-2 block text-center text-xs text-white/70">See all options</a>
        </div>
      </div>
    </>
  );
}
