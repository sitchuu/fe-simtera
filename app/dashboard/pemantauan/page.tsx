"use client"

import React, { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Save } from "lucide-react"

// Mock Options
const KEMUNGKINAN_OPTIONS = ["1 - Hampir Tidak Terjadi", "2 - Jarang Terjadi", "3 - Kadang Terjadi", "4 - Sering Terjadi", "5 - Hampir Pasti Terjadi"]
const DAMPAK_OPTIONS = ["1 - Tidak Signifikan", "2 - Minor", "3 - Moderat", "4 - Signifikan", "5 - Sangat Signifikan"]

export default function PemantauanPage() {
    const [progress, setProgress] = useState([65])
    const [comments, setComments] = useState("")
    const [kemungkinan, setKemungkinan] = useState("")
    const [dampak, setDampak] = useState("")

    return (
        <div className="flex flex-col gap-6">
            {/* HEADER */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
                    PEMANTAUAN (Monitoring)
                </h1>
                <p className="text-gray-500 mt-2 text-base">
                    Halaman ini digunakan secara berkala (per Triwulan) untuk update progress.
                </p>
            </div>

            {/* CONTENT GROUP */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-8">

                {/* SUBTITLE */}
                <h2 className="text-lg font-bold text-gray-800 uppercase tracking-wide">
                    PEMANTAUAN & TINJAUAN RISIKO
                </h2>

                {/* TABS */}
                <Tabs defaultValue="tw1" className="w-full">
                    <TabsList className="w-full justify-start h-auto p-0 bg-transparent border-b border-gray-200 rounded-none gap-8">
                        {["TRIWULAN 1", "TRIWULAN 2", "TRIWULAN 3", "TRIWULAN 4"].map((label, idx) => (
                            <TabsTrigger
                                key={idx}
                                value={`tw${idx + 1}`}
                                className="relative px-0 pb-3 text-sm font-bold text-blue-400 data-[state=active]:text-blue-500 data-[state=active]:shadow-none data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:w-full data-[state=active]:after:h-0.5 data-[state=active]:after:bg-blue-400 rounded-none bg-transparent hover:text-blue-500 hover:bg-transparent"
                            >
                                {label}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    <TabsContent value="tw1" className="space-y-10 mt-8">

                        {/* SECTION A: UPDATE PROGRESS */}
                        <div className="space-y-6">
                            <h3 className="text-sm font-bold text-gray-700 uppercase">
                                A. UPDATE PROGRESS RENCANA AKSI
                            </h3>

                            <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-700">Risiko:</p>
                                <p className="text-sm font-medium text-gray-700">Rencana Aksi:</p>
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <label className="text-sm font-semibold text-gray-700">Status Pelaksanaan:</label>
                                    <span className="text-sm font-bold text-gray-900">{progress}%</span>
                                </div>
                                <Slider
                                    defaultValue={[65]}
                                    max={100}
                                    step={1}
                                    value={progress}
                                    onValueChange={setProgress}
                                    className="w-full"
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-sm font-semibold text-gray-700">
                                    Keterangan / Kendala (Wajib Isi jika {"<"}100%):
                                </label>
                                <Textarea
                                    placeholder="Masukkan Keterangan Kendala..."
                                    value={comments}
                                    onChange={(e) => setComments(e.target.value)}
                                    className="min-h-[120px] resize-none border-blue-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
                                />
                            </div>
                        </div>

                        {/* SECTION B: PENILAIAN RISIKO AKTUAL */}
                        <div className="space-y-6">
                            <div className="space-y-1">
                                <h3 className="text-sm font-bold text-gray-700 uppercase">
                                    B. PENILAIAN RISIKO AKTUAL (REALISASI)
                                </h3>
                                <p className="text-sm text-gray-400">
                                    &quot;Berdasarkan kondisi Triwulan ini, posisi risiko ada di mana?&quot;
                                </p>
                            </div>

                            <div className="grid gap-6 max-w-2xl">
                                {/* Kemungkinan */}
                                <div className="grid grid-cols-12 items-center gap-4">
                                    <label className="col-span-4 text-sm font-semibold text-gray-700">
                                        Kemungkinan Aktual :
                                    </label>
                                    <div className="col-span-8">
                                        <Select value={kemungkinan} onValueChange={setKemungkinan}>
                                            <SelectTrigger className="w-full h-11 border-blue-200 focus:ring-blue-500 rx-4 rounded-lg text-gray-500 font-normal">
                                                <SelectValue placeholder="Pilih Kemungkinan..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {KEMUNGKINAN_OPTIONS.map(opt => (
                                                    <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {/* Dampak */}
                                <div className="grid grid-cols-12 items-center gap-4">
                                    <label className="col-span-4 text-sm font-semibold text-gray-700">
                                        Dampak Aktual :
                                    </label>
                                    <div className="col-span-8">
                                        <Select value={dampak} onValueChange={setDampak}>
                                            <SelectTrigger className="w-full h-11 border-blue-200 focus:ring-blue-500 px-4 rounded-lg text-gray-500 font-normal">
                                                <SelectValue placeholder="Pilih Dampak..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {DAMPAK_OPTIONS.map(opt => (
                                                    <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {/* Skor Aktual */}
                                <div className="grid grid-cols-12 items-center gap-4">
                                    <label className="col-span-4 text-sm font-semibold text-gray-700">
                                        Skor Aktual :
                                    </label>
                                    <div className="col-span-8">
                                        <Input
                                            placeholder="Hasil"
                                            className="h-11 border-2 border-blue-500 focus:ring-blue-500 rounded-lg px-4"
                                            readOnly
                                            value={kemungkinan && dampak ? "High" : ""}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ACTION BUTTON */}
                        <div className="flex justify-end pt-4">
                            <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-6 py-2 h-auto text-sm font-medium shadow-md shadow-blue-500/20">
                                <Save className="mr-2 h-4 w-4" />
                                Simpan Progress Triwulan
                            </Button>
                        </div>

                    </TabsContent>

                    {/* Placeholder for other tabs */}
                    <TabsContent value="tw2"><div className="py-8 text-center text-gray-400">Content for Triwulan 2</div></TabsContent>
                    <TabsContent value="tw3"><div className="py-8 text-center text-gray-400">Content for Triwulan 3</div></TabsContent>
                    <TabsContent value="tw4"><div className="py-8 text-center text-gray-400">Content for Triwulan 4</div></TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
