'use client';

import React, { useState, useMemo } from 'react';
import { Input, Button, Checkbox, Select, ListBox } from "@heroui/react";
// Fixed: Changed Magnifier to MagnifyingGlass to avoid any resolution issues
import { Funnel, ArrowRotateLeft, Magnifier } from '@gravity-ui/icons';
import JobCard from './JobsCard'; 

export default function JobSearchFilter({ initialJobs = [] }) {
  // 1. Core Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(new Set([]));
  const [selectedType, setSelectedType] = useState(new Set([]));
  const [isRemoteOnly, setIsRemoteOnly] = useState(false);

  // 2. Compute dropdown arrays dynamically based on current live backend values
  const categories = useMemo(() => {
    const unique = new Set(initialJobs.map(job => job.category).filter(Boolean));
    return Array.from(unique);
  }, [initialJobs]);

  const jobTypes = useMemo(() => {
    const unique = new Set(initialJobs.map(job => job.type).filter(Boolean));
    return Array.from(unique);
  }, [initialJobs]);

  // 3. Global Filter Reset Control
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory(new Set([]));
    setSelectedType(new Set([]));
    setIsRemoteOnly(false);
  };

  // 4. Reactive Search Array Evaluation
  const filteredJobs = useMemo(() => {
    return initialJobs.filter((job) => {
      const matchesSearch = 
        job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.companyName?.toLowerCase().includes(searchQuery.toLowerCase());

      const currentCatSelection = Array.from(selectedCategory)[0];
      const matchesCategory = !currentCatSelection || job.category === currentCatSelection;

      const currentTypeSelection = Array.from(selectedType)[0];
      const matchesType = !currentTypeSelection || job.type === currentTypeSelection;

      const matchesRemote = !isRemoteOnly || job.remote === true;

      return matchesSearch && matchesCategory && matchesType && matchesRemote;
    });
  }, [searchQuery, selectedCategory, selectedType, isRemoteOnly, initialJobs]);

  return (
    <div className="space-y-8">
      
      {/* SEARCH INPUT BAR HEADER FRAMEWORK */}
      <div className="bg-[#1c1c1e] border border-white/5 p-5 rounded-[24px] shadow-xl space-y-4">
        
        {/* TOP INTERFACE ROW */}
        <div className="flex flex-col md:flex-row gap-3">
          
          {/* FIXED: Replaced non-standard props with native React handlers and structural wrappers */}
          <div className="relative flex-1 bg-[#1f2937] border border-white/10 focus-within:border-white/20 h-12 rounded-xl flex items-center px-3 gap-2">
            <Magnifier className="text-zinc-500 shrink-0" width={18} height={18} />
            <Input
              type="text"
              aria-label="Search by job title or company"
              placeholder="Search by job title or company..."
              className="w-full bg-transparent border-none outline-none text-white text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                type="button" 
                onClick={() => setSearchQuery('')}
                className="text-zinc-500 hover:text-zinc-300 text-sm font-bold px-1"
              >
                ✕
              </button>
            )}
          </div>
          
          {/* DYNAMIC CLEAR FILTERS BUTTON ACTION */}
          {(searchQuery || selectedCategory.size > 0 || selectedType.size > 0 || isRemoteOnly) && (
            <Button 
              variant="bordered"
              className="border-white/10 text-zinc-300 h-12 rounded-xl font-medium"
              onClick={handleResetFilters}
              startContent={<ArrowRotateLeft width={16} height={16} />}
            >
              Clear Filters
            </Button>
          )}
        </div>

        {/* BOTTOM SELECT DROPDOWN ROW USING ARIA COMPOSITE SUB-COMPONENTS */}
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 items-center pt-2 border-t border-white/5">
          
          {/* CATEGORY SELECT MENU */}
          <Select 
            className="w-full" 
            placeholder="Select Category"
            aria-label="Filter by Job Category"
            selectedKeys={selectedCategory}
            onSelectionChange={(keys) => setSelectedCategory(keys)}
            classNames={{
              trigger: "bg-[#1f2937] border border-white/10 rounded-xl h-11 data-[hover=true]:bg-[#1f2937]/80 text-zinc-200 text-sm",
              value: "text-zinc-200 text-sm",
              popoverContent: "bg-[#1c1c1e] border border-white/10 text-white"
            }}
          >
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox aria-label="Job Categories Options">
                {categories.map((cat) => (
                  <ListBox.Item id={cat} key={cat} textValue={cat} className="text-white data-[hover=true]:bg-white/5">
                    {cat}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>

          {/* TYPE SELECT MENU */}
          <Select 
            className="w-full" 
            placeholder="Job Type"
            aria-label="Filter by Job Type"
            selectedKeys={selectedType}
            onSelectionChange={(keys) => setSelectedType(keys)}
            classNames={{
              trigger: "bg-[#1f2937] border border-white/10 rounded-xl h-11 data-[hover=true]:bg-[#1f2937]/80 text-zinc-200 text-sm",
              value: "text-zinc-200 text-sm",
              popoverContent: "bg-[#1c1c1e] border border-white/10 text-white"
            }}
          >
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox aria-label="Job Types Options">
                {jobTypes.map((type) => (
                  <ListBox.Item id={type} key={type} textValue={type} className="text-white data-[hover=true]:bg-white/5">
                    {type}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>

          {/* REMOTE CHECKBOX TOGGLE CONTAINER */}
        <div className="flex items-center pl-2 h-11">
          <Checkbox 
            isSelected={isRemoteOnly} 
            // FIXED: HeroUI v3 uses standard onChange which yields a boolean
            onChange={setIsRemoteOnly}
            className="text-sm text-zinc-300 font-medium select-none cursor-pointer flex gap-2 items-center"
            >     
            <Checkbox.Control className="border border-white/10 rounded-md data-[selected=true]:bg-blue-600 data-[selected=true]:border-blue-600 w-4 h-4 flex items-center justify-center transition-colors" />
            <Checkbox.Content>
              Remote Positions Only
            </Checkbox.Content>
                </Checkbox>
        </div>

        </div>
      </div>

      {/* RENDER GRID OUTPUT RESULTS LAYER */}
      <div>
        <div className="flex items-center justify-between mb-6 px-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Showing {filteredJobs.length} {filteredJobs.length === 1 ? 'Job' : 'Jobs'} Available
          </p>
        </div>

        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => {
              const jobKey = job._id?.$oid || job._id || Math.random().toString();
              return <JobCard key={jobKey} job={job} />;
            })}
          </div>
        ) : (
          /* NO INTERACTION RESULTS VIEW CONDITIONAL */
          <div className="border border-dashed border-white/10 bg-white/[0.01] rounded-[24px] p-12 text-center max-w-md mx-auto mt-12 space-y-4">
            <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center rounded-xl mx-auto text-zinc-500">
              <Funnel width={20} height={20} />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white">No Matching Openings</h3>
              <p className="text-xs text-zinc-400">
                We couldn`t find anything matching your query. Try clearing your active filters.
              </p>
            </div>
            <Button 
              size="sm" 
              variant="flat" 
              className="bg-white/5 text-white rounded-lg border border-white/5"
              onClick={handleResetFilters}
            >
              Reset Search Filters
            </Button>
          </div>
        )}
      </div>

    </div>
  );
}