"use client"

import React from "react"
import Link from "next/link"
import { Save, Plus, Trash2, Undo2, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Label } from "@/components/ui/label"

export default function FormRTPPage() {
    const [isModalOpen, setIsModalOpen] = React.useState(false)

    return (
        <div className="space-y-8 max-w-5xl mx-auto pb-20">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-800 uppercase">
                    FORMULIR RENCANA TINDAK PENANGANAN (RTP)
                </h1>
                <div className="flex items-center gap-2 text-gray-400 text-sm mt-1">
                    <span>Penanganan Risiko</span>
                    <span>&gt;</span>
                    <span>Tambah Data</span>
                </div>
            </div>

            {/* Info Risiko Box */}
            <div className="bg-transparent space-y-4">
                <h2 className="text-lg font-bold text-gray-700">Info Risiko</h2>
                <div className="space-y-2">
                    <div className="grid grid-cols-[100px_1fr] gap-4 items-center">
                        <span className="font-bold text-gray-700">Risiko:</span>
                        <span className="text-gray-900">-</span>
                    </div>
                    <div className="grid grid-cols-[100px_1fr] gap-4 items-center">
                        <span className="font-bold text-gray-700">Level Awal:</span>
                        <span className="text-gray-900">-</span>
                    </div>
                </div>
            </div>

            {/* 1. Opsi Penanganan */}
            <div className="space-y-4">
                <h2 className="text-lg font-bold text-gray-700">
                    1. Opsi Penanganan
                </h2>
                <div className="w-full md:w-1/3">
                    <Select>
                        <SelectTrigger className="h-12 border-blue-300 rounded-xl text-gray-500">
                            <SelectValue placeholder="Pilih Strategi" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="mitigasi">Mitigasi</SelectItem>
                            <SelectItem value="transfer">Transfer</SelectItem>
                            <SelectItem value="hindari">Hindari</SelectItem>
                            <SelectItem value="terima">Terima</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* 2. Rencana Aksi */}
            <div className="space-y-4">
                <h2 className="text-lg font-bold text-gray-700">
                    2. Rencana Aksi
                </h2>
                <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                    <Table>
                        <TableHeader className="bg-gray-50/50">
                            <TableRow>
                                <TableHead className="w-12 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">No</TableHead>
                                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Keadaan / Aksi</TableHead>
                                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Target Output</TableHead>
                                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider w-40">Jadwal</TableHead>
                                <TableHead className="w-16 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {[1, 2, 3, 4, 5].map((item) => (
                                <TableRow key={item}>
                                    <TableCell className="text-center text-gray-600 font-medium">{item}.</TableCell>
                                    <TableCell className="text-gray-600">Sasaran kinerja</TableCell>
                                    <TableCell className="text-gray-600">Sasaran kinerja</TableCell>
                                    <TableCell className="text-gray-600">10 Januari 2026</TableCell>
                                    <TableCell className="text-center">
                                        <button className="text-red-500 hover:text-red-700 transition-colors p-1">
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <Button
                    className="bg-blue-500 hover:bg-blue-600 text-white shadow-md text-xs h-9"
                    onClick={() => setIsModalOpen(true)}
                >
                    <Plus className="mr-2 h-3 w-3" />
                    Tambah Kegiatan Lain
                </Button>
            </div>

            {/* 3. Target Risiko Residual */}
            <div className="space-y-6">
                <div>
                    <h2 className="text-lg font-bold text-gray-700">
                        3. Target Risiko Residual
                    </h2>
                    <p className="text-gray-400 italic text-sm mt-1">
                        Setelah aksi di atas dilakukan, risiko diharapkan turun menjadi:
                    </p>
                </div>

                <div className="space-y-6 max-w-lg">
                    {/* Kemungkinan */}
                    <div className="grid grid-cols-[120px_1fr] gap-4 items-center">
                        <Label className="text-base font-bold text-gray-700">Kemungkinan:</Label>
                        <Select>
                            <SelectTrigger className="h-12 border-blue-300 rounded-xl text-gray-400">
                                <SelectValue placeholder="Tentukan Kemungkinan" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="low">Rendah</SelectItem>
                                <SelectItem value="medium">Sedang</SelectItem>
                                <SelectItem value="high">Tinggi</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Dampak */}
                    <div className="grid grid-cols-[120px_1fr] gap-4 items-center">
                        <Label className="text-base font-bold text-gray-700">Dampak:</Label>
                        <Select>
                            <SelectTrigger className="h-12 border-blue-300 rounded-xl text-gray-400">
                                <SelectValue placeholder="Tentukan Dampak" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="low">Rendah</SelectItem>
                                <SelectItem value="medium">Sedang</SelectItem>
                                <SelectItem value="high">Tinggi</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Hasil */}
                    <div className="grid grid-cols-[120px_1fr] gap-4 items-center">
                        <Label className="text-base font-bold text-gray-700">Hasil:</Label>
                        <Input
                            placeholder="Hasil"
                            className="h-12 border-blue-300 rounded-xl text-gray-400"
                            readOnly
                        />
                    </div>
                </div>
            </div>

            {/* Footer Actions */}
            <div className="flex justify-end gap-4 pt-12">
                <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-50 px-8 h-11" asChild>
                    <Link href="/dashboard/penanganan-risiko">
                        <Undo2 className="mr-2 h-4 w-4" />
                        Kembali
                    </Link>
                </Button>
                <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8 h-11 shadow-lg shadow-blue-500/20">
                    <Save className="mr-2 h-4 w-4" />
                    Simpan
                </Button>
            </div>


            <TambahKegiatanModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    )
}

function TambahKegiatanModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden gap-0 rounded-2xl">
                <DialogHeader className="px-8 pt-8 pb-4 flex flex-row items-center justify-between">
                    <DialogTitle className="text-xl font-bold text-gray-700">
                        Tambah Kegiatan
                    </DialogTitle>
                </DialogHeader>

                <div className="px-8 py-2 space-y-5">
                    {/* 1. Keadaan / Aksi */}
                    <div className="space-y-2">
                        <Label htmlFor="keadaan" className="text-sm font-bold text-gray-700">
                            1. Keadaan / Aksi
                        </Label>
                        <Input
                            id="keadaan"
                            placeholder="Masukkan Keadaan..."
                            className="h-11 border-blue-300 focus-visible:ring-blue-500 rounded-xl placeholder:text-gray-300"
                        />
                    </div>

                    {/* 2. Target Output */}
                    <div className="space-y-2">
                        <Label htmlFor="target" className="text-sm font-bold text-gray-700">
                            2. Target Output
                        </Label>
                        <Input
                            id="target"
                            placeholder="Masukkan Kode..." // Placeholder matches image, though label says Target Output
                            className="h-11 border-blue-300 focus-visible:ring-blue-500 rounded-xl placeholder:text-gray-300"
                        />
                    </div>

                    {/* 3. Jadwal */}
                    <div className="space-y-2">
                        <Label htmlFor="jadwal" className="text-sm font-bold text-gray-700">
                            3. Jadwal
                        </Label>
                        <div className="relative">
                            <Input
                                id="jadwal"
                                placeholder="Masukkan Jadwal..."
                                className="h-11 border-blue-300 focus-visible:ring-blue-500 rounded-xl placeholder:text-gray-300 pr-10"
                            />
                            <Calendar className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                        </div>
                    </div>
                </div>

                <div className="px-8 py-6 flex justify-end">
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-8 py-2.5 text-sm font-medium shadow-lg shadow-blue-500/20">
                        <Save className="mr-2 h-4 w-4" />
                        Simpan
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
