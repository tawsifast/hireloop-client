import React from 'react';
import { getJobs } from '@/lib/api/jobs';
import JobSearchFilter from '@/components/jobs/JobSearchFilter';

const JobsPage = async () => {
    // Fetch your live job postings directly from your backend/MongoDB layer on the server
    const jobs = await getJobs() || [];

    return (
        <div className="w-11/12 mx-auto py-10">
            {/* Pass the full array directly into your client filter component.
              It handles rendering the search inputs and mapping over the filtered JobCards.
            */}
            <JobSearchFilter initialJobs={jobs} />
        </div>
    );
};

export default JobsPage;