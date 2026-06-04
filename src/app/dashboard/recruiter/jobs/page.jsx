import { getComapnyJobs } from "@/lib/api/jobs";
import { Table, Chip, Button, Tooltip } from "@heroui/react";
import { Eye, Pencil, TrashBin } from '@gravity-ui/icons';

const RecruiterJobs = async () => {
  const companyId = "approved-company-id";
  const jobs = await getComapnyJobs(companyId);
  console.log(jobs, "jobs");
  return (
    <div>
      <div className="bg-[#121214] min-h-screen p-6 md:p-10 text-zinc-100">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header Context */}
          <div className="flex flex-col gap-1 border-b border-zinc-800 pb-4">
            <h2 className="text-xl font-bold tracking-tight text-white">
              Manage All Job Listings
            </h2>
            <p className="text-xs text-zinc-400">
              View, update, or remove currently active and inactive career
              openings.
            </p>
          </div>

          {/* Table implementation with column resizing */}
          <div className="bg-[#1c1c1e] border border-zinc-800 rounded-xl overflow-hidden shadow-2xl p-4">
            <Table
              aria-label="Company jobs management table"
              removeWrapper
              className="bg-transparent"
            >
              <Table.ResizableContainer>
                <Table.Content
                  aria-label="Table with resizable columns"
                  className="min-w-200"
                >
                  <Table.Header>
                    <Table.Column
                      isRowHeader
                      defaultWidth="2fr"
                      id="title"
                      minWidth={200}
                    >
                      Job Title
                      <Table.ColumnResizer />
                    </Table.Column>
                    <Table.Column
                      defaultWidth="1.2fr"
                      id="category"
                      minWidth={140}
                    >
                      Category
                      <Table.ColumnResizer />
                    </Table.Column>
                    <Table.Column
                      defaultWidth="1.5fr"
                      id="location"
                      minWidth={160}
                    >
                      Location
                      <Table.ColumnResizer />
                    </Table.Column>
                    <Table.Column defaultWidth="1fr" id="status" minWidth={100}>
                      Status
                      <Table.ColumnResizer />
                    </Table.Column>
                    <Table.Column
                      defaultWidth="1fr"
                      id="actions"
                      minWidth={120}
                      align="center"
                    >
                      Actions
                    </Table.Column>
                  </Table.Header>

                  <Table.Body
                    emptyContent={"No jobs posted yet by this company."}
                  >
                    {jobs.map((job) => {
                      // Safely derive unique row ID handling string or MongoDB OID formats
                      const jobId =
                        job._id?.$oid || job._id || Math.random().toString();

                      // Compute visual configuration parameters based on active statuses
                      const isJobActive = job.status === "active";
                      const statusColor = isJobActive ? "success" : "danger";

                      return (
                        <Table.Row
                          key={jobId}
                          className="border-b border-zinc-800/50 hover:bg-zinc-900/30 transition-colors"
                        >
                          {/* COLUMN 1: TITLE & ARRANGEMENT BADGE */}
                          <Table.Cell>
                            <div className="flex flex-col items-start gap-1">
                              <span className="font-semibold text-zinc-100 text-sm">
                                {job.title || "Untitled Role"}
                              </span>
                              <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 font-medium border border-zinc-700/50">
                                {job.type}
                              </span>
                            </div>
                          </Table.Cell>

                          {/* COLUMN 2: CATEGORY */}
                          <Table.Cell>
                            <span className="text-zinc-300 text-sm">
                              {job.category}
                            </span>
                          </Table.Cell>

                          {/* COLUMN 3: GEOGRAPHIC/REMOTE LOCATION */}
                          <Table.Cell>
                            <span className="text-zinc-300 text-sm">
                              {job.remote ? (
                                <span className="text-indigo-400 font-medium">
                                  Remote
                                </span>
                              ) : (
                                `${job.city || ""}, ${job.country || ""}`
                              )}
                            </span>
                          </Table.Cell>

                          {/* COLUMN 4: DYNAMIC STATUS CHIP */}
                          <Table.Cell>
                            <Chip
                              color={statusColor}
                              size="sm"
                              variant="soft"
                              className="capitalize font-medium"
                            >
                              {job.status || "inactive"}
                            </Chip>
                          </Table.Cell>

                          {/* COLUMN 5: ACTION ICON BUTTON CONTROLS */}
                          <Table.Cell>
                            <div className="flex items-center justify-center gap-2">
                              <Tooltip
                                content="View Details"
                                closeDelay={50}
                                classNames={{
                                  content: "bg-zinc-800 text-xs text-zinc-200",
                                }}
                              >
                                <Button
                                  isIconOnly
                                  size="sm"
                                  variant="light"
                                  className="text-zinc-400 hover:text-white min-w-8 h-8 rounded-md"
                                >
                                  <Eye width={15} height={15} />
                                </Button>
                              </Tooltip>

                              <Tooltip
                                content="Edit Job"
                                closeDelay={50}
                                classNames={{
                                  content: "bg-zinc-800 text-xs text-zinc-200",
                                }}
                              >
                                <Button
                                  isIconOnly
                                  size="sm"
                                  variant="light"
                                  className="text-zinc-400 hover:text-amber-400 min-w-8 h-8 rounded-md"
                                >
                                  <Pencil width={14} height={14} />
                                </Button>
                              </Tooltip>

                              <Tooltip
                                content="Delete Listing"
                                closeDelay={50}
                                classNames={{
                                  content: "bg-zinc-800 text-xs text-zinc-200",
                                }}
                              >
                                <Button
                                  isIconOnly
                                  size="sm"
                                  variant="light"
                                  className="text-zinc-400 hover:text-rose-500 min-w-8 h-8 rounded-md"
                                >
                                  <TrashBin width={15} height={15} />
                                </Button>
                              </Tooltip>
                            </div>
                          </Table.Cell>
                        </Table.Row>
                      );
                    })}
                  </Table.Body>
                </Table.Content>
              </Table.ResizableContainer>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterJobs;
