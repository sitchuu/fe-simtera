"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const ROUTE_NAMES: Record<string, string> = {
  dashboard: "Dashboard",
  "penetapan-konteks": "Penetapan Konteks",
  "profil-risiko": "Profil Risiko",
  "penanganan-risiko": "Penanganan Risiko",
  pemantauan: "Pemantauan & Tinjau",
  laporan: "Laporan",
  settings: "Pengaturan",
  pengaturan: "Pengaturan",
  "sub-kategori-risiko": "Sub Kategori Risiko",
}

export function DynamicBreadcrumb() {
  const pathname = usePathname()
  const pathSegments = pathname.split("/").filter((segment) => segment !== "")

  return (
    <Breadcrumb className="mb-4">
      <BreadcrumbList>
        {pathSegments.map((segment, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join("/")}`
          const isLast = index === pathSegments.length - 1
          const name = ROUTE_NAMES[segment] || segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())

          return (
            <div key={href} className="flex items-center">
              {index > 0 && (
                <BreadcrumbSeparator className="mx-2" />
              )}
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{name}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={href}>
                    {name}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </div>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
