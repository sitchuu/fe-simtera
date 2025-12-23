"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function RiskControlChart() {
    return (
        <Card className="shadow-sm">
            <CardHeader>
                <CardTitle>Efektivitas Pengendalian & Penanganan</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col items-center gap-8">
                    <h3 className="text-lg font-semibold text-zinc-600 self-start">Grafik Pengendalian Risiko</h3>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-16 w-full py-4">
                        {/* Chart 1: Donut Yellow */}
                        <div className="relative h-40 w-40">
                            <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                                {/* Background Circle */}
                                <circle cx="50" cy="50" r="40" fill="none" stroke="transparent" strokeWidth="20" />
                                {/* Segment: Yellow (Kurang Efektif) approx 85% */}
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="35"
                                    fill="none"
                                    stroke="#facc15"
                                    strokeWidth="20"
                                    strokeDasharray={`${85 * 2.2} 220`} // Approx simplistic calc
                                    strokeLinecap="round"
                                />
                            </svg>
                        </div>

                        {/* Chart 2: Solid Grey */}
                        <div className="relative h-40 w-40">
                            <svg viewBox="0 0 100 100" className="w-full h-full">
                                <circle cx="50" cy="50" r="45" fill="#9ca3af" />
                            </svg>
                        </div>
                    </div>

                    {/* Legend */}
                    <div className="flex flex-wrap gap-6 justify-center">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-red-700"></div>
                            <span className="text-sm font-medium text-zinc-600">Sudah Efektif</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-yellow-400"></div>
                            <span className="text-sm font-medium text-zinc-600">Kurang Efektif</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-green-500"></div>
                            <span className="text-sm font-medium text-zinc-600">Tidak Efektif</span>
                        </div>
                    </div>

                </div>
            </CardContent>
        </Card>
    )
}
