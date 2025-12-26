import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/common/app-sidebar"
import { Search, Bell } from "lucide-react" 

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full bg-zinc-50/50 min-h-screen">
        <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-white px-4 shadow-sm">
          <SidebarTrigger />
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Search..."
                className="h-9 w-64 rounded-md border border-zinc-200 bg-white pl-9 pr-4 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="cursor-pointer text-zinc-500 hover:text-zinc-800 transition-colors relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500 border border-white"></span>
            </button>

            <div className="w-px h-6 bg-zinc-200/50"></div>

            <button className="cursor-pointer flex items-center hover:bg-zinc-100 hover:shadow-sm p-1 rounded-full transition-all">
              <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-600 to-blue-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                AD
              </div>
            </button>
          </div>


        </header>

        <div className="p-4">
          {children}
        </div>
      </main>
    </SidebarProvider>
  )
}