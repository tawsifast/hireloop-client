'use client';

import React from 'react';
import { Card, Button, Chip } from '@heroui/react';
import { MapPin, Briefcase, CircleDollar, ArrowRight } from '@gravity-ui/icons';
import Link from 'next/link';

export default function JobCard({ job }) {
  // Destructure with fallbacks from your MongoDB data schema
  const {
    title,
    type,
    salaryMin,
    salaryMax,
    currency,
    city,
    country,
    remote,
    companyName,
    companyLogo,
    _id
  } = job || {};

  // Safely grab the document ID string
  const jobId = _id?.$oid || _id || "";

  // Dynamic formatting string structures
  const displayLocation = remote ? "Remote" : `${city || ''}, ${country || ''}`;
  
  const formatSalary = () => {
    if (!salaryMin && !salaryMax) return "Salary Undisclosed";
    
    // Formats numbers with readable local comma notation (e.g. 70,000)
    const minFormatted = salaryMin ? salaryMin.toLocaleString() : '';
    const maxFormatted = salaryMax ? salaryMax.toLocaleString() : '';
    
    if (salaryMin && salaryMax) return `${minFormatted}–${maxFormatted} ${currency}`;
    return `${minFormatted || maxFormatted} ${currency}`;
  };

  return (
    <Card 
      className="max-w-md w-full bg-[#121214] border border-white/5 p-6 rounded-[28px] shadow-2xl hover:border-white/10 transition-all duration-300 group"
      shadow="none"
    >
      <div className="flex flex-col h-full space-y-5">
        
        {/* HEADER: COMPANY LOGO & NAME RELATION */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 p-1.5 flex items-center justify-center overflow-hidden shrink-0">
            {companyLogo ? (
              <img 
                src={companyLogo} 
                alt={`${companyName} logo`} 
                className="w-full h-full object-contain"
                onError={(e) => { e.target.src = "https://placehold.co/100?text=HL"; }}
              />
            ) : (
              <Briefcase className="text-zinc-500" width={18} height={18} />
            )}
          </div>
          <span className="text-zinc-400 text-sm font-medium tracking-wide">
            {companyName}
          </span>
        </div>

        {/* PROFILE CRITERIA: TITLE & SUBHEAD DESCRIPTION */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-white group-hover:text-zinc-200 transition-colors">
            {title}
          </h2>
          <p className="text-zinc-400 text-sm font-normal line-clamp-2 leading-relaxed">
            Showcase your commitment to diversity and inclusion by highlighting initiatives and operational skills.
          </p>
        </div>

        {/* METRICS & SPECIFICATIONS: METADATA CHIPS CONTAINER */}
        <div className="flex flex-wrap gap-2 pt-1">
          {/* LOCATION INFO */}
          <Chip
            startcontent={<MapPin className="text-[#d946ef] mt-0.5" width={13} height={13} />}
            className="bg-white/[0.04] border border-white/5 text-zinc-200 h-8 text-xs font-medium px-3 rounded-full"
            variant="flat"
          >
            {displayLocation}
          </Chip>

          {/* EMPLOYMENT TYPE */}
          <Chip
            startcontent={<Briefcase className="text-[#d946ef] mt-0.5" width={13} height={13} />}
            className="bg-white/[0.04] border border-white/5 text-zinc-200 h-8 text-xs font-medium px-3 rounded-full"
            variant="flat"
          >
            {type}
          </Chip>

          {/* FINANCIAL SALARY VALUE FRAME */}
          <Chip
            startcontent={<CircleDollar className="text-[#d946ef] mt-0.5" width={13} height={13} />}
            className="bg-white/[0.04] border border-white/5 text-zinc-200 h-8 text-xs font-medium px-3 rounded-full"
            variant="flat"
          >
            {formatSalary()}
          </Chip>
        </div>

        {/* ACTIONS PANEL: LINK TRIGGERS */}
        <div className="pt-3 mt-auto">
          <Link
            href={`/jobs/${jobId}`}
            variant="light"
            className="inline-flex items-center gap-2 p-0 text-white font-medium hover:text-zinc-300 text-sm bg-transparent min-w-0 h-auto rounded-none data-[hover=true]:bg-transparent transition-colors"
            
          >
            Apply Now
            <ArrowRight 
              className="text-white transform group-hover:translate-x-1 transition-transform duration-200" 
              width={16} 
              height={16} 
            />
          </Link>
        </div>

      </div>
    </Card>
  );
}