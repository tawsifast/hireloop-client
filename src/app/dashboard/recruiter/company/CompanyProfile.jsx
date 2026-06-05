"use client";

import React, { useState, useRef } from "react";
import {
  Form,
  Fieldset,
  TextField,
  Label,
  Input,
  FieldError,
  Button,
  Chip,
} from "@heroui/react";
import {
  House,
  Globe,
  MapPin,
  Persons,
  Layers,
  ArrowUpFromLine,
  Pencil,
  CircleCheck,
  CircleXmark,
  GearDot,
} from "@gravity-ui/icons";
import { createCompany } from "@/lib/actions/companies";
import toast from "react-hot-toast";

export default function CompanyProfile() {
  // Set to null initially because no company is registered yet
  const [company, setCompany] = useState(null);

  // Controls structural UI conditional transitions
  const [isRegistered, setIsRegistered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Asset upload pipeline monitoring
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedLogoUrl, setUploadedLogoUrl] = useState("");

  const fileInputRef = useRef(null);

  // Status Badge configurations
  const getStatusConfig = (status) => {
    switch (status) {
      case "approved":
        return {
          color: "success",
          label: "Approved",
          icon: <CircleCheck className="text-emerald-400" />,
        };
      case "rejected":
        return {
          color: "danger",
          label: "Rejected",
          icon: <CircleXmark className="text-rose-400" />,
        };
      default:
        return {
          color: "warning",
          label: "Pending Review",
          icon: <GearDot className="text-amber-400" />,
        };
    }
  };

  // Client-side ImgBB hosting handler
  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const IMGBB_API_KEY =process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API;
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        {
          method: "POST",
          body: formData,
        },
      );

      const result = await response.json();
      if (result.success) {
        setUploadedLogoUrl(result.data.url);
      } else {
        alert("Upload failed. Verify API key credentials.");
      }
    } catch (error) {
      console.error("ImgBB upload error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  // Form payload handling
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());

    // Inject hosted image link and initial status into dataset schema
    data.logo = uploadedLogoUrl || "https://placehold.co/150";
    data.status = "pending"; // Default status for new registrations

    setCompany(data);

    const payload = await createCompany(data);
    if(payload.insertedId){
        toast.success("company profile created successfully")
    }

    setIsRegistered(true);
    setIsEditing(false);
    console.log("Saving Normalized Company Dataset: ", data);
  };

  // 1. UNREGISTERED PROMPT VIEW (Initial Active State)
  if (!isRegistered && !isEditing) {
    return (
      <div className="bg-[#121214] min-h-screen flex items-center justify-center p-4 text-zinc-100">
        <div className="max-w-md w-full border border-white/10 bg-white/5 rounded-2xl p-8 text-center space-y-6 backdrop-blur-md">
          <div className="w-16 h-16 bg-[#1f2937] border border-white/10 rounded-2xl flex items-center justify-center mx-auto shadow-xl text-zinc-400">
            <House width={28} height={28} />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white">
              No Registered Company
            </h3>
            <p className="text-sm text-gray-400 max-w-xs mx-auto">
              Get started by establishing your workspace profile to start
              processing live recruitment job positions.
            </p>
          </div>
          <Button
            color="primary"
            className="w-full font-semibold rounded-xl py-6 bg-blue-600 hover:bg-blue-700"
            onClick={() => setIsEditing(true)}
          >
            Register Company
          </Button>
        </div>
      </div>
    );
  }

  // Configuration processing if data parameters exist
  const currentStatus = company ? getStatusConfig(company.status) : null;

  return (
    <div className="bg-[#121214] min-h-screen p-4 md:p-10 text-zinc-100 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white/2 border border-white/10 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-md">
        {isEditing ? (
          /* REGISTRATION / EDIT PROFILE INPUT INTERFACE */
          <Form
            onSubmit={handleFormSubmit}
            validationBehavior="native"
            className="w-full"
          >
            <div className="space-y-8 p-6 md:p-8">
              <Fieldset className="rounded-2xl border border-white/10 bg-white/2 p-6">
                <div className="mb-6 flex items-center gap-3">
                  <House className="text-zinc-400" />
                  <h2 className="text-lg font-semibold text-white">
                    {company
                      ? "Update Workspace Parameters"
                      : "Register New Company"}
                  </h2>
                </div>

                {/* LOGO UPLOAD COMPONENT BLOCK */}
                <div className="mb-6 flex flex-col sm:flex-row items-center gap-5 p-4 border border-white/5 bg-[#1f2937]/40 rounded-xl">
                  <div className="w-20 h-20 bg-[#1f2937] border border-white/10 rounded-xl overflow-hidden flex items-center justify-center relative group">
                    {uploadedLogoUrl ? (
                      <img
                        src={uploadedLogoUrl}
                        alt="Preview Logo"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <House className="text-zinc-600" width={24} height={24} />
                    )}
                  </div>
                  <div className="flex-1 space-y-2 text-center sm:text-left">
                    <p className="text-sm font-medium text-white">
                      Corporate Identity Emblem
                    </p>
                    <p className="text-xs text-gray-400">
                      PNG, JPG formats supported. Auto-hosted using ImgBB
                      infrastructure APIs.
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      size="sm"
                      variant="bordered"
                      className="border-white/10 text-zinc-200"
                      isLoading={isUploading}
                      onClick={() => fileInputRef.current.click()}
                      startContent={
                        !isUploading && (
                          <ArrowUpFromLine width={14} height={14} />
                        )
                      }
                    >
                      {isUploading
                        ? "Uploading Data Assets..."
                        : "Upload Image Asset"}
                    </Button>
                  </div>
                </div>

                {/* FORM DATA MATRIX GRID */}
                <div className="grid gap-5 md:grid-cols-2">
                  <TextField
                    name="name"
                    defaultValue={company?.name}
                    isRequired
                  >
                    <Label className="text-zinc-300 text-sm">
                      Company Name
                    </Label>
                    <Input
                      placeholder="e.g. Hireloop Enterprise"
                      className="w-full rounded-xl border border-white/10 bg-[#1f2937] px-4 py-3 text-white outline-none mt-1.5"
                    />
                    <FieldError />
                  </TextField>

                  <TextField
                    name="website"
                    type="url"
                    defaultValue={company?.website}
                    isRequired
                  >
                    <Label className="text-zinc-300 text-sm">
                      Company Website URL
                    </Label>
                    <Input
                      placeholder="https://example.com"
                      className="w-full rounded-xl border border-white/10 bg-[#1f2937] px-4 py-3 text-white outline-none mt-1.5"
                    />
                    <FieldError />
                  </TextField>

                  <TextField
                    name="industry"
                    defaultValue={company?.industry}
                    isRequired
                  >
                    <Label className="text-zinc-300 text-sm">
                      Industry Sector
                    </Label>
                    <Input
                      placeholder="e.g. FinTech / SaaS"
                      className="w-full rounded-xl border border-white/10 bg-[#1f2937] px-4 py-3 text-white outline-none mt-1.5"
                    />
                    <FieldError />
                  </TextField>

                  <TextField
                    name="location"
                    defaultValue={company?.location}
                    isRequired
                  >
                    <Label className="text-zinc-300 text-sm">
                      Global Location HQ
                    </Label>
                    <Input
                      placeholder="e.g. London, UK"
                      className="w-full rounded-xl border border-white/10 bg-[#1f2937] px-4 py-3 text-white outline-none mt-1.5"
                    />
                    <FieldError />
                  </TextField>

                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm text-gray-300">
                      Staff Headcount Tier
                    </label>
                    <select
                      name="employeeCount"
                      defaultValue={company?.employeeCount || ""}
                      required
                      className="w-full rounded-xl border border-white/10 bg-[#1f2937] px-4 py-3 text-white outline-none"
                    >
                      <option value="" disabled>
                        Select workforce capacity dimensions...
                      </option>
                      <option value="1-10">1-10 Employees</option>
                      <option value="11-50">11-50 Employees</option>
                      <option value="50-100">50-100 Employees</option>
                      <option value="100-500">100-500 Employees</option>
                      <option value="500+">500+ Industry Personnel</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm text-gray-300">
                      Business Summary Overview
                    </label>
                    <textarea
                      name="description"
                      defaultValue={company?.description}
                      required
                      rows={4}
                      placeholder="Provide comprehensive background data metrics about your functional operational models..."
                      className="w-full rounded-xl border border-white/10 bg-[#1f2937] p-4 text-white outline-none"
                    />
                  </div>
                </div>
              </Fieldset>
            </div>

            {/* FORM MODAL ACTION PANEL */}
            <div className="flex justify-end gap-3 border-t border-white/10 px-8 py-5">
              <Button
                type="button"
                variant="bordered"
                className="border-white/10 text-white"
                onClick={() => {
                  if (company) {
                    setIsEditing(false);
                  } else {
                    setIsEditing(false);
                    setIsRegistered(false);
                  }
                }}
              >
                Cancel
              </Button>
              <Button color="primary" type="submit" disabled={isUploading}>
                Save Details
              </Button>
            </div>
          </Form>
        ) : (
          /* DISPLAY PROFILE CONTENT PANEL STATS */
          <div>
            <div className="p-6 md:p-8 border-b border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/[0.01]">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl border border-white/10 bg-[#1f2937] overflow-hidden p-1 flex items-center justify-center">
                  <img
                    src={company.logo}
                    alt="Corporate Logo"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <h1 className="text-2xl font-bold tracking-tight text-white">
                      {company.name}
                    </h1>
                    <Chip
                      color={currentStatus.color}
                      variant="soft"
                      size="sm"
                      className="font-semibold capitalize px-2.5 border border-white/5"
                    >
                      <div className="flex items-center gap-1">
                        {currentStatus.icon && (
                          <span className="w-4 h-4 flex items-center justify-center">
                            {currentStatus.icon}
                          </span>
                        )}
                        {currentStatus.label}
                      </div>
                    </Chip>
                  </div>
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-indigo-400 hover:underline flex items-center gap-1 mt-1"
                  >
                    <Globe width={12} height={12} />
                    {company.website}
                  </a>
                </div>
              </div>

              <Button
                variant="bordered"
                className="border-white/10 text-white font-medium text-xs rounded-xl"
                onClick={() => {
                  setUploadedLogoUrl(company.logo);
                  setIsEditing(true);
                }}
                startContent={<Pencil width={13} height={13} />}
              >
                Edit Profile
              </Button>
            </div>

            <div className="p-6 md:p-8 grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2 space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">
                  About the Organization
                </h3>
                <p className="text-zinc-300 text-sm leading-relaxed bg-white/[0.02] p-4 rounded-xl border border-white/5">
                  {company.description}
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">
                  Structural Overview
                </h3>
                <div className="divide-y divide-white/5 border border-white/10 rounded-xl bg-[#1f2937]/20 overflow-hidden">
                  <div className="p-3.5 flex items-center gap-3">
                    <Layers className="text-zinc-500" width={16} height={16} />
                    <div>
                      <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-wide">
                        Sector
                      </p>
                      <p className="text-xs font-medium text-zinc-200">
                        {company.industry}
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 flex items-center gap-3">
                    <MapPin className="text-zinc-500" width={16} height={16} />
                    <div>
                      <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-wide">
                        HQ Location
                      </p>
                      <p className="text-xs font-medium text-zinc-200">
                        {company.location}
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 flex items-center gap-3">
                    <Persons className="text-zinc-500" width={16} height={16} />
                    <div>
                      <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-wide">
                        Workforce Tier
                      </p>
                      <p className="text-xs font-medium text-zinc-200">
                        {company.employeeCount} Employees
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
