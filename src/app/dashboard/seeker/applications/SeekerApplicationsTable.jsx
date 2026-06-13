"use client";

import React, { useMemo, useState } from "react";
import { Pagination, Button } from "@heroui/react";
import Link from "next/link";

// Formatted utility function to display friendly timeline streams
const formatTimeAgo = (dateString) => {
  if (!dateString) return "N/A";
  const now = new Date();
  const past = new Date(dateString);
  const diffMs = now - past;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 60) return `${Math.max(1, diffMins)} minutes ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
};

// Colored dynamic UI state maps according to dashboard design styles
const getStatusStyles = (status = "Applied") => {
  const norm = status.toLowerCase();
  if (norm === "shortlisted") return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
  if (norm === "rejected") return "bg-red-500/10 text-red-400 border-red-500/20";
  if (norm === "review" || norm === "interview") return "bg-amber-500/10 text-amber-400 border-amber-500/20";
  if (norm === "offered") return "bg-purple-500/10 text-purple-400 border-purple-500/20";
  return "bg-zinc-500/10 text-zinc-300 border-white/5"; // Default Applied state
};

export default function SeekerApplicationsTable({ initialData = [] }) {
  const [page, setPage] = useState(1);
  const ROWS_PER_PAGE = 5;

  const totalPages = Math.ceil(initialData.length / ROWS_PER_PAGE) || 1;

  const paginatedItems = useMemo(() => {
    const start = (page - 1) * ROWS_PER_PAGE;
    return initialData.slice(start, start + ROWS_PER_PAGE);
  }, [page, initialData]);

  const startRow = initialData.length === 0 ? 0 : (page - 1) * ROWS_PER_PAGE + 1;
  const endRow = Math.min(page * ROWS_PER_PAGE, initialData.length);

  return (
    <div className="bg-[#1c1c1e] border border-white/5 rounded-2xl overflow-hidden shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-175">
          <thead>
            <tr className="border-b border-white/5 text-zinc-500 text-xs font-semibold uppercase tracking-wider">
              <th className="px-6 py-4">Job Title</th>
              <th className="px-6 py-4">Company</th>
              <th className="px-6 py-4">Applied</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/3">
            {paginatedItems.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-12 text-zinc-500 text-sm">
                  No applications submitted yet.
                </td>
              </tr>
            ) : (
              paginatedItems.map((app) => (
                <tr key={app._id} className="hover:bg-white/1 transition-colors group">
                  
                  {/* JOB TITLE & LOGO WRAPPER */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-zinc-800 rounded-xl border border-white/5 flex items-center justify-center text-xs font-bold text-zinc-400 group-hover:border-white/20 transition-colors">
                        {app.jobTitle?.substring(0, 2).toUpperCase() || "JB"}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
                          {app.jobTitle || "Backend Engineer"}
                        </p>
                        <p className="text-[11px] text-zinc-500 mt-0.5">Full-time • Remote</p>
                      </div>
                    </div>
                  </td>

                  {/* COMPANY NAME CONTAINER */}
                  <td className="px-6 py-4 text-sm font-medium text-zinc-300">
                    {app.companyName || "Stark Industries"}
                  </td>

                  {/* DATE TIMELINE METRIC */}
                  <td className="px-6 py-4 text-xs text-zinc-400">
                    {formatTimeAgo(app.createdAt)}
                  </td>

                  {/* STATUS UI ACCENT PILL */}
                  <td className="px-6 py-4">
                    <span className={`inline-block px-2.5 py-1 text-[11px] font-bold tracking-wide rounded-full border ${getStatusStyles(app.status)}`}>
                      {app.status || "Applied"}
                    </span>
                  </td>

                  {/* INTERACTIVE ACTION TRIGGER ROUTER */}
                  <td className="px-6 py-4 text-right">
                    <Link href={`/dashboard/seeker/applications/${app._id}`}>
                      <Button 
                        size="sm" 
                        variant="light" 
                        className="text-zinc-400 hover:text-white font-medium text-xs rounded-lg px-3"
                      >
                        Details
                      </Button>
                    </Link>
                  </td>

                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* FOOTER PAGINATION PANEL */}
      {initialData.length > 0 && (
        <div className="border-t border-white/5 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/1">
          <p className="text-sm text-zinc-500">
            Showing <span className="text-zinc-300 font-medium">{startRow} - {endRow}</span> of <span className="text-zinc-300 font-medium">{initialData.length}</span> applications
          </p>
          
          {/* FIXED: Removed internal DOM classNames template map to prevent React warnings */}
          <Pagination
            total={totalPages}
            page={page}
            onChange={(newPage) => setPage(newPage)}
            size="sm"
            variant="flat"
            color="default"
          />
        </div>
      )}
    </div>
  );
}