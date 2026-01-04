"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function RiskControlChart() {
    return (
        <Card className="shadow-sm">
            <CardHeader className="pb-2">
                <CardTitle>Efektivitas Pengendalian & Penanganan</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col items-center gap-8">
                    <h3 className="text-sm text-zinc-500 self-start">Grafik Pengendalian Risiko</h3>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-16 w-full py-4">
                        {/* Chart 1: Donut Yellow (Kurang Efektif) */}
                        <div className="relative h-40 w-40 group">
                            <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                                {/* Background Circle */}
                                <circle cx="50" cy="50" r="40" fill="none" stroke="#f3f4f6" strokeWidth="20" />
                                {/* Segment: Yellow (Kurang Efektif) approx 85% */}
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="40"
                                    fill="none"
                                    stroke="#facc15"
                                    strokeWidth="20"
                                    strokeDasharray={`${85 * 2.51} 251`} // 2 * pi * 40 = ~251
                                    strokeLinecap="round"
                                    className="transition-all duration-300 ease-out group-hover:stroke-[22]"
                                />
                            </svg>
                            {/* Percentage Text */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-xl font-bold text-zinc-700">85%</span>
                            </div>
                            {/* Tooltip */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                                <div className="bg-zinc-800 text-white text-xs font-medium px-2 py-1 rounded shadow-sm whitespace-nowrap">
                                    Kurang Efektif: 85%
                                </div>
                            </div>
                        </div>

                        {/* Chart 2: Solid Green (Sudah Efektif) */}
                        <div className="relative h-40 w-40 group">
                            <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                                <circle cx="50" cy="50" r="40" fill="none" stroke="#f3f4f6" strokeWidth="20" />
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="40"
                                    fill="none"
                                    stroke="#22c55e"
                                    strokeWidth="20"
                                    strokeDasharray={`${100 * 2.51} 251`}
                                    strokeLinecap="round"
                                    className="transition-all duration-300 ease-out group-hover:stroke-[22]"
                                />
                            </svg>
                             {/* Percentage Text */}
                             <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-xl font-bold text-zinc-700">100%</span>
                            </div>
                            {/* Tooltip */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                                <div className="bg-zinc-800 text-white text-xs font-medium px-2 py-1 rounded shadow-sm whitespace-nowrap">
                                    Sudah Efektif: 100%
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Legend */}
                    <div className="flex flex-wrap gap-6 justify-center">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-green-500"></div>
                            <span className="text-sm font-medium text-zinc-600">Sudah Efektif</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-yellow-400"></div>
                            <span className="text-sm font-medium text-zinc-600">Kurang Efektif</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-red-600"></div>
                            <span className="text-sm font-medium text-zinc-600">Tidak Efektif</span>
                        </div>
                    </div>

                </div>
            </CardContent>
        </Card>
    )
}
