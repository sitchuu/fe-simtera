"use client"

import { cn } from "@/lib/utils"

// Exported type for reuse
export interface TopRisk {
  no: number
  statement: string
  level: string
}

const DEFAULT_RISKS: TopRisk[] = [
    { no: 1, statement: "Kebakaran Server Utama", level: "Sangat Tinggi" },
    { no: 2, statement: "Serangan Ransomware", level: "Sangat Tinggi" },
    { no: 3, statement: "Keterlambatan Laporan Keuangan", level: "Tinggi" },
    { no: 4, statement: "Kekurangan SDM Teknis", level: "Tinggi" },
    { no: 5, statement: "Kerusakan AC Ruang Server", level: "Tinggi" },
    { no: 6, statement: "Kesalahan Input Data Peserta", level: "Sedang" },
    { no: 7, statement: "Listrik Padam > 4 Jam", level: "Sedang" },
    { no: 8, statement: "Pencurian Aset Ringan", level: "Sedang" },
    { no: 9, statement: "Keluhan Peserta di Medsos", level: "Sedang" },
    { no: 10, statement: "Banjir di Area Parkir", level: "Sedang" },
]

const levelColors: Record<string, string> = {
    "Sangat Tinggi": "bg-red-100 text-red-600",
    "Tinggi": "bg-orange-100 text-orange-600",
    "Sedang": "bg-yellow-100 text-yellow-600",
    "Rendah": "bg-green-100 text-green-600",
    "Sangat Rendah": "bg-blue-100 text-blue-600",
}

interface TopRisksProps {
  data?: TopRisk[]
  title?: string
}

export function TopRisks({ data = DEFAULT_RISKS, title = "Top 10 Risiko" }: TopRisksProps) {
    return (
        <div className="w-full h-full bg-white rounded-xl shadow-sm border border-zinc-100 flex flex-col">
            <div className="p-4 border-b border-zinc-100 shrink-0">
                <h3 className="text-lg font-bold text-zinc-900">{title}</h3>
            </div>

            <div 
                className="flex-1 overflow-y-auto max-h-[380px] overscroll-contain"
                onWheel={(e) => {
                    const el = e.currentTarget
                    const { scrollTop, scrollHeight, clientHeight } = el
                    const isScrollable = scrollHeight > clientHeight
                    
                    if (isScrollable) {
                        const isAtTop = scrollTop === 0
                        const isAtBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 1
                        const isScrollingUp = e.deltaY < 0
                        const isScrollingDown = e.deltaY > 0
                        
                        // Only stop propagation if we can scroll in that direction
                        if (!(isAtTop && isScrollingUp) && !(isAtBottom && isScrollingDown)) {
                            e.stopPropagation()
                        }
                    }
                }}
            >
                <table className="w-full text-sm text-left">
                    <thead className="text-zinc-500 font-medium border-b border-zinc-100 sticky top-0 bg-white z-10">
                        <tr>
                            <th className="px-4 py-3 w-12 text-center">No</th>
                            <th className="px-4 py-3">Pernyataan Risiko</th>
                            <th className="px-4 py-3 text-right">Level Risiko</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50">
                        {data.map((risk, index) => (
                            <tr key={index} className="hover:bg-zinc-50/50 transition-colors">
                                <td className="px-4 py-3 text-center font-medium text-zinc-600">{risk.no}.</td>
                                <td className="px-4 py-3 text-zinc-700">{risk.statement}</td>
                                <td className="px-4 py-3 text-right">
                                    <span className={cn(
                                        "inline-flex items-center justify-center px-4 py-1 rounded-full text-xs font-semibold whitespace-nowrap min-w-[100px]",
                                        levelColors[risk.level]
                                    )}>
                                        {risk.level}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
