import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RiskHeatmap } from "@/components/dashboard/risk-heatmap"
import { TopRisks } from "@/components/dashboard/top-risks"
import { RiskDistributionChart } from "@/components/dashboard/risk-distribution-chart"
import { RiskControlChart } from "@/components/dashboard/risk-control-chart"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">

      {/* HEADER: Title & Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="bg-white hover:bg-zinc-50 font-normal">
            Unit
          </Button>
          <Button variant="outline" className="bg-white hover:bg-zinc-50 font-normal">
            Triwulan 4
          </Button>
          <Button variant="outline" className="bg-white hover:bg-zinc-50 font-normal">
            2025
          </Button>
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {["Total Risiko", "Sangat Tinggi", "Tinggi", "Sedang"].map((label) => (
          <Card key={label} className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-zinc-500">
                {label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Placeholder for value - can be parameterized later */}
              <div className="text-2xl font-bold text-zinc-900">
                &nbsp; {/* Empty space for now to match height if no data */}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* MAIN GRID: Heatmap & Top 10 */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

        {/* Peta Risiko (Heatmap) */}
        <div className="lg:col-span-3 space-y-3">
          <RiskHeatmap />
        </div>

        {/* Top 10 Risiko */}
        <div className="lg:col-span-2">
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