import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/common/app-sidebar"

import { DashboardHeader } from "@/components/dashboard/DashboardHeader"
import { DynamicBreadcrumb } from "@/components/common/dynamic-breadcrumb"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full bg-gray-50/50 min-h-screen flex flex-col">
        <DashboardHeader />
        <div className="flex-1 p-8">
          <DynamicBreadcrumb />
          {children}
        </div>
      </main>
    </SidebarProvider>
  )
}