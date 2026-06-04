"use client";

import { Button, Input } from "@heroui/react";
import { Search } from "react-icons/fa";

const Banner = () => {
  return (
    <section
      className="relative min-h-[700px] flex flex-col items-center justify-center overflow-hidden bg-black text-white px-6"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(0,0,0,0.85), rgba(0,0,0,1)), url('/globe.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Top Badge */}
      <div className="mb-6">
        <span className="px-5 py-2 rounded-full border border-white/10 bg-white/5 text-xs tracking-wide text-gray-300">
          🔥 59,000+ NEW JOBS THIS MONTH
        </span>
      </div>

      {/* Heading */}
      <h1 className="text-4xl md:text-6xl font-bold text-center max-w-4xl leading-tight">
        Find Your Dream Job Today
      </h1>

      {/* Description */}
      <p className="text-gray-400 text-center mt-5 max-w-2xl leading-7">
        HireLoop connects top talent with world-class companies.
        Browse thousands of curated opportunities and land your next role faster.
      </p>

      {/* Search Box */}
      <div className="mt-10 w-full max-w-4xl bg-[#111111] border border-white/10 rounded-2xl p-3 flex flex-col md:flex-row gap-3 shadow-2xl">
        
        <Input
          placeholder="Job title, skill, or keyword"
          className={{
            inputWrapper:
            "bg-transparent shadow-none border-none",
            input: "text-white",
          }}
        />

        <Input
          placeholder="Location or Remote"
          
        />

        <Button
          isIconOnly
          className="bg-indigo-600 text-white min-w-[55px] h-[55px]"
        >
          {/* <Search /> */}
        </Button>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap justify-center gap-3 mt-6">
        {[
          "Trending Positions",
          "Product Designer",
          "AI Engineer",
          "Front-end Engineer",
        ].map((tag) => (
          <span
            key={tag}
            className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300"
          >
            {tag}
          </span>
        ))}
      </div>
    </section>
  );
};

export default Banner;