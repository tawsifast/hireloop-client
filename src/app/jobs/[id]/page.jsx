import { getJobById } from "@/lib/api/jobs";
import React from "react";
import { Button } from "@heroui/react";
import {
  Briefcase,
  MapPin,
  Calendar,
  ArrowRight,
  CircleDollar,
} from "@gravity-ui/icons";

const JobDetailsPage = async ({ params }) => {
  const { id } = await params;
  const job = await getJobById(id);

  if (!job) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-white space-y-4">
        <h2 className="text-xl font-bold">Job Post Not Found</h2>
        <p className="text-zinc-400 text-sm">
          The listing you are searching for might have expired or been removed.
        </p>
      </div>
    );
  }

  // Clean human-readable date presentation formatting
  const formattedDeadline = new Date(job.deadline).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen text-zinc-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* 1. HERO HEADER BANNER FRAMEWORK */}
        <div className="bg-[#1c1c1e] border border-white/5 rounded-[24px] p-6 sm:p-8 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-5">
            {/* Company Branding Thumbnail View */}
            {job.companyLogo ? (
              <img
                src={job.companyLogo}
                alt={`${job.companyName} Logo`}
                className="w-16 h-16 rounded-2xl object-contain bg-white/5 p-2 border border-white/10 shrink-0"
              />
            ) : (
              /* FIXED: Used native SVG fallback to avoid "Building" export mismatch */
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 shrink-0">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="8" height="18" x="3" y="3" rx="2" />
                  <rect width="8" height="12" x="13" y="9" rx="2" />
                  <path d="M7 7h.01M7 11h.01M7 15h.01M17 13h.01M17 17h.01" />
                </svg>
              </div>
            )}

            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                {job.title}
              </h1>
              <p className="text-zinc-400 font-medium flex items-center gap-1.5 text-sm sm:text-base">
                {job.companyName}
              </p>
            </div>
          </div>

          {/* Primary Trigger Submission Action Element */}
          <Button
            size="lg"
            className="bg-white text-black font-bold h-12 px-6 rounded-xl hover:bg-zinc-200 transition-colors w-full md:w-auto flex items-center justify-center gap-2"
          >
            <span>Apply Now</span>
            <ArrowRight width={16} height={16} />
          </Button>
        </div>

        {/* 2. SPECIFICATION MATRIX GRID OVERVIEW */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Job Type Pill */}
          <div className="bg-[#1c1c1e] border border-white/5 p-4 rounded-2xl flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
              <Briefcase width={16} height={16} />
            </div>
            <div>
              <p className="text-[11px] text-zinc-500 uppercase font-semibold tracking-wider">
                Job Type
              </p>
              <p className="text-xs sm:text-sm font-medium text-zinc-200">
                {job.type} {job.remote && "(Remote)"}
              </p>
            </div>
          </div>

          {/* Location Pill */}
          <div className="bg-[#1c1c1e] border border-white/5 p-4 rounded-2xl flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
              <MapPin width={16} height={16} />
            </div>
            <div>
              <p className="text-[11px] text-zinc-500 uppercase font-semibold tracking-wider">
                Location
              </p>
              <p className="text-xs sm:text-sm font-medium text-zinc-200">
                {job.city}, {job.country}
              </p>
            </div>
          </div>

          {/* Salary Pill */}
          <div className="bg-[#1c1c1e] border border-white/5 p-4 rounded-2xl flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 shrink-0">
              <CircleDollar width={16} height={16} />
            </div>
            <div>
              <p className="text-[11px] text-zinc-500 uppercase font-semibold tracking-wider">
                Salary Range
              </p>
              <p className="text-xs sm:text-sm font-medium text-zinc-200">
                {job.salaryMin?.toLocaleString()} -{" "}
                {job.salaryMax?.toLocaleString()} {job.currency}
              </p>
            </div>
          </div>

          {/* Target Expiry Deadline Pill */}
          <div className="bg-[#1c1c1e] border border-white/5 p-4 rounded-2xl flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 shrink-0">
              <Calendar width={16} height={16} />
            </div>
            <div>
              <p className="text-[11px] text-zinc-500 uppercase font-semibold tracking-wider">
                Deadline
              </p>
              <p className="text-xs sm:text-sm font-medium text-zinc-200">
                {formattedDeadline}
              </p>
            </div>
          </div>
        </div>

        {/* 3. CORE JOB SPECIFICATIONS AND DESCRIPTIONS CONTENT CARD */}
        <div className="bg-[#1c1c1e] border border-white/5 rounded-[24px] p-6 sm:p-8 shadow-xl space-y-8">
          {/* Responsibilities Subsection */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-white border-l-4 border-blue-500 pl-3">
              Core Responsibilities
            </h3>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed whitespace-pre-line">
              {job.responsibilities}
            </p>
          </div>

          <hr className="border-white/5" />

          {/* Requirements Subsection */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-white border-l-4 border-purple-500 pl-3">
              Experience & Requirements
            </h3>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed whitespace-pre-line">
              {job.requirements}
            </p>
          </div>

          <hr className="border-white/5" />

          {/* Benefits Subsection */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-white border-l-4 border-green-500 pl-3">
              Compensation & Benefits
            </h3>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed whitespace-pre-line">
              {job.benefits}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
