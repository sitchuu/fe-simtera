"use client"

import { useState, useRef, useEffect } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { RiskHeatmap, type Risk } from "@/components/dashboard/risk-heatmap"
import { TopRisks, type TopRisk } from "@/components/dashboard/top-risks"
import { RiskDistributionChart } from "@/components/dashboard/risk-distribution-chart"
import { RiskControlChart } from "@/components/dashboard/risk-control-chart"
import { FilterDropdown } from "@/components/dashboard/filter-dropdown"
import { Shield, Flame, AlertTriangle, Activity, TrendingDown, CheckCircle2, AlertCircle } from "lucide-react"
import gsap from "gsap"

// Mock Data for Filters - Using static year to prevent hydration mismatch
const UNITS = [
  "Semua Unit", "KEP", "KBT", "PEP", "TLK", "TUR", "PPM", "PPM1",
  "FAS", "FAS1", "MIT", "MIT1", "DAI", "DAI1", "TSP", "MES",
  "KTL", "ELE", "OTO", "LAF", "TET", "PUM", "RBI", "SPI", "UPG"
]
const TRIWULAN = ["Triwulan 1", "Triwulan 2", "Triwulan 3", "Triwulan 4"]
const CURRENT_YEAR = 2026
const YEARS = Array.from({ length: 6 }, (_, i) => (CURRENT_YEAR - i).toString())

// ===== DATA RISIKO INHERENT (SEBELUM MITIGASI) =====
const INHERENT_RISKS: Risk[] = [
  { id: "1", code: "R01", statement: "Kebakaran Server Utama", impact: 5, likelihood: 5, unit: "TI" },
  { id: "2", code: "R02", statement: "Serangan Ransomware", impact: 5, likelihood: 4, unit: "TI" },
  { id: "3", code: "R03", statement: "Keterlambatan Laporan Keuangan", impact: 4, likelihood: 4, unit: "Keuangan" },
  { id: "4", code: "R04", statement: "Kekurangan SDM Teknis", impact: 4, likelihood: 4, unit: "HR" },
  { id: "5", code: "R05", statement: "Kerusakan AC Ruang Server", impact: 4, likelihood: 3, unit: "Umum" },
  { id: "6", code: "R06", statement: "Kesalahan Input Data Peserta", impact: 3, likelihood: 4, unit: "Diklat" },
  { id: "7", code: "R07", statement: "Listrik Padam > 4 Jam", impact: 4, likelihood: 3, unit: "Umum" },
  { id: "8", code: "R08", statement: "Pencurian Aset Ringan", impact: 3, likelihood: 3, unit: "Keamanan" },
  { id: "9", code: "R09", statement: "Keluhan Peserta di Medsos", impact: 3, likelihood: 5, unit: "Humas" },
  { id: "10", code: "R10", statement: "Banjir di Area Parkir", impact: 3, likelihood: 4, unit: "Umum" },
  { id: "11", code: "R11", statement: "Kegagalan Backup Data", impact: 5, likelihood: 3, unit: "TI" },
  { id: "12", code: "R12", statement: "Pelanggaran Etika Pegawai", impact: 3, likelihood: 2, unit: "HR" },
]

