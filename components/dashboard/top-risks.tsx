"use client"

import { cn } from "@/lib/utils"

const risks = [
    { no: 1, statement: "Sasaran kinerja", level: "Sangat Tinggi" },
    { no: 2, statement: "Sasaran kinerja", level: "Sedang" },
    { no: 3, statement: "Sasaran kinerja", level: "Sedang" },
    { no: 4, statement: "Sasaran kinerja", level: "Tinggi" },
    { no: 5, statement: "Sasaran kinerja", level: "Tinggi" },
]

const levelColors: Record<string, string> = {
    "Sangat Tinggi": "bg-red-100 text-red-600",
    "Tinggi": "bg-orange-100 text-orange-600",
    "Sedang": "bg-yellow-100 text-yellow-600",
    "Rendah": "bg-green-100 text-green-600",
    "Sangat Rendah": "bg-blue-100 text-blue-600",
}

export function TopRisks() {
    return (
        <div className="w-full bg-white rounded-xl shadow-sm border border-zinc-100 overflow-hidden">
            <div className="p-4 border-b border-zinc-100">
                <h3 className="text-lg font-bold text-zinc-900">Top 10 Risiko</h3>
            </div>

            <div className="w-full overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-zinc-500 font-medium border-b border-zinc-100">
                        <tr>
                            <th className="px-4 py-3 w-12 text-center">No</th>
                            <th className="px-4 py-3">Pernyataan Risiko</th>
                            <th className="px-4 py-3 text-right">Level Risiko</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50">
                        {risks.map((risk, index) => (
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
