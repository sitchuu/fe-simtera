"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Home, Settings, LogOut, Folder, ChevronRight } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

const items = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Penetapan Konteks", url: "/dashboard/penetapan-konteks", icon: Folder },
  { title: "Profil Risiko", url: "/dashboard/profil-risiko", icon: Folder },
  { title: "Penanganan Risiko", url: "/dashboard/penanganan-risiko", icon: Folder },
  { title: "Pemantauan & Tinjau", url: "/dashboard/pemantauan", icon: Folder },
  { title: "Laporan", url: "/dashboard/laporan", icon: Folder },
]

export function AppSidebar() {
  const pathname = usePathname()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <Sidebar
      style={{
        "--sidebar": "#3b82f6",
        "--sidebar-foreground": "#ffffff",
        "--sidebar-primary": "#ffffff",
        "--sidebar-primary-foreground": "#3b82f6",
        "--sidebar-accent": "#ffffff",
        "--sidebar-accent-foreground": "#3b82f6",
        "--sidebar-border": "transparent",
        "--sidebar-ring": "#93c5fd",
      } as React.CSSProperties}
      className="border-none"
    >
      <SidebarHeader className="h-16 flex flex-row items-center justify-start pl-2">
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10">
            <Image
              src="/img/logo-bmti.png"
              alt="Logo BMTI"
              fill
              className="object-contain"
            />
          </div>
          <span className="font-bold text-lg tracking-wide text-white">SIMTERA</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2 px-2 mt-3">
              {items.map((item) => {
                // Use startsWith for child route matching, but exact match for dashboard home
                const isActive = item.url === "/dashboard" 
                  ? pathname === "/dashboard"
                  : pathname.startsWith(item.url)
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className="h-10 px-4 font-normal hover:bg-white/10 hover:text-white data-[active=true]:bg-white data-[active=true]:text-blue-600 transition-all text-white"
                    >
                      <Link href={item.url}>
                        <item.icon className={isActive ? "text-blue-600" : "text-white"} />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 mt-auto">
        <SidebarMenu className="gap-2">
          {mounted ? (
            <Collapsible className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    className="h-10 px-4 font-normal text-white hover:bg-white/10 hover:text-white rounded-lg w-full justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      <span>Pengaturan</span>
                    </div>
                    <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub className="border-l-white/20 ml-6 mt-1">
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        asChild
                        className="text-white/80 hover:text-white hover:bg-white/10"
                        isActive={pathname === "/dashboard/pengaturan/sub-kategori-risiko"}
                      >
                        <Link href="/dashboard/pengaturan/sub-kategori-risiko">
                          <span>Sub Kategori Risiko</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ) : (
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="h-10 px-4 font-normal text-white hover:bg-white/10 hover:text-white rounded-lg"
              >
                <Link href="/dashboard/settings">
                  <Settings className="h-5 w-5" />
                  <span>Pengaturan</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}

          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="h-10 px-4 font-normal text-white hover:bg-white/10 hover:text-white rounded-lg"
            >
              <Link href="/logout">
                <LogOut className="h-5 w-5" />
                <span>Keluar</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
