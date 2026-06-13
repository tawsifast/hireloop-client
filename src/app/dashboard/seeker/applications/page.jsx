import { getApplicationsByApplicant } from '@/lib/api/applications';
import { getUserSession } from '@/lib/core/session';
import React from 'react';
import SeekerApplicationsTable from './SeekerApplicationsTable';

const ApplicationsPage = async () => {
  const user = await getUserSession();
  const jobs = await getApplicationsByApplicant(user.id) || [];

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-zinc-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">My Applications</h1>
            <p className="text-zinc-500 text-xs sm:text-sm mt-0.5">
              Track your job applications and interview progress in real-time.
            </p>
          </div>
          <button className="self-start sm:self-center bg-white text-black font-semibold text-xs px-4 py-2 rounded-xl hover:bg-zinc-200 transition-colors flex items-center gap-1.5 shadow-sm">
            <span>📥</span> Export PDF
          </button>
        </div>

        {/* METRIC CARD STATS GRID */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#1c1c1e] border border-white/5 p-5 rounded-2xl">
            <p className="text-zinc-500 text-[11px] font-semibold uppercase tracking-wider">Total Applied</p>
            <p className="text-2xl sm:text-3xl font-bold text-white mt-1">{jobs.length}</p>
          </div>
          <div className="bg-[#1c1c1e] border border-white/5 p-5 rounded-2xl">
            <p className="text-zinc-500 text-[11px] font-semibold uppercase tracking-wider">Shortlisted</p>
            <p className="text-2xl sm:text-3xl font-bold text-white mt-1">
              {jobs.filter(a => a.status?.toLowerCase() === 'shortlisted').length}
            </p>
          </div>
          <div className="bg-[#1c1c1e] border border-white/5 p-5 rounded-2xl">
            <p className="text-zinc-500 text-[11px] font-semibold uppercase tracking-wider">Interviews</p>
            <p className="text-2xl sm:text-3xl font-bold text-amber-500 mt-1">
              {jobs.filter(a => a.status?.toLowerCase() === 'interview' || a.status?.toLowerCase() === 'offered').length}
            </p>
          </div>
          <div className="bg-[#1c1c1e] border border-white/5 p-5 rounded-2xl">
            <p className="text-zinc-500 text-[11px] font-semibold uppercase tracking-wider">Success Rate</p>
            <p className="text-2xl sm:text-3xl font-bold text-emerald-500 mt-1">
              {jobs.length > 0 
                ? `${Math.round((jobs.filter(a => a.status?.toLowerCase() === 'offered').length / jobs.length) * 100)}%` 
                : '0%'}
            </p>
          </div>
        </div>

        {/* CLIENT INTERACTIVE LIVE TABLE */}
        <SeekerApplicationsTable initialData={jobs} />

      </div>
    </div>
  );
};

export default ApplicationsPage;