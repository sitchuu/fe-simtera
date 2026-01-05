"use client"

import React from "react"
import { FilterDropdown } from "@/components/dashboard/filter-dropdown"

// Default Data for Filters
export const DEFAULT_UNITS = [
  "Semua Unit", "KEP", "KBT", "PEP", "TLK", "TUR", "PPM", "PPM1", 
  "FAS", "FAS1", "MIT", "MIT1", "DAI", "DAI1", "TSP", "MES", 
  "KTL", "ELE", "OTO", "LAF", "TET", "PUM", "RBI", "SPI", "UPG"
]
export const DEFAULT_TRIWULAN = ["Triwulan 1", "Triwulan 2", "Triwulan 3", "Triwulan 4"]
export const DEFAULT_YEARS = Array.from({ length: 6 }, (_, i) => (new Date().getFullYear() - i).toString())

interface DashboardFiltersProps {
  selectedUnit: string
  setSelectedUnit: (value: string) => void
  selectedTriwulan: string
  setSelectedTriwulan: (value: string) => void
  selectedYear: string
  setSelectedYear: (value: string) => void
  units?: string[]
  triwulan?: string[]
  years?: string[]
  className?: string
}

export function DashboardFilters({
  selectedUnit,
  setSelectedUnit,
  selectedTriwulan,
  setSelectedTriwulan,
  selectedYear,
  setSelectedYear,
  units = DEFAULT_UNITS,
  triwulan = DEFAULT_TRIWULAN,
  years = DEFAULT_YEARS,
  className,
}: DashboardFiltersProps) {
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <FilterDropdown 
        label="Unit"
        value={selectedUnit}
        options={units}
        onSelect={setSelectedUnit}
        className="w-27.5"
      />
      <FilterDropdown 
        label="Triwulan"
        value={selectedTriwulan}
        options={triwulan}
        onSelect={setSelectedTriwulan}
        className="w-32.5"
      />
      <FilterDropdown 
        label="Tahun"
        value={selectedYear}
        options={years}
        onSelect={setSelectedYear}
        className="w-20"
      />
    </div>
  )
}