// ===== DATA RISIKO RESIDUAL (SETELAH MITIGASI) =====
const RESIDUAL_RISKS: Risk[] = [
  { id: "1", code: "R01", statement: "Kebakaran Server Utama", impact: 2, likelihood: 2, unit: "TI" },
  { id: "2", code: "R02", statement: "Serangan Ransomware", impact: 3, likelihood: 2, unit: "TI" },
  { id: "3", code: "R03", statement: "Keterlambatan Laporan Keuangan", impact: 2, likelihood: 2, unit: "Keuangan" },
  { id: "4", code: "R04", statement: "Kekurangan SDM Teknis", impact: 3, likelihood: 2, unit: "HR" },
  { id: "5", code: "R05", statement: "Kerusakan AC Ruang Server", impact: 2, likelihood: 2, unit: "Umum" },
  { id: "6", code: "R06", statement: "Kesalahan Input Data Peserta", impact: 2, likelihood: 2, unit: "Diklat" },
  { id: "7", code: "R07", statement: "Listrik Padam > 4 Jam", impact: 2, likelihood: 1, unit: "Umum" },
  { id: "8", code: "R08", statement: "Pencurian Aset Ringan", impact: 1, likelihood: 1, unit: "Keamanan" },
  { id: "9", code: "R09", statement: "Keluhan Peserta di Medsos", impact: 2, likelihood: 3, unit: "Humas" },
  { id: "10", code: "R10", statement: "Banjir di Area Parkir", impact: 2, likelihood: 2, unit: "Umum" },
  { id: "11", code: "R11", statement: "Kegagalan Backup Data", impact: 3, likelihood: 1, unit: "TI" },
  { id: "12", code: "R12", statement: "Pelanggaran Etika Pegawai", impact: 1, likelihood: 1, unit: "HR" },
]

// Top 10 Risiko Inherent
const INHERENT_TOP_RISKS: TopRisk[] = [
  { no: 1, statement: "Kebakaran Server Utama", level: "Sangat Tinggi" },
  { no: 2, statement: "Serangan Ransomware", level: "Sangat Tinggi" },
  { no: 3, statement: "Keterlambatan Laporan Keuangan", level: "Tinggi" },
  { no: 4, statement: "Kekurangan SDM Teknis", level: "Tinggi" },
  { no: 5, statement: "Kegagalan Backup Data", level: "Tinggi" },
  { no: 6, statement: "Kerusakan AC Ruang Server", level: "Tinggi" },
  { no: 7, statement: "Listrik Padam > 4 Jam", level: "Tinggi" },
  { no: 8, statement: "Keluhan Peserta di Medsos", level: "Sedang" },
  { no: 9, statement: "Banjir di Area Parkir", level: "Sedang" },
  { no: 10, statement: "Kesalahan Input Data Peserta", level: "Sedang" },
]

// Top 10 Risiko Residual
const RESIDUAL_TOP_RISKS: TopRisk[] = [
  { no: 1, statement: "Serangan Ransomware", level: "Sedang" },
  { no: 2, statement: "Kekurangan SDM Teknis", level: "Sedang" },
  { no: 3, statement: "Keluhan Peserta di Medsos", level: "Sedang" },
  { no: 4, statement: "Kegagalan Backup Data", level: "Rendah" },
  { no: 5, statement: "Kebakaran Server Utama", level: "Rendah" },
  { no: 6, statement: "Keterlambatan Laporan Keuangan", level: "Rendah" },
  { no: 7, statement: "Kerusakan AC Ruang Server", level: "Rendah" },
  { no: 8, statement: "Kesalahan Input Data Peserta", level: "Rendah" },
  { no: 9, statement: "Banjir di Area Parkir", level: "Rendah" },
  { no: 10, statement: "Listrik Padam > 4 Jam", level: "Sangat Rendah" },
]

// Stats data
const INHERENT_STATS = { total: 45, sangatTinggi: 9, tinggi: 12, sedang: 15 }
const RESIDUAL_STATS = { turunStatus: 12, efektivitas: 78, sisaTinggi: 3, sisaSedang: 8 }

