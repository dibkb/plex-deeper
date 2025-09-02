import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  return (
    <Sidebar className="bg-background">
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroupLabel>Search History</SidebarGroupLabel>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
