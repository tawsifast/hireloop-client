"use client";

import Image from "next/image";
import {
  FaBriefcase,
  FaBuilding,
  FaUsers,
  FaStar,
} from "react-icons/fa";

const stats = [
  {
    icon: <FaBriefcase />,
    value: "50K",
    label: "Active Jobs",
  },
  {
    icon: <FaBuilding />,
    value: "12K",
    label: "Companies",
  },
  {
    icon: <FaUsers />,
    value: "2M",
    label: "Job Seekers",
  },
  {
    icon: <FaStar />,
    value: "97%",
    label: "Satisfaction Rate",
  },
];

const StatsSection = () => {
  return (
    <section className="relative overflow-hidden bg-black text-white pt-28 pb-20 px-6">
      
      {/* Globe Background */}
      <div className="absolute inset-0 flex items-end justify-center"
     
      >
        <Image
          src="/globe.png"
          alt="Globe"
          width={1000}
          height={100}
          className=" max-w-6xl opacity-80"
          
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-semibold leading-tight">
            Assisting over 15,000 job seekers
            <br />
            find their dream positions.
          </h2>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-black/70 backdrop-blur-md border border-white/10 rounded-3xl p-5 hover:border-indigo-500/40 transition duration-300"
            >
              
              {/* Icon */}
              <div className="text-white text-lg mb-12">
                {item.icon}
              </div>

              {/* Number */}
              <h3 className="text-3xl font-bold mb-3">
                {item.value}
              </h3>

              {/* Label */}
              <p className="text-gray-300">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;