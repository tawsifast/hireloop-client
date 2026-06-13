import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { requireRole } from '@/lib/core/session';
import React from 'react';

const RecruiterLayout = async ({children}) => {

    await requireRole("recruiter")
    return children
   
};
export default RecruiterLayout;