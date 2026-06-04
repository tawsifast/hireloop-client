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
  // console.log(user,"user");

  const handleSignOut = async () => {
    await authClient.signOut();
    // setMobileOpen(false);
  };

  return (
    <nav className="w-full bg-[#0f0f12] py-3 px-6 relative">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-purple-600 to-pink-500 flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">P</span>
          </div>

          <div className="leading-none">
            <h1 className="text-white font-semibold text-lg">
              Programming
            </h1>
            <h2 className="text-white font-semibold text-lg -mt-1">
              Hero
            </h2>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 bg-[#1a1a1d] px-6 py-2 rounded-2xl border border-white/10 shadow-md">
          <Link
            href="/jobs"
            className="text-gray-300 hover:text-white transition"
          >
            Browse Jobs
          </Link>

          <Link
            href="/company"
            className="text-gray-300 hover:text-white transition"
          >
            Company
          </Link>

          <Link
            href="/pricing"
            className="text-gray-300 hover:text-white transition"
          >
            Pricing
          </Link>

          <div className="w-px h-6 bg-white/10" />

          { user ? 
         <div className="flex items-center gap-2">
           {/* <Avatar size="sm" className="bg-cyan-500 text-zinc-950 font-bold">
                      {user?.name.charAt(0)}
          </Avatar> */}
          <Avatar>
            <Avatar.Image referrerPolicy="no-referrer" alt={user?.name} src={user?.image} />
            <Avatar.Fallback className="bg-yellow-400 text-zinc-950 font-bold">
              {user?.name.charAt(0)}
            </Avatar.Fallback>
          </Avatar>
          <Button onClick={handleSignOut} size="sm" variant="danger">LogOut</Button> 
         </div>:
          <Link
            href="/signin"
            className="text-indigo-400 hover:text-indigo-300 transition font-medium"
          >Sign In</Link> 
          }

          <Button
            radius="lg"
            className="bg-white text-black font-medium px-6"
          >
            Get Started
          </Button>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full px-6">
          <div className="bg-[#1a1a1d] border border-white/10 rounded-2xl p-6 flex flex-col gap-5 shadow-2xl">
            
            <Link
              href="/jobs"
              className="text-gray-300 hover:text-white transition"
            >
              Browse Jobs
            </Link>

            <Link
              href="/company"
              className="text-gray-300 hover:text-white transition"
            >
              Company
            </Link>

            <Link
              href="/pricing"
              className="text-gray-300 hover:text-white transition"
            >
              Pricing
            </Link>

            <Link
              href="/signin"
              className="text-indigo-400 hover:text-indigo-300 transition font-medium"
            >
              Sign In
            </Link>

            <Button
              radius="lg"
              className="bg-white text-black font-medium w-full"
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