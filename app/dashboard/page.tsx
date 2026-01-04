"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RiskHeatmap } from "@/components/dashboard/risk-heatmap"
import { TopRisks } from "@/components/dashboard/top-risks"
import { RiskDistributionChart } from "@/components/dashboard/risk-distribution-chart"
import { RiskControlChart } from "@/components/dashboard/risk-control-chart"
import { FilterDropdown } from "@/components/dashboard/filter-dropdown"
import { ChevronDown, Shield, Flame, AlertTriangle, Activity } from "lucide-react"
import gsap from "gsap"

// Mock Data for Filters
const UNITS = [
  "Semua Unit", "KEP", "KBT", "PEP", "TLK", "TUR", "PPM", "PPM1", 
  "FAS", "FAS1", "MIT", "MIT1", "DAI", "DAI1", "TSP", "MES", 
  "KTL", "ELE", "OTO", "LAF", "TET", "PUM", "RBI", "SPI", "UPG"
]
const TRIWULAN = ["Triwulan 1", "Triwulan 2", "Triwulan 3", "Triwulan 4"]
const YEARS = Array.from({ length: 6 }, (_, i) => (new Date().getFullYear() - i).toString())

export default function DashboardPage() {
  const [selectedUnit, setSelectedUnit] = useState("Semua Unit")
  const [selectedTriwulan, setSelectedTriwulan] = useState("Triwulan 4")
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString())

  // Animation Refs
  const count1Ref = useRef({ value: 0 })
  const count2Ref = useRef({ value: 0 })
  const count3Ref = useRef({ value: 0 })
  const count4Ref = useRef({ value: 0 })
  
  const num1Ref = useRef<HTMLDivElement>(null)
  const num2Ref = useRef<HTMLDivElement>(null)
  const num3Ref = useRef<HTMLDivElement>(null)
  const num4Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const animateCount = (obj: { value: number }, target: number, element: React.MutableRefObject<HTMLDivElement | null>) => {
      gsap.to(obj, {
        value: target,
        duration: 2,
        ease: "power2.out",
        onUpdate: () => {
          if (element.current) {
            element.current.textContent = Math.round(obj.value).toString()
          }
        },
      })
    }

    animateCount(count1Ref.current, 45, num1Ref)
    animateCount(count2Ref.current, 9, num2Ref)
    animateCount(count3Ref.current, 12, num3Ref)
    animateCount(count4Ref.current, 15, num4Ref)
  }, [])

  return (
    <div className="flex flex-col gap-6">
      {/* HEADER: Title & Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Dashboard</h1>
        <div className="flex items-center gap-2">
          {/* Unit Filter */}
          <FilterDropdown 
            label="Unit"
            value={selectedUnit}
            options={UNITS}
            onSelect={setSelectedUnit}
            className="w-[110px]"
          />
          
          {/* Triwulan Filter */}
          <FilterDropdown 
            label="Triwulan"
            value={selectedTriwulan}
            options={TRIWULAN}
            onSelect={setSelectedTriwulan}
            className="w-[130px]"
          />

          {/* Year Filter */}
          <FilterDropdown 
            label="Tahun"
            value={selectedYear}
            options={YEARS}
            onSelect={setSelectedYear}
            className="w-[80px]"
          />
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Risiko */}
        <Card className="shadow-sm relative overflow-hidden">
          <CardHeader className="pt-4 pb-1 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium text-zinc-500">
              Total Risiko
            </CardTitle>
            <Shield className="h-4 w-4 text-zinc-400" />
          </CardHeader>
          <CardContent>
            <div ref={num1Ref} className="text-3xl font-bold text-zinc-900">0</div>
            <p className="text-xs text-zinc-500 mt-6 flex items-center gap-1">
              <span className="text-green-600 font-medium">- 2</span> dari triwulan lalu
            </p>
          </CardContent>
        </Card>

        {/* Sangat Tinggi */}
        <Card className="shadow-sm relative overflow-hidden">
          <CardHeader className="pt-4 pb-1 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium text-zinc-500">
              Sangat Tinggi
            </CardTitle>
            <Flame className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div ref={num2Ref} className="text-3xl font-bold text-red-600">0</div>
            <p className="text-xs text-zinc-500 mt-6 flex items-center gap-1">
              <span className="text-red-600 font-medium">+ 1</span> dari triwulan lalu
            </p>
          </CardContent>
        </Card>

        {/* Tinggi */}
        <Card className="shadow-sm relative overflow-hidden">
          <CardHeader className="pt-4 pb-1 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium text-zinc-500">
              Tinggi
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div ref={num3Ref} className="text-3xl font-bold text-orange-600">0</div>
            <p className="text-xs text-zinc-500 mt-6 flex items-center gap-1">
              <span className="text-zinc-500 font-medium">- 0</span> dari triwulan lalu
            </p>
          </CardContent>
        </Card>

        {/* Sedang */}
        <Card className="shadow-sm relative overflow-hidden">
          <CardHeader className="pt-4 pb-1 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium text-zinc-500">
              Sedang
            </CardTitle>
            <Activity className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div ref={num4Ref} className="text-3xl font-bold text-yellow-600">0</div>
            <p className="text-xs text-zinc-500 mt-6 flex items-center gap-1">
              <span className="text-green-600 font-medium">- 3</span> dari triwulan lalu
            </p>
          </CardContent>
        </Card>
      </div>

      {/* MAIN GRID: Heatmap & Top 10 */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-stretch">

        {/* Peta Risiko (Heatmap) */}
        <div className="lg:col-span-3 h-full">
          <RiskHeatmap />
        </div>

        {/* Top 10 Risiko */}
        <div className="lg:col-span-2 h-full">
          <TopRisks />
        </div>

        {/* Chart Distribusi & Efektivitas (Full Width) */}
        <div className="lg:col-span-5 space-y-6">
          <RiskDistributionChart />
          <RiskControlChart />
        </div>
      </div>

    </div>
  )
}