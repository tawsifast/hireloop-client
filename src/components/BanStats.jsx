"use client";

import { Button, Input } from "@heroui/react";
import { FaSearch, Search } from "react-icons/fa";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-black overflow-hidden text-white">
      
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(88,28,255,0.25),transparent_40%)]" />

      {/* Small Stars */}
      <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 flex flex-col items-center text-center">
        
        {/* Top Badge */}
        <div className="px-5 py-2 rounded-full border border-white/10 bg-white/5 text-xs tracking-widest text-gray-300 mb-8">
          🔥 59,000+ NEW JOBS THIS MONTH
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-bold max-w-3xl leading-tight">
          Find Your Dream Job Today
        </h1>

        {/* Description */}
        <p className="text-gray-400 max-w-2xl mt-6 text-sm md:text-base leading-7">
          HeroLoop connects top talent with world-class companies.
          Browse thousands of curated opportunities and land your next role — faster.
        </p>

        {/* Search Box */}
        <div className="w-full max-w-3xl mt-10 bg-[#111111] border border-white/10 rounded-2xl p-2 flex flex-col md:flex-row gap-3 shadow-2xl">
          
          <Input
            placeholder="Job title, skill or keyword"
            className={{
              inputWrapper:
                "bg-transparent shadow-none border-none",
            }}
          />

          <Input
            placeholder="Location or Remote"
            className={{
              inputWrapper:
                "bg-transparent shadow-none border-none",
            }}
          />

          <Button
            isIconOnly
            className="bg-[#5B3DF5] text-white min-w-[52px] h-[52px]"
          >
            <FaSearch />

          </Button>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          {[
            "Trending Position",
            "Product Designer",
            "AI Engineer",
            "People Engineer",
          ].map((item, index) => (
            <span
              key={index}
              className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300"
            >
              {item}
            </span>
          ))}
        </div>

        {/* Globe Image */}
        <div className="relative w-full flex justify-center mt-20">
          <Image
            src="/globe.png"
            alt="globe"
            width={1200}
            height={100}
            className="w-full max-w-5xl object-contain opacity-90"
            priority
          />

          {/* Overlay Text */}
          <div className="absolute top-16 md:top-24 text-center">
            <h2 className="text-2xl md:text-4xl font-semibold leading-snug">
              Assisting over 15,000 job seekers
              <br />
              find their dream positions.
            </h2>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 w-full mt-[-60px] relative z-20">
          
          {[
            { number: "50K", label: "Active Jobs" },
            { number: "12K", label: "Companies" },
            { number: "2M", label: "Job Seekers" },
            { number: "97%", label: "Satisfaction Rate" },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-[#0d0d0d]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-left shadow-2xl"
            >
              <h3 className="text-4xl font-bold mb-3">
                {item.number}
              </h3>

              <p className="text-gray-400 text-sm">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;