export default function DashboardPage() {
  const [selectedUnit, setSelectedUnit] = useState("Semua Unit")
  const [selectedTriwulan, setSelectedTriwulan] = useState("Triwulan 4")
  const [selectedYear, setSelectedYear] = useState(CURRENT_YEAR.toString())
  const [activeTab, setActiveTab] = useState("inherent")

  // Animation refs for inherent stats
  const num1Ref = useRef<HTMLSpanElement>(null)
  const num2Ref = useRef<HTMLSpanElement>(null)
  const num3Ref = useRef<HTMLSpanElement>(null)
  const num4Ref = useRef<HTMLSpanElement>(null)

  // Animation refs for residual stats
  const resNum1Ref = useRef<HTMLSpanElement>(null)
  const resNum2Ref = useRef<HTMLSpanElement>(null)
  const resNum3Ref = useRef<HTMLSpanElement>(null)
  const resNum4Ref = useRef<HTMLSpanElement>(null)

  // Animate stats based on active tab
  useEffect(() => {
    const animateCount = (element: HTMLSpanElement | null, target: number, suffix: string = "") => {
      if (!element) return
      const obj = { value: 0 }
      gsap.to(obj, {
        value: target,
        duration: 1.5,
        ease: "power2.out",
        onUpdate: () => {
          element.textContent = Math.round(obj.value).toString() + suffix
        },
      })
    }

    if (activeTab === "inherent") {
      animateCount(num1Ref.current, INHERENT_STATS.total)
      animateCount(num2Ref.current, INHERENT_STATS.sangatTinggi)
      animateCount(num3Ref.current, INHERENT_STATS.tinggi)
      animateCount(num4Ref.current, INHERENT_STATS.sedang)
    } else {
      animateCount(resNum1Ref.current, RESIDUAL_STATS.turunStatus)
      animateCount(resNum2Ref.current, RESIDUAL_STATS.efektivitas)
      animateCount(resNum3Ref.current, RESIDUAL_STATS.sisaTinggi)
      animateCount(resNum4Ref.current, RESIDUAL_STATS.sisaSedang)
    }
  }, [activeTab])

  return (
    <div className="flex flex-col gap-6">
      {/* HEADER: Title & Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Dashboard</h1>
        <div className="flex items-center gap-2">
          <FilterDropdown
            label="Unit"
            value={selectedUnit}
            options={UNITS}
            onSelect={setSelectedUnit}
            className="w-27.5"
          />
          <FilterDropdown
            label="Triwulan"
            value={selectedTriwulan}
            options={TRIWULAN}
            onSelect={setSelectedTriwulan}
            className="w-32.5"
          />
          <FilterDropdown
            label="Tahun"
            value={selectedYear}
            options={YEARS}
            onSelect={setSelectedYear}
            className="w-20"
          />
        </div>
      </div>

      {/* TABS: Inherent vs Residual Risk */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 bg-zinc-100">
          <TabsTrigger 
            value="inherent" 
            className="data-[state=active]:bg-white data-[state=active]:text-red-600 data-[state=active]:shadow-sm"
          >
            <Flame className="h-4 w-4 mr-2" />
            Profil Risiko Awal
          </TabsTrigger>
          <TabsTrigger 
            value="residual"
            className="data-[state=active]:bg-white data-[state=active]:text-green-600 data-[state=active]:shadow-sm"
          >
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Setelah Mitigasi
          </TabsTrigger>
        </TabsList>

        {/* TAB 1: INHERENT RISK */}
        <TabsContent value="inherent" className="mt-6 space-y-6">
          {/* STATS CARDS - Inherent */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="shadow-sm relative overflow-hidden">
              <CardHeader className="pt-4 pb-1 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium text-zinc-500">
                  Total Risiko Teridentifikasi
                </CardTitle>
                <Shield className="h-4 w-4 text-zinc-400" />
              </CardHeader>
              <CardContent>
                <span ref={num1Ref} className="text-3xl font-bold text-zinc-900">0</span>
                <p className="text-xs text-zinc-500 mt-6 flex items-center gap-1">
                  <span className="text-green-600 font-medium">- 2</span> dari triwulan lalu
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-sm relative overflow-hidden">
              <CardHeader className="pt-4 pb-1 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium text-zinc-500">
                  Sangat Tinggi (Kritis)
                </CardTitle>
                <Flame className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <span ref={num2Ref} className="text-3xl font-bold text-red-600">0</span>
                <p className="text-xs text-zinc-500 mt-6 flex items-center gap-1">
                  <span className="text-red-600 font-medium">+ 1</span> dari triwulan lalu
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-sm relative overflow-hidden">
              <CardHeader className="pt-4 pb-1 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium text-zinc-500">
                  Tinggi
                </CardTitle>
                <AlertTriangle className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <span ref={num3Ref} className="text-3xl font-bold text-orange-600">0</span>
                <p className="text-xs text-zinc-500 mt-6 flex items-center gap-1">
                  <span className="text-zinc-500 font-medium">- 0</span> dari triwulan lalu
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-sm relative overflow-hidden">
              <CardHeader className="pt-4 pb-1 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium text-zinc-500">
                  Sedang
                </CardTitle>
                <Activity className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <span ref={num4Ref} className="text-3xl font-bold text-yellow-600">0</span>
                <p className="text-xs text-zinc-500 mt-6 flex items-center gap-1">
                  <span className="text-green-600 font-medium">- 3</span> dari triwulan lalu
                </p>
              </CardContent>
            </Card>
          </div>

          {/* MAIN GRID: Heatmap & Top 10 */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-stretch">
            <div className="lg:col-span-3 h-full">
              <RiskHeatmap data={INHERENT_RISKS} />
            </div>
            <div className="lg:col-span-2 h-full">
              <TopRisks data={INHERENT_TOP_RISKS} title="Top 10 Risiko (Inherent)" />
            </div>
            <div className="lg:col-span-5 space-y-6">
              <RiskDistributionChart />
            </div>
          </div>
        </TabsContent>

        {/* TAB 2: RESIDUAL RISK */}
        <TabsContent value="residual" className="mt-6 space-y-6">
          {/* STATS CARDS - Residual */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="shadow-sm relative overflow-hidden">
              <CardHeader className="pt-4 pb-1 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium text-zinc-500">
                  Risiko Turun Status
                </CardTitle>
                <TrendingDown className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <span ref={resNum1Ref} className="text-3xl font-bold text-green-600">0</span>
                <p className="text-xs text-zinc-500 mt-6 flex items-center gap-1">
                  Risiko berhasil diturunkan levelnya
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-sm relative overflow-hidden">
              <CardHeader className="pt-4 pb-1 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium text-zinc-500">
                  Efektivitas Mitigasi
                </CardTitle>
                <CheckCircle2 className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline">
                  <span ref={resNum2Ref} className="text-3xl font-bold text-blue-600">0</span>
                  <span className="text-xl font-bold text-blue-600">%</span>
                </div>
                <p className="text-xs text-zinc-500 mt-6 flex items-center gap-1">
                  Keberhasilan rencana penanganan
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-sm relative overflow-hidden">
              <CardHeader className="pt-4 pb-1 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium text-zinc-500">
                  Risiko Sisa (Tinggi)
                </CardTitle>
                <AlertCircle className="h-4 w-4 text-orange-400" />
              </CardHeader>
              <CardContent>
                <span ref={resNum3Ref} className="text-3xl font-bold text-orange-500">0</span>
                <p className="text-xs text-zinc-500 mt-6 flex items-center gap-1">
                  Masih perlu pemantauan ketat
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-sm relative overflow-hidden">
              <CardHeader className="pt-4 pb-1 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium text-zinc-500">
                  Risiko Sisa (Sedang)
                </CardTitle>
                <Activity className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <span ref={resNum4Ref} className="text-3xl font-bold text-yellow-600">0</span>
                <p className="text-xs text-zinc-500 mt-6 flex items-center gap-1">
                  Dapat ditoleransi dengan monitoring
                </p>
              </CardContent>
            </Card>
          </div>

          {/* MAIN GRID: Heatmap & Top 10 */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-stretch">
            <div className="lg:col-span-3 h-full">
              <RiskHeatmap data={RESIDUAL_RISKS} />
            </div>
            <div className="lg:col-span-2 h-full">
              <TopRisks data={RESIDUAL_TOP_RISKS} title="Top 10 Risiko Sisa (Residual)" />
            </div>
            <div className="lg:col-span-5 space-y-6">
              <RiskControlChart />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}