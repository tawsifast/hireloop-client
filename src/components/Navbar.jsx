"use client";

import { useState } from "react";
import Link from "next/link";
import { Avatar, Button } from "@heroui/react";
import { Menu, X } from "lucide-react";
import { authClient } from "@/lib/auth-client";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, isPending } = authClient?.useSession();
  const user = session?.user;
  console.log(user,"nsds");
  const handleSignOut = async () => {
    await authClient.signOut();
    setIsOpen(false);
  };

  const navLinks = [
    { label: "Browse Jobs", href: "/jobs" },
    { label: "Company", href: "/dashboard/recruiter/company" },
    { label: "Pricing", href: "/pricing" },
  ];

  const dashboardLinks = {
    seeker: "/dashboard/seeker",
    recruiter: "/dashboard/recruiter",
    admin: "/dashboard/admin",
  };
  const finalNavLinks = user?.email
    ? [
        ...navLinks,
        {
          label: "Dashboard",
          href: dashboardLinks[user?.role || "seeker"],
        },
      ]
    : navLinks;
    // console.log(finalNavLinks,"jjjn");
  return (
    <nav className="w-full bg-[#0f0f12] py-3 px-6 relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo Frame */}
        <Link href="/" className="flex items-center gap-3 select-none">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-purple-600 to-pink-500 flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">P</span>
          </div>

          <div className="leading-none">
            <h1 className="text-white font-semibold text-lg">Programming</h1>
            <h2 className="text-white font-semibold text-lg -mt-1">Hero</h2>
          </div>
        </Link>

        {/* Desktop Menu Framework Layout */}
        <div className="hidden md:flex items-center gap-8 bg-[#1a1a1d] px-6 py-2 rounded-2xl border border-white/10 shadow-md">
          {finalNavLinks.map((link, i) => (
            <Link
              key={i}
              href={link.href}
              className="text-gray-300 hover:text-white transition text-sm font-medium block"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <div className="w-px h-6 bg-white/10" />

          {user ? (
            <div className="flex items-center gap-2">
              <Avatar>
                <Avatar.Image
                  referrerPolicy="no-referrer"
                  alt={user?.name}
                  src={user?.image}
                />
                <Avatar.Fallback className="bg-yellow-400 text-zinc-950 font-bold">
                  {user?.name?.charAt(0) || "U"}
                </Avatar.Fallback>
              </Avatar>
              <Button onClick={handleSignOut} size="sm" variant="danger">
                LogOut
              </Button>
            </div>
          ) : (
            <Link
              href="/signin"
              className="text-indigo-400 hover:text-indigo-300 transition text-sm font-medium"
            >
              Sign In
            </Link>
          )}

          <Button
            radius="lg"
            variant="secondary"
            className="bg-white text-black font-medium px-6 h-9 text-xs"
          >
            Get Started
          </Button>
        </div>

        {/* Mobile Dynamic Control Trigger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dynamic Drawer Screen Overlay */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full px-6 transition-all">
          <div className="bg-[#1a1a1d] border border-white/10 rounded-2xl p-6 flex flex-col gap-5 shadow-2xl">
            {/* Map over dynamic navigation properties links */}
            {navLinks.map((link) => (
              <Button key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-gray-300 hover:text-white transition text-sm font-medium"
                >
                  {link.label}
                </Link>
              </Button>
            ))}

            {user ? (
              <div className="flex items-center justify-between border-t border-white/5 pt-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <Avatar.Image
                      referrerPolicy="no-referrer"
                      alt={user?.name}
                      src={user?.image}
                    />
                    <Avatar.Fallback className="bg-yellow-400 text-zinc-950 font-bold">
                      {user?.name?.charAt(0) || "U"}
                    </Avatar.Fallback>
                  </Avatar>
                  <span className="text-zinc-300 text-sm font-medium">
                    {user?.name}
                  </span>
                </div>
                <Button onClick={handleSignOut} size="sm" variant="danger">
                  LogOut
                </Button>
              </div>
            ) : (
              <Link
                href="/signin"
                onClick={() => setIsOpen(false)}
                className="text-indigo-400 hover:text-indigo-300 transition text-sm font-medium border-t border-white/5 pt-4"
              >
                Sign In
              </Link>
            )}

            <Button
              radius="lg"
              className="bg-white text-black font-medium w-full h-11 text-sm mt-1"
            >
              Get Started
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
