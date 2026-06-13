import { getUserSession } from "@/lib/core/session";
import {
  Bars,
  Bell,
  Briefcase,
  Envelope,
  Gear,
  House,
  Magnifier,
  Person,
  LayoutCellsLarge,
  Bookmark,     
  FileText,     
  CreditCard, 
  Persons,      
  Display,          
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";

export async function DashboardSidebar() {

  const user = await getUserSession();

  const adminNavItems = [
  {icon: LayoutCellsLarge,href: "/dashboard/admin",label: "Dashboard",},
  {icon: Persons,href: "/dashboard/admin/users",label: "Users",},
  {icon: Display,href: "/dashboard/admin/companies",label: "Companies",},
  {icon: Briefcase,href: "/dashboard/admin/jobs",label: "Jobs",},
  {icon: CreditCard,href: "/dashboard/admin/payments",label: "Payments",},
  {icon: Gear,href: "/dashboard/admin/settings",label: "Settings",},
];

  const recruiterNavLinks = [
    { icon: House, href: "/dashboard/recruiter", label: "Home" },
    {icon: Magnifier,href: "/dashboard/recruiter/jobs",label: "Jobs",},
    {icon: Bell,href: "/dashboard/recruiter/jobs/new",label: "Create a job",},
    {icon: Briefcase,href: "/dashboard/recruiter/company",label: "Company profile",},
    {icon: Envelope,href: "/dashboard/recruiter/applications",label: "Applications",},
    {icon: Gear,href: "/dashboard/recruiter/settings",label: "Settings",},
  ];

  const seekerNavLinks = [
  {icon: LayoutCellsLarge,href: "/dashboard/seeker",label: "Dashboard",},
  {icon: Briefcase,href: "/dashboard/seeker/jobs",label: "Jobs",},
  {icon: Bookmark,href: "/dashboard/seeker/saved-jobs",label: "Saved Jobs",},
  {icon: FileText,href: "/dashboard/seeker/applications",label: "Applications",},
  {icon: CreditCard,href: "/dashboard/seeker/billing",label: "Billing",},
];

  const navLinksMap = {
    seeker : seekerNavLinks,
    recruiter : recruiterNavLinks,
    admin : adminNavItems,
  }

  const navItems = navLinksMap[user?.role || "seeker"]
  const navContent = (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => (
        <Link
          key={item.label}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
          href={item.href}
        >
          <item.icon className="size-5 text-muted" />
          {item.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <div>
      <aside className="hidden w-64 shrink-0 border-r border-default p-4 lg:block">
        {navContent}
      </aside>
      <Drawer>
        <Button className={"lg:hidden"} variant="secondary">
          <Bars />
          Sidebar
        </Button>
        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />
              <Drawer.Header>
                <Drawer.Heading>Navigation</Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body>{navContent}</Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </div>
  );
}
