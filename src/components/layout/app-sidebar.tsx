import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Logo } from "../logo";
import {
  LayoutDashboard,
  GitCompareArrows,
  Bot,
  FileText,
  Settings,
  AlertTriangle,
  Globe,
} from "lucide-react";
import { UserNav } from "../user-nav";
import { Separator } from "../ui/separator";

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader>
        <div className="group-data-[collapsible=icon]:hidden">
          <Logo />
        </div>
        <div className="hidden group-data-[collapsible=icon]:block">
          <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="M9.5 9a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0Z" />
              <path d="M12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
              <path d="m14.5 9.5.5.5" />
              <path d="m9.5 14.5.5.5" />
              <path d="M12 12v5" />
            </svg>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Dashboard" isActive>
              <LayoutDashboard />
              Dashboard
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Alerts">
              <AlertTriangle />
              Alerts
            </SidebarMenuButton>
          </SidebarMenuItem>
           <Separator className="my-2" />
           <SidebarMenuItem>
            <SidebarMenuButton tooltip="Threat Intelligence Map">
              <Globe />
              Threat Map
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Anomaly Detection">
              <GitCompareArrows />
              Anomaly Detection
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Adaptive Response">
              <Bot />
              Adaptive Response
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Log Analysis">
              <FileText />
              Log Analysis
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Settings">
              <Settings />
              Settings
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <div className="hidden group-data-[collapsible=icon]:block p-2">
            <UserNav />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
