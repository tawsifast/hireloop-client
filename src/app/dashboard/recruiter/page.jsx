"use client"
import { authClient } from "@/lib/auth-client";
import React from 'react';
import { StatsCard } from '@/components/StatsCard';
// Pulling sleek minimalist icons straight from the new Gravity UI package
import { FileText, PersonPlus, Thunderbolt, CircleCheck } from '@gravity-ui/icons';


const RecruiterPage = () => {
  const { data: session, isPending } = authClient?.useSession();
  const user = session?.user;
  if(isPending){
    return <div>...Loading</div>
  }

  const statsData = [
    {
      id: 'total-jobs',
      title: 'Total Job Posts',
      value: '48',
      icon: <FileText width={18} height={18} />,
    },
    {
      id: 'total-applicants',
      title: 'Total Applicants',
      value: '1,284',
      icon: <PersonPlus width={18} height={18} />,
    },
    {
      id: 'active-jobs',
      title: 'Active Jobs',
      value: '18',
      icon: <Thunderbolt width={18} height={18} />,
    },
    {
      id: 'jobs-closed',
      title: 'Jobs Closed',
      value: '32',
      icon: <CircleCheck width={18} height={18} />,
    },
  ];
  return (
  <div className="bg-[#09090b] min-h-screen p-8 text-white">
      <div className="max-w-7xl mx-auto space-y-6">
        
        <div>
          <h1 className="text-xl font-bold tracking-tight text-zinc-200">Recruiter Dashboard</h1>
        </div>

        {/* Dashboard Grid Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statsData.map((stat) => (
            <StatsCard
              key={stat.id}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
            />
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default RecruiterPage;
