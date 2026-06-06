import { serverFetch } from "../core/server";


export const getJobs = async () =>{
    return serverFetch('/jobs')
}
export const getJobById = async (jobId) =>{
    return serverFetch(`/jobs/${jobId}`)
}
export const getComapnyJobs = async (companyId, status= "active") =>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/jobs?companyId=${companyId}&status=${status}`);
    return res.json();
}