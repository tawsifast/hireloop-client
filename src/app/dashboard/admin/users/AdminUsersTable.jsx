"use client";

import React, { useTransition } from "react";
import { AlertDialog, Button } from "@heroui/react";
import { updateUserRole } from "@/lib/actions/users";

export default function AdminUsersTable({ initialUsers = [] }) {
  const [isPending, startTransition] = useTransition();

  const handleToggleStatus = (userId, currentStatus) => {
    console.log(`Toggling user status for ${userId}`);
  };

  // সাবমিট হলে ব্যাকগ্রাউন্ডে ট্রানজিশন দিয়ে সার্ভার অ্যাকশন ফায়ার হবে
  const handleFormSubmit = (formData) => {
    const targetId = formData.get("userId");
    const targetRole = formData.get("newRole");

    startTransition(async () => {
      try {
        await updateUserRole(targetId, targetRole);
      } catch (err) {
        console.error("Failed to update role:", err);
      }
    });
  };

  return (
    <div className="bg-[#1c1c1e] border border-white/5 rounded-2xl overflow-hidden shadow-xl">
      <div className="overflow-x-auto">
        <div className="w-full text-left min-w-225">
          
          {/* HEADERS */}
          <div className="grid grid-cols-6 border-b border-white/5 text-zinc-500 text-xs font-semibold uppercase tracking-wider px-6 py-4">
            <div className="col-span-2">User Name</div>
            <div>Email Address</div>
            <div className="text-center">Role</div>
            <div className="text-center">Join Date</div>
            <div className="text-center">Status</div>
            <div className="text-right">Actions</div>
          </div>

          {/* BODY */}
          <div className="divide-y divide-white/3">
            {initialUsers.length === 0 ? (
              <div className="text-center py-12 text-zinc-500 text-sm">
                No system users found on the database cluster.
              </div>
            ) : (
              initialUsers.map((user) => {
                const userId = user._id || user.id;
                const isSuspended = user.status?.toLowerCase() === "suspended";
                const isRecruiter = user.role?.toLowerCase() === "recruiter";
                const newRole = isRecruiter ? "seeker" : "recruiter";

                return (
                  <div key={userId} className="grid grid-cols-6 items-center px-6 py-4 hover:bg-white/1 transition-colors text-sm">
                    
                    <div className="col-span-2 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center text-xs font-bold text-zinc-300">
                        {user.name ? user.name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase() : "US"}
                      </div>
                      <span className="font-medium text-white">{user.name || "System User"}</span>
                    </div>

                    <div className="text-zinc-400 truncate pr-4">{user.email || "user@example.com"}</div>

                    <div className="flex justify-center">
                      <span className="inline-flex items-center gap-1 bg-white/5 border border-white/10 text-zinc-300 text-xs font-medium px-2.5 py-1 rounded-full shadow-sm">
                        <span>{isRecruiter ? "💼" : "👤"}</span>
                        {isRecruiter ? "recruiter" : "seeker"}
                      </span>
                    </div>

                    <div className="text-zinc-400 text-center text-xs">
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', {
                        month: 'short', day: '2-digit', year: 'numeric'
                      }) : "Oct 12, 2023"}
                    </div>

                    <div className="flex justify-center">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                        isSuspended ? "bg-red-500/10 text-red-400 border-red-500/20" : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${isSuspended ? "bg-red-400" : "bg-emerald-400"}`} />
                        {isSuspended ? "Suspended" : "Active"}
                      </span>
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="flex items-center justify-end gap-3 text-xs font-medium">
                      
                      {/* ✅ HEROUI DECLARATIVE ALERTDIALOG */}
                      <AlertDialog>
                        {/* মডাল ট্রিগার বাটন */}
                        <Button 
                          variant="light"
                          size="sm"
                          className="p-0 h-auto min-w-0 text-zinc-400 hover:text-white transition-colors bg-transparent data-[hover=true]:bg-transparent"
                        >
                          {isRecruiter ? "Make Seeker" : "Make Recruiter"}
                        </Button>

                        <AlertDialog.Backdrop className="backdrop-blur-sm bg-black/40">
                          <AlertDialog.Container>
                            <AlertDialog.Dialog className="sm:max-w-[400px] bg-[#1c1c1e] border border-white/5 text-white rounded-2xl p-0 shadow-2xl">
                              <AlertDialog.CloseTrigger className="text-zinc-400 hover:text-white" />
                              
                              <AlertDialog.Header className="border-b border-white/5 px-6 py-4 flex items-center gap-3">
                                <AlertDialog.Icon status="accent" />
                                <AlertDialog.Heading className="text-base font-semibold text-white">
                                  Change User Role
                                </AlertDialog.Heading>
                              </AlertDialog.Header>
                              
                              {/* সার্ভার অ্যাকশন ফর্ম */}
                              <form action={handleFormSubmit}>
                                <input type="hidden" name="userId" value={userId} />
                                <input type="hidden" name="newRole" value={newRole} />

                                <AlertDialog.Body className="px-6 py-6 text-sm text-zinc-400">
                                  <p>
                                    Are you sure you want to change <span className="text-white font-medium">{user.name || "this user"}</span>'s platform access tier to{" "}
                                    <span className="text-blue-400 font-semibold capitalize">{newRole}</span>?
                                  </p>
                                </AlertDialog.Body>
                                
                                <AlertDialog.Footer className="border-t border-white/5 px-6 py-4 bg-white/[0.01]">
                                  <Button slot="close" variant="light" size="sm" className="text-zinc-400 hover:text-white" isDisabled={isPending}>
                                    Cancel
                                  </Button>
                                  <Button 
                                    slot="close" 
                                    type="submit"
                                    size="sm"
                                    className="bg-blue-600 font-semibold text-white rounded-xl hover:bg-blue-500 transition-colors"
                                    isLoading={isPending}
                                  >
                                    Confirm
                                  </Button>
                                </AlertDialog.Footer>
                              </form>

                            </AlertDialog.Dialog>
                          </AlertDialog.Container>
                        </AlertDialog.Backdrop>
                      </AlertDialog>
                      
                      <button 
                        type="button"
                        onClick={() => handleToggleStatus(userId, user.status)}
                        className={`transition-colors font-semibold ${isSuspended ? "text-emerald-500 hover:text-emerald-400" : "text-red-500 hover:text-red-400"}`}
                      >
                        {isSuspended ? "Activate" : "Suspend"}
                      </button>
                    </div>

                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}