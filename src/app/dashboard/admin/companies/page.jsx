import { getCompanies } from '@/lib/api/companies';
import CompaniesTable from './CompaniesTable';


const AdminCompaniesPage = async () => {
    const companies = await getCompanies();
    console.log(companies,"con");
    
    // MongoDB $oid এবং $date ফাইলগুলোকে সাধারণ স্ট্রিং-এ নরমালইজ করা হচ্ছে
    // const normalizedCompanies = companies.map(company => ({
    //     ...company,
    //     id: company._id?.toString() || company._id?.$oid,
    //     createdAt: company.createdAt?.$date || company.createdAt
    // }));

    return (
        <div className="bg-[#121214] min-h-screen p-6 md:p-10 text-zinc-100 flex flex-col gap-6">
            <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold tracking-tight text-white">Company Approvals</h1>
                <p className="text-sm text-zinc-400">Manage, review, and change verification status for registered workspaces.</p>
            </div>
            
            <CompaniesTable initialCompanies={companies} />
        </div>
    );
};

export default AdminCompaniesPage;