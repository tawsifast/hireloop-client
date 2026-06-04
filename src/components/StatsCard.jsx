// components/StatsCard.jsx
import React from 'react';
import { Card } from '@heroui/react'; // Only import the core Card wrapper

export const StatsCard = ({ icon, title, value }) => {
  return (
    <Card 
      /* HeroUI v3 uses Tailwind hover states directly instead of an isHoverable prop */
      className="bg-[#18181b] border border-zinc-800 rounded-xl p-4 shadow-sm w-full min-h-40 flex flex-col justify-between transition-all hover:border-zinc-700"
    >
      {/* Card.Content replaces the old CardBody */}
      <Card.Content className="p-0 flex flex-col justify-between h-full gap-4">
        
        {/* Icon Container */}
        <div className="w-10 h-10 rounded-lg bg-zinc-800/60 flex items-center justify-center text-zinc-400">
          {icon}
        </div>
        
        {/* Content Metric Section */}
        <div className="flex flex-col gap-1">
          <span className="text-zinc-500 text-xs font-medium tracking-wide">
            {title}
          </span>
          <span className="text-white text-2xl font-semibold tracking-tight">
            {value}
          </span>
        </div>

      </Card.Content>
    </Card>
  );
};