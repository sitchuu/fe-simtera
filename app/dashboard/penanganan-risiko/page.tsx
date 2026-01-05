"use client"

import Link from "next/link"
import React from "react"
import { Plus, Edit3, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export default function PenangananRisikoPage() {
    return (
        <div className="space-y-8 max-w-7xl mx-auto pb-20">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-800 uppercase">
                    PENANGANAN RISIKO (Risk Treatment)
                </h1>
                <p className="text-gray-500 mt-2 text-base">
                    Halaman ini berisi daftar risiko yang &quot;Wajib Diobati&quot; (Level Tinggi/Merah atau Kontrol Tidak Efektif).
                </p>
            </div>

            {/* Main Content */}
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                    <h2 className="text-xl font-bold text-gray-700 uppercase max-w-2xl">
                        DAFTAR RISIKO YANG MEMBUTUHKAN PENANGANAN (MITIGASI)
                    </h2>
                    <div className="flex gap-3">
                        <Button variant="outline" className="min-w-[100px] border-gray-300 text-gray-600">
                            Unit
                        </Button>
                        <Button variant="outline" className="min-w-[100px] border-gray-300 text-gray-600">
                            2025
                        </Button>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <Table>
                        <TableHeader className="bg-gray-50/50">
                            <TableRow>
                                <TableHead className="w-16 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider py-4">
                                    No
                                </TableHead>
                                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Kode Risiko
                                </TableHead>
                                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Pernyataan Risiko
                                </TableHead>
                                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Penyebab
                                </TableHead>
                                <TableHead className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Level Risiko
                                </TableHead>
                                <TableHead className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Status RTP
                                </TableHead>
                                <TableHead className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider w-32">
                                    Aksi
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockData.map((item, index) => (
                                <TableRow key={index} className="hover:bg-gray-50/50">
                                    <TableCell className="text-center font-medium text-gray-900">
                                        {index + 1}.
                                    </TableCell>
                                    <TableCell className="text-gray-600">{item.kode}</TableCell>
                                    <TableCell className="text-gray-600 font-medium">
                                        {item.pernyataan}
                                    </TableCell>
                                    <TableCell className="text-gray-600">{item.penyebab}</TableCell>
                                    <TableCell className="text-center">
                                        <LevelBadge level={item.level} />
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <StatusBadge status={item.status} />
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center justify-center">
                                            <ActionButtons status={item.status} />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

// Components for Badges and Actions

function LevelBadge({ level }: { level: string }) {
    const styles: { [key: string]: string } = {
        "Sangat Tinggi": "bg-red-50 text-red-600 border-red-100",
        "Tinggi": "bg-orange-50 text-orange-600 border-orange-100",
        "Sedang": "bg-yellow-50 text-yellow-600 border-yellow-100",
        "Rendah": "bg-blue-50 text-blue-600 border-blue-100",
    }

    return (
        <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-medium border ${styles[level] || styles["Sedang"]}`}>
            {level}
        </span>
    )
}

function StatusBadge({ status }: { status: string }) {
    const styles: { [key: string]: string } = {
        "Belum Ada": "bg-orange-100 text-orange-700",
        "Draft": "bg-yellow-100 text-yellow-700",
        "Final": "bg-orange-100 text-orange-700", // Using same orange as image for Final which looks orange-ish
    }

    // Override specific colors to match image exactly if needed
    if (status === "Final") {
        return (
            <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
                {status}
            </span>
        )
    }

    return (
        <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
            {status}
        </span>
    )
}

function ActionButtons({ status }: { status: string }) {
    if (status === "Draft") {
        return (
            <button className="flex items-center gap-1.5 text-blue-500 hover:text-blue-700 text-sm font-medium transition-colors">
                <Edit3 className="h-4 w-4" />
                Edit
            </button>
        )
    }

    if (status === "Final") {
        return (
            <button className="flex items-center gap-1.5 text-blue-500 hover:text-blue-700 text-sm font-medium transition-colors">
                <Eye className="h-4 w-4" />
                Lihat
            </button>
        )
    }

    return (
        <Link
            href="/dashboard/penanganan-risiko/tambah"
            className="flex items-center gap-1.5 text-blue-500 hover:text-blue-700 text-sm font-medium transition-colors"
        >
            <Plus className="h-4 w-4" />
            Tambah
        </Link>
    )
}

const mockData = [
    {
        kode: "BMIT01",
        pernyataan: "Sasaran kinerja",
        penyebab: "Sasaran kinerja",
        level: "Sangat Tinggi",
        status: "Belum Ada",
    },
    {
        kode: "BMIT01",
        pernyataan: "Sasaran kinerja",
        penyebab: "Sasaran kinerja",
        level: "Sedang",
        status: "Draft",
    },
    {
        kode: "BMIT01",
        pernyataan: "Sasaran kinerja",
        penyebab: "Sasaran kinerja",
        level: "Sedang",
        status: "Final",
    },
    {
        kode: "BMIT01",
        pernyataan: "Sasaran kinerja",
        penyebab: "Sasaran kinerja",
        level: "Tinggi",
        status: "Belum Ada",
    },
    {
        kode: "BMIT01",
        pernyataan: "Sasaran kinerja",
        penyebab: "Sasaran kinerja",
        level: "Tinggi",
        status: "Belum Ada",
    },
]
