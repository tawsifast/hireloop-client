
export const getComapnyJobs = async (companyId, status= "active") =>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/jobs?companyId=${companyId}&status=${status}`);
    return res.json();
}