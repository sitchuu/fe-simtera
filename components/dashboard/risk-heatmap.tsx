"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { X, Eye } from "lucide-react"

// --- Types ---
export interface Risk {
  id: string
  code: string // e.g., "R01"
  statement: string // Pernyataan Risiko
  impact: number // 1-5
  likelihood: number // 1-5
  unit?: string
}

// --- Mock Data (Default) ---
const MOCK_RISKS: Risk[] = [
  { id: "1", code: "R01", statement: "Kebakaran Server Utama", impact: 5, likelihood: 5, unit: "TI" },
  { id: "2", code: "R02", statement: "Serangan Ransomware", impact: 5, likelihood: 4, unit: "TI" },
  { id: "3", code: "R03", statement: "Keterlambatan Laporan Keuangan", impact: 3, likelihood: 3, unit: "Keuangan" },
  { id: "4", code: "R04", statement: "Kekurangan SDM Teknis", impact: 4, likelihood: 4, unit: "HR" },
  { id: "5", code: "R05", statement: "Kerusakan AC Ruang Server", impact: 4, likelihood: 3, unit: "Umum" },
  { id: "6", code: "R06", statement: "Kesalahan Input Data Peserta", impact: 2, likelihood: 4, unit: "Diklat" },
  { id: "7", code: "R07", statement: "Listrik Padam > 4 Jam", impact: 3, likelihood: 2, unit: "Umum" },
  { id: "8", code: "R08", statement: "Pencurian Aset Ringan", impact: 2, likelihood: 2, unit: "Keamanan" },
  { id: "9", code: "R09", statement: "Keluhan Peserta di Medsos", impact: 3, likelihood: 5, unit: "Humas" },
  { id: "10", code: "R10", statement: "Banjir di Area Parkir", impact: 2, likelihood: 5, unit: "Umum" },
  { id: "11", code: "R11", statement: "Kegagalan Backup Data", impact: 5, likelihood: 2, unit: "TI" },
  { id: "12", code: "R12", statement: "Pelanggaran Etika Pegawai", impact: 3, likelihood: 1, unit: "HR" },
]

// --- Constants ---
const ROW_LABELS = [
  "Hampir Pasti Terjadi (5)",
  "Sering Terjadi (4)",
  "Kadang Terjadi (3)",
  "Jarang Terjadi (2)",
  "Hampir Tidak Terjadi (1)",
]

const COL_LABELS = [
  "Tidak Signifikan (1)",
  "Minor (2)",
  "Moderat (3)",
  "Signifikan (4)",
  "Sangat Signifikan (5)",
]

// --- Helper Functions ---

function getCellColor(impact: number, likelihood: number): string {
  // Impact 1 (Col 1)
  if (impact === 1) {
    if (likelihood >= 4) return "bg-green-500"
    return "bg-sky-500" // Blue
  }
  // Impact 2 (Col 2)
  if (impact === 2) {
    if (likelihood === 5) return "bg-yellow-400"
    if (likelihood === 4) return "bg-yellow-400"
    if (likelihood === 3) return "bg-green-500"
    if (likelihood === 2) return "bg-green-500"
    return "bg-sky-500"
  }
  // Impact 3 (Col 3)
  if (impact === 3) {
    if (likelihood === 5) return "bg-orange-500"
    if (likelihood === 4) return "bg-orange-500"
    if (likelihood === 3) return "bg-yellow-400"
    if (likelihood === 2) return "bg-green-500"
    return "bg-sky-500"
  }
  // Impact 4 (Col 4)
  if (impact === 4) {
    if (likelihood === 5) return "bg-red-600"
    if (likelihood >= 3) return "bg-orange-500"
    if (likelihood === 2) return "bg-yellow-400"
    return "bg-green-500"
  }
  // Impact 5 (Col 5)
  if (impact === 5) {
    if (likelihood >= 2) return "bg-red-600"
    return "bg-red-600"
  }
  return "bg-gray-200"
}

function getTextColor(bgColor: string): string {
  if (bgColor.includes("yellow")) return "text-zinc-900"
  return "text-white"
}

interface RiskHeatmapProps {
  data?: Risk[]
}

