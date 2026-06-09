import { getJobById } from "@/lib/api/jobs";
import { getUserSession } from "@/lib/core/session";
import { ShieldExclamation } from "@gravity-ui/icons";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import JobApply from "./JobApply";
import { getApplicationsByApplicant } from "@/lib/api/applications";
import { getPlanById } from "@/lib/api/plans";

const ApplyPage = async ({ params }) => {
  const { id } = await params;
  const user = await getUserSession();
  
  if (!user) {
    redirect(`/signin?redirect=/jobs/${id}/apply`);
  }

  if (user.role !== "seeker") {
    return (
      <div className="w-full min-h-[80vh] flex flex-col justify-center items-center text-white p-6">
        <div className="max-w-md w-full text-center p-8 rounded-2xl bg-[#1c1c1e] border border-white/5 shadow-xl">
          <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-500/20">
            <ShieldExclamation width={24} height={24} />
          </div>
          <h3 className="text-xl font-bold text-zinc-100 mb-2">
            Access Restricted
          </h3>
          <p className="text-zinc-400 text-sm leading-relaxed mb-6">
            Only job seekers can apply for positions. Please sign in with a
            seeker account to proceed.
          </p>
          <Link
            href="/signin"
            className="inline-block w-full px-4 py-2.5 bg-[#1f2937] hover:bg-[#1f2937]/80 border border-white/10 text-zinc-200 rounded-xl text-sm font-medium transition"
          >
            Switch Account
          </Link>
        </div>
      </div>
    );
  }

  const applications = await getApplicationsByApplicant(user.id);

  const plan = await getPlanById(user?.plan || "seeker_free");
  console.log(plan);

  const job = await getJobById(id);
  
  const currentCount = applications?.length || 0;
  const limitsExceeded = currentCount >= plan.maxApplicationsPerMonth;

  return (
    <div className="min-h-screen text-zinc-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-6">
        
        {/* USAGE ACCOUNT LIMITATION HEADER BADGE */}
        <div className="bg-[#1c1c1e] border border-white/5 p-5 rounded-[24px] shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="text-[11px] text-zinc-500 uppercase font-semibold tracking-wider">Account Usage Status</p>
            <h2 className="text-sm sm:text-base font-medium text-zinc-300">
              You have applied to <span className="text-white font-bold">{currentCount}</span> out of <span className="text-white font-bold">{plan.maxApplicationsPerMonth}</span> jobs this month.
            </h2>
          </div>
          
          {/* Visual State Indicator badge */}
          <div className={`text-xs px-3 py-1.5 rounded-full font-semibold border self-start sm:self-center ${
            limitsExceeded 
              ? 'bg-red-500/10 border-red-500/20 text-red-400' 
              : 'bg-blue-500/10 border-blue-500/20 text-blue-400'
          }`}>
            {plan.name} Tier Plan
          </div>
        </div>

        {/* CONDITIONALLY RENDER THE FORM OR THE UPGRADE PLACEHOLDER */}
        {!limitsExceeded ? (
          <JobApply applicant={user} job={job} />
        ) : (
          /* MAX OUT REACHED ALERT UI SCREEN */
          <div className="border border-dashed border-white/10 bg-white/[0.01] rounded-[24px] p-8 sm:p-12 text-center space-y-4">
            <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center rounded-xl mx-auto">
              <ShieldExclamation width={22} height={22} />
            </div>
            <div className="space-y-1.5 max-w-sm mx-auto">
              <h3 className="text-base font-bold text-white">Monthly Limit Reached</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                You have reached your limit of {plan.maxApplicationsPerMonth} applications on the {plan.name} plan. Upgrade your account package or wait until next month to submit more applications.
              </p>
            </div>
            <div className="pt-2">
              <Link 
                href="/plans"
                className="inline-block bg-white text-black font-bold text-xs px-5 py-2.5 rounded-xl hover:bg-zinc-200 transition-colors"
              >
                Upgrade Plan
              </Link>
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
};

export default ApplyPage;