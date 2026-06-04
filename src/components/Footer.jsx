"use client";

import Link from "next/link";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaDiscord,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-16">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Left Content */}
          <div className="space-y-5">
            
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>

              <div className="leading-none">
                <h1 className="font-semibold text-lg">
                  Programming
                </h1>
                <h2 className="font-semibold text-lg -mt-1">
                  Hero
                </h2>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-400 text-sm leading-7 max-w-xs">
              The AI-native career platform. Built for people who take their work seriously.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-6">
              
              <Link
                href="#"
                className="w-10 h-10 rounded-lg bg-white/10 hover:bg-blue-600 transition flex items-center justify-center"
              >
                <FaFacebookF />
              </Link>

              <Link
                href="#"
                className="w-10 h-10 rounded-lg bg-purple-600 hover:bg-purple-700 transition flex items-center justify-center"
              >
                <FaDiscord />
              </Link>

              <Link
                href="#"
                className="w-10 h-10 rounded-lg bg-white/10 hover:bg-blue-500 transition flex items-center justify-center"
              >
                <FaLinkedinIn />
              </Link>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-indigo-500 font-medium mb-5">
              Product
            </h3>

            <div className="flex flex-col gap-4 text-gray-400 text-sm">
              <Link href="#" className="hover:text-white transition">
                Job discovery
              </Link>

              <Link href="#" className="hover:text-white transition">
                Worker AI
              </Link>

              <Link href="#" className="hover:text-white transition">
                Companies
              </Link>

              <Link href="#" className="hover:text-white transition">
                Salary data
              </Link>
            </div>
          </div>

          {/* Navigations */}
          <div>
            <h3 className="text-indigo-500 font-medium mb-5">
              Navigations
            </h3>

            <div className="flex flex-col gap-4 text-gray-400 text-sm">
              <Link href="#" className="hover:text-white transition">
                Help center
              </Link>

              <Link href="#" className="hover:text-white transition">
                Career library
              </Link>

              <Link href="#" className="hover:text-white transition">
                Contact
              </Link>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-indigo-500 font-medium mb-5">
              Resources
            </h3>

            <div className="flex flex-col gap-4 text-gray-400 text-sm">
              <Link href="#" className="hover:text-white transition">
                Brand Guideline
              </Link>

              <Link href="#" className="hover:text-white transition">
                Newsroom
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-14 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          
          <p>
            Copyright 2024 — Programming Hero
          </p>

          <div className="flex items-center gap-5">
            <Link href="#" className="hover:text-white transition">
              Terms & Policy
            </Link>

            <Link href="#" className="hover:text-white transition">
              Privacy Guideline
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;