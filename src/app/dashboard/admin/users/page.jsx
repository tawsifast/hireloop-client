import { getUserList } from '@/lib/api/users';
import AdminUsersTable from './AdminUsersTable';



const AdminUsersPage = async () => {
  const data = await getUserList() || { users: [] };
  const users = data.users || [];

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-zinc-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* HEADER AREA */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">User Management</h1>
            <p className="text-zinc-500 text-xs sm:text-sm mt-0.5">
              Review, filter, and manage platform access for all users.
            </p>
          </div>
          
          <div className="flex items-center gap-3 self-start sm:self-center">
            <select className="bg-[#1c1c1e] text-zinc-300 border border-white/5 rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:border-white/20 cursor-pointer">
              <option>All Roles</option>
              <option>Seeker</option>
              <option>Recruiter</option>
            </select>
            <button className="bg-white text-black font-semibold text-xs px-4 py-2 rounded-xl hover:bg-zinc-200 transition-colors shadow-sm">
              Export List
            </button>
          </div>
        </div>

        {/* METRIC CARDS GRID */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#1c1c1e] border border-white/5 p-5 rounded-2xl">
            <p className="text-zinc-500 text-[11px] font-semibold uppercase tracking-wider">Total Active Users</p>
            <p className="text-2xl sm:text-3xl font-bold text-white mt-1">12,842</p>
            <p className="text-xs text-emerald-500 font-medium mt-1">+12% vs last month</p>
          </div>
          <div className="bg-[#1c1c1e] border border-white/5 p-5 rounded-2xl">
            <p className="text-zinc-500 text-[11px] font-semibold uppercase tracking-wider">Recruiter Growth</p>
            <p className="text-2xl sm:text-3xl font-bold text-white mt-1">843</p>
            <p className="text-xs text-amber-500 font-medium mt-1">High demand</p>
          </div>
          <div className="bg-[#1c1c1e] border border-white/5 p-5 rounded-2xl">
            <p className="text-zinc-500 text-[11px] font-semibold uppercase tracking-wider">Suspended Accounts</p>
            <p className="text-2xl sm:text-3xl font-bold text-white mt-1">124</p>
            <p className="text-xs text-zinc-500 font-medium mt-1">0.8% of total</p>
          </div>
          <div className="bg-[#1c1c1e] border border-white/5 p-5 rounded-2xl">
            <p className="text-zinc-500 text-[11px] font-semibold uppercase tracking-wider">New Signups (24h)</p>
            <p className="text-2xl sm:text-3xl font-bold text-white mt-1">42</p>
            <p className="text-xs text-yellow-500 font-medium mt-1">Steady activity</p>
          </div>
        </div>

        {/* CLIENT USERS CONTAINER GRID */}
        <AdminUsersTable initialUsers={users} />

      </div>
    </div>
  );
};

export default AdminUsersPage;