"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
    { label: "Risiko fiskal", value: 7 },
    { label: "Risiko kebijakan", value: 13 },
    { label: "Risiko kepatuhan", value: 8 },
    { label: "Risiko legal", value: 18 },
    { label: "Risiko fraud", value: 23 },
    { label: "Risiko reputasi", value: 17 },
    { label: "Risiko operasional", value: 13 },
]

export function RiskDistributionChart() {
    const maxValue = Math.max(...data.map(d => d.value))
    // Round up to nearest 5 for grid lines
    const gridMax = Math.ceil(maxValue / 5) * 5
    const gridLines = Array.from({ length: 6 }, (_, i) => (i * gridMax) / 5)

    return (
        <Card className="shadow-sm">
            <CardHeader>
                <CardTitle>Distribusi Kategori Risiko</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <p className="text-sm text-zinc-500">Jumlah laporan berdasarkan kategori</p>

                    <div className="relative pt-6">
                        {/* Grid Lines */}
                        <div className="absolute inset-0 flex justify-between pl-[180px] pr-[40px] pointer-events-none h-full pb-6">
                            {gridLines.map((val, i) => (
                                <div key={i} className="h-full border-l border-zinc-100 relative">
                                    <span className="absolute -top-6 -left-2 text-xs text-zinc-400">{Math.round(val)}</span>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-3 relative z-10">
                            {data.map((item, index) => (
                                <div key={index} className="flex items-center gap-4 text-sm">
                                    {/* Label */}
                                    <div className="w-[180px] text-right font-medium text-zinc-600 shrink-0">
                                        {item.label}
                                    </div>

                                    {/* Bar Area */}
                                    <div className="flex-1 flex items-center gap-2">
                                        {/* Bar */}
                                        <div
                                            className="h-8 bg-blue-600 rounded-md transition-all duration-500 ease-out relative group"
                                            style={{ width: `${(item.value / gridMax) * 100}%` }}
                                        >
                                             {/* Tooltip on hover */}
                                             <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full pl-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">{item.value}</span>
                                             </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
