"use client"

import React from "react"
import { Search, Bell } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-white px-6 shadow-sm">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        {/* Mobile Search or Breadcrumbs could go here */}
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="h-9 w-64 rounded-full border border-gray-200 bg-gray-50 pl-9 pr-4 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100">
          <Bell className="h-5 w-5" />
        </button>

        <div className="h-8 w-px bg-gray-200 mx-1"></div>

        <button className="flex items-center gap-3 hover:bg-gray-50 p-1.5 pr-3 rounded-full transition-all border border-transparent hover:border-gray-100">
          <div className="h-8 w-8 rounded-full bg-linear-to-tr from-blue-600 to-blue-500 flex items-center justify-center text-white text-xs font-bold shadow-sm ring-2 ring-white">
            AD
          </div>
          <div className="hidden md:block text-left">
            <p className="text-sm font-semibold text-gray-700 leading-none">Admin</p>
            <p className="text-xs text-gray-500 mt-0.5">Administrator</p>
          </div>
        </button>
      </div>
    </header>
  )
}
