"use client"

import { useState } from "react";
import {
  Briefcase,
  MapPin,
  Calendar,
  House,
  CircleDollar,
} from "@gravity-ui/icons";
import {
  Form,
  Fieldset,
  TextField,
  Label,
  FieldError,
  Input,
  Button,
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { createJobs } from "@/lib/actions/jobs";
import toast from "react-hot-toast";

const categories = [
  "Technology",
  "Design",
  "Marketing",
  "Finance",
  "Healthcare",
  "Education",
];

const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"];

const currencies = ["USD", "EUR", "GBP", "BDT"];

export default function PostJobPage() {
  const [isRemote, setIsRemote] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    // const user = Object.fromEntries(formData.entries());

    const jobData = {
      title: formData.get("title"),
      category: formData.get("category"),
      type: formData.get("type"),
      salaryMin: Number(formData.get("salaryMin")),
      salaryMax: Number(formData.get("salaryMax")),
      currency: formData.get("currency"),
      city: isRemote ? null : formData.get("city"),
      country: isRemote ? null : formData.get("country"),
      remote: isRemote,
      deadline: formData.get("deadline"),
      responsibilities: formData.get("responsibilities"),
      requirements: formData.get("requirements"),
      benefits: formData.get("benefits"),
      status: "active",
      companyId: "approved-company-id",
    };
    console.log(jobData);

    const res = await createJobs(jobData);
    if(res.insertedId){
        toast.success("Job posted successfully");
        redirect("/dashboard/recruiter")
        // e.currentTarget.reset();
        // setIsRemote(false);
    }

  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
          {/* Header */}
          <div className="border-b px-8 py-6">
            <h1 className="text-3xl font-bold text-white">Post a Job</h1>

            <p className="mt-2 text-sm text-gray-400">
              Create a new opportunity and publish it to candidates.
            </p>
          </div>

          <Form
            onSubmit={handleSubmit}
            validationBehavior="native"
            className="w-full"
          >
            <div className="space-y-8 p-8">
              {/* JOB INFO */}
              <Fieldset className="rounded-2xl border border-white/10 bg-white/2 p-6">
                <div className="mb-6 flex items-center gap-3">
                  <Briefcase />
                  <h2 className="text-lg font-semibold text-white">
                    Job Information
                  </h2>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <TextField name="title" isRequired>
                    <Label>Job Title</Label>
                    <Input
                      placeholder="Senior Frontend Developer"
                      className="w-full rounded-xl border border-white/10 bg-[#1f2937] px-4 py-3 text-white outline-none"
                    />
                    <FieldError />
                  </TextField>

                  <div>
                    <label className="mb-2 block text-sm text-gray-300">
                      Job Category
                    </label>

                    <select
                      name="category"
                      required
                      className="w-full rounded-xl border border-white/10 bg-[#1f2937] px-4 py-3 text-white outline-none"
                    >
                      <option value="">Select Category</option>

                      {categories.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-gray-300">
                      Job Type
                    </label>

                    <select
                      name="type"
                      required
                      className="w-full rounded-xl border border-white/10 bg-[#1f2937] px-4 py-3 text-white outline-none"
                    >
                      <option value="">Select Type</option>

                      {jobTypes.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-gray-300">
                      Currency
                    </label>

                    <select
                      name="currency"
                      required
                      className="w-full rounded-xl border border-white/10 bg-[#1f2937] px-4 py-3 text-white outline-none"
                    >
                      <option value="">Select Currency</option>

                      {currencies.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-gray-300">
                      Minimum Salary
                    </label>

                    <div className="relative">
                      <CircleDollar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                      <input
                        name="salaryMin"
                        type="number"
                        placeholder="30000"
                        className="w-full rounded-xl border border-white/10 bg-[#1f2937] py-3 pl-10 pr-4 text-white outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-gray-300">
                      Maximum Salary
                    </label>

                    <div className="relative">
                      <CircleDollar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                      <input
                        name="salaryMax"
                        type="number"
                        placeholder="50000"
                        className="w-full rounded-xl border border-white/10 bg-[#1f2937] py-3 pl-10 pr-4 text-white outline-none"
                      />
                    </div>
                  </div>

                  {/* REMOTE CHECKBOX */}
                  <div className="md:col-span-2 flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="remote"
                      checked={isRemote}
                      onChange={(e) => setIsRemote(e.target.checked)}
                      className="w-4 h-4 cursor-pointer"
                    />
                    <label htmlFor="remote" className="text-sm text-white cursor-pointer">
                      Remote Position
                    </label>
                  </div>

                  {/* CITY AND COUNTRY - SHOW ONLY IF NOT REMOTE */}
                  {!isRemote && (
                    <>
                      <div>
                        <label className="mb-2 block text-sm text-gray-300">
                          City
                        </label>

                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                          <input
                            name="city"
                            placeholder="Dhaka"
                            className="w-full rounded-xl border border-white/10 bg-[#1f2937] py-3 pl-10 pr-4 text-white outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="mb-2 block text-sm text-gray-300">
                          Country
                        </label>

                        <input
                          name="country"
                          placeholder="Bangladesh"
                          className="w-full rounded-xl border border-white/10 bg-[#1f2937] px-4 py-3 text-white outline-none"
                        />
                      </div>
                    </>
                  )}

                  <div>
                    <label className="mb-2 block text-sm text-gray-300">
                      Application Deadline
                    </label>

                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                      <input
                        name="deadline"
                        type="date"
                        className="w-full rounded-xl border border-white/10 bg-[#1f2937] py-3 pl-10 pr-4 text-white outline-none"
                      />
                    </div>
                  </div>
                </div>
              </Fieldset>

              {/* DESCRIPTION */}
              <Fieldset className="rounded-2xl border border-white/10 bg-white/2 p-6">
                <div className="mb-6 flex items-center gap-3">
                  <Briefcase />
                  <h2 className="text-lg font-semibold text-white">
                    Job Description
                  </h2>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="mb-2 block text-sm text-gray-300">
                      Responsibilities
                    </label>

                    <textarea
                      name="responsibilities"
                      rows={2}
                      className="w-full rounded-xl border border-white/10 bg-[#1f2937] p-4 text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-gray-300">
                      Requirements
                    </label>

                    <textarea
                      name="requirements"
                      rows={2}
                      className="w-full rounded-xl border border-white/10 bg-[#1f2937] p-4 text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-gray-300">
                      Benefits (Optional)
                    </label>

                    <textarea
                      name="benefits"
                      rows={2}
                      className="w-full rounded-xl border border-white/10 bg-[#1f2937] p-4 text-white outline-none"
                    />
                  </div>
                </div>
              </Fieldset>

              {/* COMPANY */}
              <Fieldset className="rounded-2xl border border-white/10 bg-white/2 p-6">
                <div className="mb-6 flex items-center gap-3">
                  <House />
                  <h2 className="text-lg font-semibold text-white">
                    Company Information
                  </h2>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm text-gray-300">
                      Company Name
                    </label>

                    <input
                      readOnly
                      value="HireLoop Inc."
                      className="w-full rounded-xl border border-white/10 bg-[#1f2937] px-4 py-3 text-white"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-gray-300">
                      Company Website
                    </label>

                    <input
                      readOnly
                      value="https://hireloop.com"
                      className="w-full rounded-xl border border-white/10 bg-[#1f2937] px-4 py-3 text-white"
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <span className="rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
                    Approved Company
                  </span>
                </div>
              </Fieldset>
            </div>

            {/* FOOTER */}
            <div className="flex justify-end gap-3 border-t border-white/10 px-8 py-5">
              <Button variant="bordered">Cancel</Button>

              <Button variant="flat">Save Draft</Button>

              <Button color="primary" type="submit">
                Publish Job
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}