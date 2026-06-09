"use client";

import React, { useState } from "react";
import { Button, Accordion, AccordionItem } from "@heroui/react";
import { Check, ShieldExclamation, CircleQuestion } from "@gravity-ui/icons";
import Link from "next/link";

export default function PricingPage() {
  const [userType, setUserType] = useState("seeker"); // 'seeker' or 'recruiter'

  // Pricing Matrix Dataset
  const pricingData = {
    seeker: [
      {
        name: "Free",
        id: "seeker_free",
        price: "$0",
        period: "/forever",
        description:
          "Perfect for getting started and exploring active listings.",
        features: [
          "Browse & save up to 10 jobs",
          "Apply to up to 3 jobs per month",
          "Basic user profile layout",
          "Instant email alerts",
        ],
        buttonText: "Current Plan",
        popular: false,
      },
      {
        name: "Pro",
        id: "seeker_pro",
        price: "$19",
        period: "/month",
        description:
          "Accelerate your active daily career hunt with deep tracking tools.",
        features: [
          "Apply to up to 30 jobs per month",
          "Unlimited saved job listings",
          "Real-time application status tracking",
          "Salary insight statistics",
        ],
        buttonText: "Upgrade to Pro",
        popular: true,
      },
      {
        name: "Premium",
        id: "seeker_premium",
        price: "$39",
        period: "/month",
        description:
          "Maximum visibility and direct advantages for competitive roles.",
        features: [
          "Everything in Pro tier",
          "Unlimited monthly applications",
          "Profile boost rankings to top recruiters",
          "Early access to new job posts",
          "24/7 Priority technical support",
        ],
        buttonText: "Go Premium",
        popular: false,
      },
    ],
    recruiter: [
      {
        name: "Free",
        id: "recruiter_free",
        price: "$0",
        period: "/forever",
        description:
          "Great for single builders or test runs during your initial year.",
        features: [
          "Up to 3 active job posts",
          "Basic applicant profile management",
          "Standard public listing visibility",
          "Perfect for a company's first year",
        ],
        buttonText: "Start Free",
        popular: false,
      },
      {
        name: "Growth",
        id: "recruiter_growth",
        price: "$49",
        period: "/month",
        description:
          "Designed for small scaling teams with continuous hiring pipelines.",
        features: [
          "Up to 10 active job posts",
          "Advanced applicant system tracking",
          "Basic pipeline metric analytics",
          "Dedicated email support",
        ],
        buttonText: "Choose Growth",
        popular: true,
      },
      {
        name: "Enterprise",
        id: "recruiter_emterprise",
        price: "$149",
        period: "/month",
        description:
          "A complete command center for complex, high-velocity hiring needs.",
        features: [
          "Up to 50 active job posts",
          "Advanced custom analytics dashboard",
          "Featured job placement boosts",
          "Team collaboration workspace tools",
          "Custom corporate brand styling",
          "Priority 1-on-1 account support",
        ],
        buttonText: "Contact Sales",
        popular: false,
      },
    ],
  };

  // FAQ Accordion Structure
  const faqs = [
    {
      title: "Can I cancel my subscription anytime?",
      content:
        "Yes, absolutely. You can cancel your subscription at any point directly from your billing profile panel. Your premium access privileges will remain entirely functional until the end of your ongoing billing duration.",
    },
    {
      title: "How do application limits renew?",
      content:
        "For users on fixed quotas (like the Free or Seeker Pro tiers), application counters reset automatically on the 1st day of every calendar month.",
    },
    {
      title: "What payment methods do you accept?",
      content:
        "We securely accept all major global credit cards, debit accounts, and online processing gateways handled via our tokenized secure checkout infrastructure.",
    },
    {
      title: "Can I switch plans midway through the month?",
      content:
        "Of course! Upgrading plans takes effect immediately, and your remaining days are automatically calculated as a pro-rated credit. Downgrades apply starting next billing interval.",
    },
  ];

  return (
    <div className="min-h-screen text-zinc-100 py-16 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* HEADER BRANDING DESCRIPTIONS SECTION */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Flexible Plans for Everyone
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Choose the ideal path to accelerate your professional journey. Find
            a job or source top engineering talent with absolute clarity.
          </p>

          {/* CUSTOM INTERACTIVE CONTROL TOGGLE SWITCH */}
          <div className="pt-6 flex justify-center">
            <div className="bg-[#1c1c1e] p-1 rounded-xl border border-white/5 inline-flex items-center gap-1">
              <button
                onClick={() => setUserType("seeker")}
                className={`px-5 py-2 text-xs font-semibold rounded-lg transition-all duration-200 ${
                  userType === "seeker"
                    ? "bg-white text-black shadow"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                For Job Seekers
              </button>
              <button
                onClick={() => setUserType("recruiter")}
                className={`px-5 py-2 text-xs font-semibold rounded-lg transition-all duration-200 ${
                  userType === "recruiter"
                    ? "bg-white text-black shadow"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                For Recruiters
              </button>
            </div>
          </div>
        </div>

        {/* PRICING PLANS MATRIX GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {pricingData[userType].map((plan, index) => (
            <div
              key={index}
              className={`relative bg-[#1c1c1e] rounded-[24px] p-6 sm:p-8 flex flex-col justify-between transition-transform duration-200 border ${
                plan.popular
                  ? "border-blue-500 shadow-2xl shadow-blue-500/5 md:-translate-y-2"
                  : "border-white/5 hover:border-white/10"
              }`}
            >
              {/* Highlight Badge for Popular selections */}
              {plan.popular && (
                <span className="absolute -top-3 right-6 bg-blue-500 text-white text-[10px] uppercase tracking-widest font-extrabold px-3 py-1 rounded-full">
                  Most Popular
                </span>
              )}

              <div className="space-y-6">
                {/* Plan Metadata */}
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    {plan.name}
                  </h3>
                  <p className="text-zinc-400 text-xs mt-1.5 min-h-[32px] leading-relaxed">
                    {plan.description}
                  </p>
                </div>

                {/* Big Currency Metrics */}
                <div className="flex items-baseline">
                  <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-zinc-500 text-sm font-medium ml-1">
                    {plan.period}
                  </span>
                </div>

                <hr className="border-white/5" />

                {/* Features Checklist mapping */}
                <ul className="space-y-3.5">
                  {plan.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300"
                    >
                      <div className="mt-0.5 w-4 h-4 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0">
                        <Check width={10} height={10} strokeWidth={3} />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Form trigger submission layout buttons */}
              <div className="pt-8">
                <form action="/api/checkout_sessions" method="POST">
                  <input type="hidden" name="plan_id" value={plan.id} />
                  <section>
                    <button type="submit" role="link"
                     className={`w-full font-bold h-11 rounded-xl text-xs ${
                    plan.popular
                      ? "bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-600/20"
                      : plan.name === "Free" && userType === "seeker"
                        ? "bg-zinc-800 text-zinc-400 cursor-not-allowed border border-white/5"
                        : "bg-white text-black hover:bg-zinc-200"
                  }`}
                    >
                      Checkout
                    </button>
                  </section>
                </form>
                {/* <Link
                  href={"/"}
                 
                  disabled={plan.name === "Free" && userType === "seeker"}
                >
                  {plan.buttonText}
                </Link> */}
              </div>
            </div>
          ))}
        </div>

        <hr className="border-white/5 max-w-4xl mx-auto" />

        {/* FAQ GRID ACCORDION CONTAINER */}
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <div className="w-8 h-8 bg-zinc-900 border border-white/5 text-zinc-400 rounded-lg flex items-center justify-center mx-auto mb-2">
              <CircleQuestion width={16} height={16} />
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500">
              Everything you need to know about plans and billing.
            </p>
          </div>

          <Accordion
            className="w-full px-0"
            selectionMode="multiple"
            itemClasses={{
              base: "border-b border-white/5 py-1",
              title:
                "text-zinc-200 text-sm font-semibold hover:text-white transition-colors",
              trigger: "py-4 outline-none focus-visible:text-blue-400",
              content:
                "text-zinc-400 text-xs sm:text-sm leading-relaxed pb-4 pr-4",
              indicator: "text-zinc-500",
            }}
          >
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                title={faq.title}
                aria-label={faq.title}
              >
                {faq.content}
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
