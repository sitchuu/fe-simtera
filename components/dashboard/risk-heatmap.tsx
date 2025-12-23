"use client"

import { Fragment } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

// Data Matrix 5x5 based on the image
// Row 5 (Top) -> Row 1 (Bottom)
const matrixData = [
    // Row 5: Hampir Pasti Terjadi
    [
        { val: 9, color: "bg-green-500" },   // Col 1
        { val: 15, color: "bg-yellow-400" }, // Col 2
        { val: 16, color: "bg-orange-500" }, // Col 3
        { val: 23, color: "bg-red-600" },    // Col 4
        { val: 25, color: "bg-red-600" },    // Col 5
    ],
    // Row 4: Sering Terjadi
    [
        { val: 6, color: "bg-green-500" },
        { val: 12, color: "bg-yellow-400" },
        { val: 16, color: "bg-orange-500" },
        { val: 19, color: "bg-orange-500" },
        { val: 24, color: "bg-red-600" },
    ],
    // Row 3: Kadang Terjadi
    [
        { val: 4, color: "bg-sky-500" }, // Blue
        { val: 10, color: "bg-green-500" },
        { val: 14, color: "bg-yellow-400" },
        { val: 17, color: "bg-orange-500" },
        { val: 22, color: "bg-red-600" },
    ],
    // Row 2: Jarang Terjadi
    [
        { val: 2, color: "bg-sky-500" },
        { val: 7, color: "bg-green-500" },
        { val: 11, color: "bg-green-500" },
        { val: 13, color: "bg-yellow-400" },
        { val: 21, color: "bg-red-600" },
    ],
    // Row 1: Hampir Tidak Terjadi
    [
        { val: 1, color: "bg-sky-500" },
        { val: 3, color: "bg-sky-500" },
        { val: 5, color: "bg-sky-500" },
        { val: 8, color: "bg-green-500" },
        { val: 20, color: "bg-red-600" },
    ],
]

const rowLabels = [
    "Hampir Pasti Terjadi (5)",
    "Sering Terjadi (4)",
    "Kadang Terjadi (3)",
    "Jarang Terjadi (2)",
    "Hampir Tidak Terjadi (1)",
]

const colLabels = [
    "Tidak Signifikan (1)",
    "Minor (2)",
    "Moderat (3)",
    "Signifikan (4)",
    "Sangat Signifikan (5)",
]

export function RiskHeatmap() {
    return (
        <Card className="w-full shadow-sm">
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

                        <div className="flex-1 overflow-x-auto">
                            {/* Grid Container */}
                            <div className="min-w-[420px]">
                                {/* Grid Header (Col Labels) */}
                                <div className="flex mb-2 ml-[100px]"> {/* ml to offset row label width */}
                                    <div className="flex-1 text-center text-sm font-semibold text-zinc-500 mb-1">Level Dampak</div>
                                </div>
                                <div className="grid grid-cols-[100px_1fr_1fr_1fr_1fr_1fr] gap-1 text-xs">
                                    {/* Header Row */}
                                    <div className="text-right pr-2"></div>
                                    {colLabels.map((label, i) => (
                                        <div key={i} className="text-center font-medium text-zinc-600 px-1">{label}</div>
                                    ))}

                                    {/* Data Rows */}
                                    {matrixData.map((row, rowIndex) => (
                                        <Fragment key={rowIndex}>
                                            {/* Row Label */}
                                            <div className="flex items-center justify-end text-right px-2 font-medium text-zinc-600 h-10 bg-zinc-50 rounded-sm leading-tight text-[11px]">
                                                {rowLabels[rowIndex]}
                                            </div>
                                            {/* Cells */}
                                            {row.map((cell, colIndex) => (
                                                <div
                                                    key={`${rowIndex}-${colIndex}`}
                                                    className={cn(
                                                        "h-10 flex items-center justify-center text-white font-bold text-sm rounded-sm shadow-sm cursor-default",
                                                        cell.color
                                                    )}
                                                >
                                                    {cell.val}
                                                </div>
                                            ))}
                                        </Fragment>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </CardContent>
        </Card>
    )
}
