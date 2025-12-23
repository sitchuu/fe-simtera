"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

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

    return (
        <Card className="shadow-sm">
            <CardHeader>
                <CardTitle>Distribusi Kategori Risiko</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <p className="text-sm text-zinc-500">Jumlah laporan berdasarkan kategori</p>

                    <div className="space-y-3">
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
                                        className="h-8 bg-blue-600 rounded-md transition-all duration-500 ease-out"
                                        style={{ width: `${(item.value / maxValue) * 80}%` }}
                                    />
                                    {/* Value */}
                                    <span className="font-semibold text-zinc-700">{item.value}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
