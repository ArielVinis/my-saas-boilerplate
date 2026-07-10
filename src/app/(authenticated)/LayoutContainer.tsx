import { AppSidebar } from "@/components/templates/Sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getCurrentUser } from "@/server/auth/users";

export default async function LayoutContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await getCurrentUser();

  return (
    <SidebarProvider>
      <AppSidebar user={user} variant="inset" />
      <SidebarInset>
        <div className="flex flex-col flex-1">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
