// src/app/dashboard/admin/companies/CompaniesTable.jsx
"use client";

import React, { useState } from "react";
import { Table, Avatar, Chip, Button } from "@heroui/react";
import { CircleCheck, CircleXmark, GearDot, Globe } from "@gravity-ui/icons";
import toast from "react-hot-toast";
import { updatedCompany } from "@/lib/actions/companies";

const columns = [
  { id: "company", name: "COMPANY" },
  { id: "industry", name: "INDUSTRY" },
  { id: "location", name: "LOCATION" },
  { id: "employees", name: "EMPLOYEES" },
  { id: "JobCount", name: "JOBCOUNT" },
  { id: "status", name: "STATUS" },
  { id: "actions", name: "ACTIONS" },
];

export default function CompaniesTable({ initialCompanies }) {
  const [companies, setCompanies] = useState(initialCompanies);

  const handleStatusChange = async (companyId, newStatus) => {
    try {
      const result = await updatedCompany(companyId, { status: newStatus });
      console.log(companyId, newStatus, result);
      
      if (result.modifiedCount) {
        toast.success(`Company status updated to ${newStatus}`);
        setCompanies((prev) =>
        prev.map((c) => (c._id === companyId ? { ...c, status: newStatus } : c))
        );
      }
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const getStatusConfig = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return {
          color: "success",
          label: "Approved",
          icon: <CircleCheck width={14} height={14} />,
        };
      case "rejected":
        return {
          color: "danger",
          label: "Rejected",
          icon: <CircleXmark width={14} height={14} />,
        };
      default:
        return {
          color: "warning",
          label: "Pending Review",
          icon: <GearDot width={14} height={14} />,
        };
    }
  };

  return (
    <Table className="border border-white/10 bg-white/5 rounded-2xl">
      <Table.ScrollContainer>
        <Table.Content aria-label="Companies table">
          <Table.Header columns={columns}>
            {(column) => (
              <Table.Column
                key={column.id}
                id={column.id}
                isRowHeader={column.id === "company"}
                className={`text-zinc-400 font-semibold uppercase text-xs p-4 ${
                  column.id === "actions" ? "text-right" : ""
                }`}
              >
                {column.name}
              </Table.Column>
            )}
          </Table.Header>

          <Table.Body items={companies}>
            {(company) => {
              const currentStatus = getStatusConfig(company.status);

              return (
                <Table.Row key={company._id} id={company._id}>
                  <Table.Cell>
                    <div className="flex items-center gap-3">
                      <Avatar src={company?.logo} radius="lg" />
                      <div>
                        <div className="font-bold">{company.name}</div>
                        <a
                          href={company.website}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs text-indigo-400"
                        >
                          <Globe width={10} height={10} /> Website
                        </a>
                      </div>
                    </div>
                  </Table.Cell>

                  <Table.Cell>{company.industry}</Table.Cell>
                  <Table.Cell className="capitalize">
                    {company.location}
                  </Table.Cell>
                  <Table.Cell>{company.employeeCount} Tier</Table.Cell>

                  <Table.Cell>
                    <Chip color={currentStatus.color} variant="soft">
                      <div className="flex items-center gap-1">
                        {currentStatus.icon}
                        {currentStatus.label}
                      </div>
                    </Chip>
                  </Table.Cell>
                  <Table.Cell>{company.jobCount}</Table.Cell>

                  <Table.Cell className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {company.status?.toLowerCase() !== "approved" && (
                        <Button
                          size="sm"
                          variant="light"
                          onClick={() => handleStatusChange(company._id, "approved")}
                          className="bg-emerald-950/30 hover:bg-emerald-900/50 text-emerald-500 border border-emerald-900/60 rounded px-3 py-1 text-xs font-medium transition-colors"
                        >
                          Approve
                        </Button>
                      )}
                      {company.status?.toLowerCase() !== "rejected" && (
                        <Button
                          size="sm"
                          variant="light"
                          onClick={() => handleStatusChange(company._id, "rejected")}
                          className="bg-rose-950/20 hover:bg-rose-900/40 text-rose-500 border border-rose-900/40 rounded px-3 py-1 text-xs font-medium transition-colors"
                        >
                          Reject
                        </Button>
                      )}
                    </div>
                  </Table.Cell>
                </Table.Row>
              );
            }}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
}