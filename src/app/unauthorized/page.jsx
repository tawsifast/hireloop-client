"use client";

import React from "react";
import { Button } from "@heroui/react";
import { ShieldExclamation, ArrowLeft, House } from "@gravity-ui/icons";
import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center text-zinc-100 px-4 py-12 bg-black">
      <div className="max-w-md w-full bg-[#1c1c1e] border border-white/5 rounded-[32px] p-8 text-center shadow-2xl relative overflow-hidden">
        
        {/* Subtle top amber warning glow bar */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-500 to-orange-500" />

        {/* RESTRICTED ACCESS ICON */}
        <div className="w-16 h-16 bg-amber-500/10 text-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-amber-500/20 shadow-inner">
          <ShieldExclamation width={32} height={32} strokeWidth={2} />
        </div>

        {/* ERROR MESSAGES */}
        <div className="space-y-2 mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            403: Access Denied
          </h1>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Oops! You don't have the required permissions to view this resource or page layout.
          </p>
          <p className="text-zinc-500 text-xs">
            Please make sure you are logged into the correct account tier.
          </p>
        </div>

        {/* ACTION BUTTONS LAYER */}
        <div className="space-y-3">
          <Link href="/" className="block w-full">
            <Button
              className="w-full bg-white text-black font-bold h-11 rounded-xl text-xs hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-white/5"
            >
              <House width={14} height={14} />
              Return to Homepage
            </Button>
          </Link>
          
          <Button
            onClick={() => window.history.back()}
            variant="bordered"
            className="w-full border-white/10 text-zinc-400 h-11 rounded-xl text-xs hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft width={14} height={14} />
            Go Back
          </Button>
        </div>

        {/* LOG IN / SWITCH ACCOUNT LINK FOOTER */}
        <p className="text-[11px] text-zinc-500 mt-8">
          Need to switch profiles?{" "}
          <Link 
            href="/signin" 
            className="text-zinc-400 font-semibold underline decoration-white/10 hover:text-white transition-colors"
          >
            Sign In Here
          </Link>
        </p>

      </div>
    </div>
  );
}