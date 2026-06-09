"use client";

import React from 'react';
import { FloppyDisk, Link, FileText, Xmark } from "@gravity-ui/icons";
import {
  Button,
  Description,
  FieldError,
  FieldGroup,
  Fieldset,
  Form,
  Input,
  Label,
  TextArea,
  TextField,
} from "@heroui/react";
import { submitApplication } from '@/lib/actions/applications';
import toast from 'react-hot-toast';

const JobApply = ({ job, applicant }) => {
  
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    // const data = {};

    // // Map fields into a pure JS data payload block
    // formData.forEach((value, key) => {
    //   data[key] = value.toString();
    // });

    // // Append context metadata provided from your layout wrappers
    // data.jobId = job?._id?.$oid || job?._id;
    // data.applicantId = applicant?.id || applicant?._id;
    const seeker = Object.fromEntries(formData.entries());

    const submissionData = {
        jobId: job?._id,
        jobTitle: job?.title,
        companyName: job?.companyName,
        applicantId: applicant?.id,
        applicantName: applicant?.name,
        applicantEmail: applicant?.email,
        ...seeker
    }

    console.log("Submitting Application Data Payload:", submissionData);
    // alert(`Application submitted successfully for ${job?.title || 'this role'}!`);
    const res = await submitApplication(submissionData);
    if(res.insertedId){
        toast.success("Application submittem successfully")
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-[#1c1c1e] border border-white/5 p-6 sm:p-8 rounded-[24px] shadow-xl text-zinc-100">
      <Form className="w-full space-y-6" onSubmit={onSubmit}>
        <Fieldset>
          <Fieldset.Legend className="text-xl font-bold text-white tracking-tight">
            Apply for {job?.title || "Position"}
          </Fieldset.Legend>
          <Description className="text-zinc-400 text-sm mt-1">
            Review your pre-filled details and provide your professional resume layout to finalize your application.
          </Description>

          <FieldGroup className="space-y-5 mt-3">
            
            {/* APPLICANT NAME GRID (AUTO-FILLED READ ONLY) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TextField isReadOnly name="applicantName" defaultValue={applicant?.name || ""}>
                <Label className="text-zinc-300 text-xs font-semibold uppercase tracking-wider mb-1.5">Full Name</Label>
                <Input 
                  className="w-full bg-[#1f2937]/30 border border-white/5 rounded-xl h-11 text-zinc-500 text-sm cursor-not-allowed" 
                />
              </TextField>

              <TextField isReadOnly name="applicantEmail" type="email" defaultValue={applicant?.email || ""}>
                <Label className="text-zinc-300 text-xs font-semibold uppercase tracking-wider mb-1.5">Email Address</Label>
                <Input 
                  className="w-full bg-[#1f2937]/30 border border-white/5 rounded-xl h-11 text-zinc-500 text-sm cursor-not-allowed" 
                />
              </TextField>
            </div>

            {/* REQUIRED RESUME LINK INPUT WITH ICON LAYER */}
            <TextField
              isRequired
              name="resumeLink"
              type="url"
              validate={(value) => {
                if (!value.startsWith("http://") && !value.startsWith("https://")) {
                  return "Please provide a valid URL link (e.g., https://drive.google.com/...)";
                }
                return null;
              }}
            >
              <Label className="text-zinc-200 text-xs font-semibold uppercase tracking-wider mb-1.5">
                Resume Link <span className="text-red-500">*</span>
              </Label>
              {/* Layout wrapper to position the link icon nicely */}
              <div className="relative flex items-center">
                <div className="absolute left-3 text-zinc-500 pointer-events-none">
                  <Link width={16} height={16} />
                </div>
                <Input 
                  placeholder="https://drive.google.com/file/d/..." 
                  className="w-full bg-[#1f2937] border border-white/10 focus-within:border-white/20 rounded-xl h-11 pl-10 pr-4 text-white text-sm outline-none transition-colors"
                />
              </div>
              <Description className="text-zinc-500 text-xs mt-1.5">
                Provide a public Google Drive, Notion, or Dropbox link to your CV.
              </Description>
              <FieldError className="text-red-400 text-xs font-medium mt-1" />
            </TextField>

            {/* OPTIONAL INFORMATION / MESSAGE TEXT AREA WITH ICON LAYER */}
            <TextField name="coverLetter">
              <Label className="text-zinc-200 text-xs font-semibold uppercase tracking-wider mb-1.5">
                Message / Cover Letter <span className="text-zinc-500 font-normal">(Optional)</span>
              </Label>
              <div className="relative flex">
                <div className="absolute left-3 top-3.5 text-zinc-500 pointer-events-none">
                  <FileText width={16} height={16} />
                </div>
                <TextArea 
                  placeholder="Introduce yourself or highlight matching background experience for this role..." 
                  className="w-full bg-[#1f2937] border border-white/10 focus-within:border-white/20 rounded-xl pt-3 pb-3 pl-10 pr-4 text-white text-sm min-h-20 outline-none transition-colors"
                />
              </div>
              <FieldError className="text-red-400 text-xs font-medium mt-1" />
            </TextField>
          </FieldGroup>

          {/* FORM ACTIONS BUTTON GROUP */}
          <Fieldset.Actions className="flex items-center gap-3 mt-8 border-t border-white/5 pt-5">
            <Button 
              type="submit"
              className="bg-white text-black font-bold h-11 px-5 rounded-xl hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
            >
              <FloppyDisk width={16} height={16} />
              Submit Application
            </Button>
            
            <Button 
              type="reset" 
              variant="bordered"
              className="border-white/10 text-zinc-400 h-11 px-5 rounded-xl hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
            >
              <Xmark width={16} height={16} />
              Cancel
            </Button>
          </Fieldset.Actions>
        </Fieldset>
      </Form>
    </div>
  );
};

export default JobApply;