import { redirect } from 'next/navigation';
import { stripe } from '@/lib/stripe';
import React from 'react';
import { Button } from "@heroui/react";
import { CircleCheck, Envelope, ArrowLeft } from "@gravity-ui/icons";
import Link from 'next/link';
import { createSubscription } from '@/lib/actions/subscriptions';

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error('Please provide a valid session_id (`cs_test_...`)');
  }

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  });

  const { status, customer_details, metadata } = session;
  const customerEmail = customer_details?.email;

  if (status === 'open') {
    return redirect('/');
  }

  if (status === 'complete') {

    const subsInfo = {
      email : customerEmail,
      planId : metadata.planId,
    }

    // update the user tabel about the new plan

    const result = await createSubscription(subsInfo);
    console.log(result);

    return (
      <div className="min-h-[85vh] flex flex-col items-center justify-center text-zinc-100 px-4 py-12 bg-black">
        <div className="max-w-md w-full bg-[#1c1c1e] border border-white/5 rounded-[32px] p-8 text-center shadow-2xl relative overflow-hidden">
          
          {/* Subtle top glow bar */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500 to-teal-400" />

          {/* SUCCESS ANIMATED CONTEXT ACCENT ICON */}
          <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-emerald-500/20 shadow-inner">
            <CircleCheck width={32} height={32} strokeWidth={2.5} />
          </div>

          {/* HEADLINE TEXT BLOCK */}
          <div className="space-y-2 mb-6">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Payment Successful!
            </h1>
            <p className="text-zinc-400 text-sm leading-relaxed">
              We appreciate your business. Your HireLoop profile privileges have been instantly upgraded!
            </p>
          </div>

          {/* DYNAMIC CONFIRMATION INFO CARD */}
          {customerEmail && (
            <div className="bg-[#1f2937]/30 border border-white/5 rounded-2xl p-4 mb-8 flex items-start gap-3 text-left">
              <div className="mt-0.5 text-zinc-400 shrink-0">
                <Envelope width={16} height={16} />
              </div>
              <div className="space-y-1">
                <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
                  Confirmation Sent To
                </p>
                <p className="text-xs sm:text-sm font-medium text-zinc-200 break-all">
                  {customerEmail}
                </p>
              </div>
            </div>
          )}

          {/* ACTION NAVIGATION LAYER */}
          <div className="space-y-3">
            {/* FIXED: Wrapped Button elements inside Next.js Link instead of using "as" */}
            <Link href="/dashboard" className="block w-full">
              <Button
                className="w-full bg-white text-black font-bold h-11 rounded-xl text-xs hover:bg-zinc-200 transition-colors shadow-lg shadow-white/5"
              >
                Go to My Dashboard
              </Button>
            </Link>
            
            <Link href="/" className="block w-full">
              <Button
                variant="bordered"
                className="w-full border-white/10 text-zinc-400 h-11 rounded-xl text-xs hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeft width={14} height={14} />
                Back to Home
              </Button>
            </Link>
          </div>

          {/* SUPPORT FOOTER */}
          <p className="text-[11px] text-zinc-500 mt-8">
            Got questions? Drop us a line at{" "}
            <a 
              href="mailto:support@hireloop.com" 
              className="text-zinc-400 underline decoration-white/10 hover:text-white transition-colors"
            >
              support@hireloop.com
            </a>
          </p>

        </div>
      </div>
    );
  }
}