export function RiskHeatmap({ data = MOCK_RISKS }: RiskHeatmapProps) {
  const [selectedCell, setSelectedCell] = useState<{ impact: number, likelihood: number, risks: Risk[], color: string } | null>(null)
  const [isPanelOpen, setIsPanelOpen] = useState(false)

  // Group risks by cell
  const matrix = useMemo(() => {
    const grid: Record<string, Risk[]> = {}
    
    // Initialize grid
    for (let l = 5; l >= 1; l--) {
      for (let i = 1; i <= 5; i++) {
        grid[`${i}-${l}`] = []
      }
    }

    // Fill grid
    data.forEach(risk => {
      const key = `${risk.impact}-${risk.likelihood}`
      if (grid[key]) {
        grid[key].push(risk)
      }
    })

    return grid
  }, [data])

  const handleCellClick = (impact: number, likelihood: number, color: string) => {
    const key = `${impact}-${likelihood}`
    const risksInCell = matrix[key] || []
    
    setSelectedCell({
      impact,
      likelihood,
      risks: risksInCell,
      color
    })
    setIsPanelOpen(true)
  }

  const closePanel = () => setIsPanelOpen(false)

  return (
    <>
      <Card className="w-full shadow-sm h-full">
        <CardHeader>
          <CardTitle>Peta Risiko (Heatmap 5x5)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">

            <div className="flex">
              {/* Y Axis Label (Vertical) */}
              <div className="hidden sm:flex items-center justify-center w-8 mr-2">
                <span className="-rotate-90 whitespace-nowrap text-sm font-semibold text-zinc-500">
                  Level Kemungkinan
                </span>
              </div>

              <div className="flex-1">
                {/* Grid Container */}
                <div className="w-full">
                  {/* Grid Header (Col Labels) */}
                  <div className="flex mb-2 ml-[100px]">
                    <div className="flex-1 text-center text-sm font-semibold text-zinc-500 mb-1">Level Dampak</div>
                  </div>
                  <div className="grid grid-cols-[100px_1fr_1fr_1fr_1fr_1fr] gap-1 text-xs">
                    {/* Header Row */}
                    <div className="text-right pr-2"></div>
                    {COL_LABELS.map((label, i) => (
                      <div key={i} className="text-center font-medium text-zinc-600 px-1">{label}</div>
                    ))}

                    {/* Data Rows (5 down to 1) */}
                    {[5, 4, 3, 2, 1].map((likelihood, rowIndex) => (
                      <div key={likelihood} className="contents">
                        {/* Row Label */}
                        <div className="flex items-center justify-end text-right px-2 font-medium text-zinc-600 h-10 bg-zinc-50 rounded-sm leading-tight text-[11px]">
                          {ROW_LABELS[rowIndex]}
                        </div>
                        {/* Cells (1 to 5) */}
                        {[1, 2, 3, 4, 5].map((impact) => {
                          const key = `${impact}-${likelihood}`
                          const risksInCell = matrix[key] || []
                          const count = risksInCell.length
                          const bgColor = getCellColor(impact, likelihood)
                          const textColor = getTextColor(bgColor)

                          return (
                            <button
                              key={key}
                              onClick={() => handleCellClick(impact, likelihood, bgColor)}
                              className={cn(
                                "h-10 flex items-center justify-center font-bold text-sm rounded-sm shadow-sm transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-zinc-400",
                                bgColor,
                                textColor,
                                count === 0 && "opacity-60 hover:opacity-80" // Dim empty cells slightly
                              )}
                              title={`Dampak: ${impact}, Kemungkinan: ${likelihood} (${count} Risiko)`}
                            >
                              {count > 0 ? count : ""}
                            </button>
                          )
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Custom Non-Modal Side Panel */}
      <div 
        className={cn(
          "fixed inset-y-0 right-0 z-50 w-[400px] sm:w-[500px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out border-l",
          isPanelOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold text-zinc-900">Detail Risiko</h2>
              {/* Color Indicator Badge */}
              {selectedCell && (
                <div 
                  className={cn("w-6 h-6 rounded-md shadow-sm border border-black/10", selectedCell.color)} 
                  title={`Level Risiko: Dampak ${selectedCell.impact}, Kemungkinan ${selectedCell.likelihood}`}
                />
              )}
            </div>
            <Button variant="ghost" size="icon" onClick={closePanel} className="h-8 w-8">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {selectedCell && (
              <div className="space-y-4">
                <div className="text-sm text-zinc-500">
                  Daftar risiko pada posisi <strong>Dampak {selectedCell.impact}</strong> dan <strong>Kemungkinan {selectedCell.likelihood}</strong>.
                </div>

                {selectedCell.risks.length > 0 ? (
                  <div className="border rounded-md">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[60px]">Kode</TableHead>
                          <TableHead>Pernyataan Risiko</TableHead>
                          <TableHead className="w-[80px]">Unit</TableHead>
                          <TableHead className="w-[50px] text-right">Aksi</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedCell.risks.map((risk) => (
                          <TableRow key={risk.id}>
                            <TableCell className="font-medium">{risk.code}</TableCell>
                            <TableCell>{risk.statement}</TableCell>
                            <TableCell>{risk.unit}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-zinc-900">
                                <Eye className="h-4 w-4" />
                                <span className="sr-only">Lihat Detail</span>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-10 text-zinc-500 border-2 border-dashed rounded-lg bg-zinc-50">
                    <p>Tidak ada risiko di level ini.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
