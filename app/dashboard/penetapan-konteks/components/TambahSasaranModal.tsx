"use client"

import React from "react"
import { Save } from "lucide-react"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface TambahSasaranDialogProps {
    isOpen: boolean
    onClose: () => void
}

const UNITS = [
    "KEP", "KBT", "PEP", "TLK", "TUR", "PPM", "PPM1",
    "FAS", "FAS1", "MIT", "MIT1", "DAI", "DAI1", "TSP", "MES",
    "KTL", "ELE", "OTO", "LAF", "TET", "PUM", "RBI", "SPI", "UPG"
]

const OBJEK_RISIKO = [
    { code: "01", label: "01 Aplikasi SPBE" },
    { code: "02", label: "02 Infratruktur SPBE" },
    { code: "03", label: "03 Keamanan SPBE" },
    { code: "04", label: "04 Layanan SPBE" },
]

export function TambahSasaranDialog({ isOpen, onClose }: TambahSasaranDialogProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[800px] p-0 gap-0 rounded-2xl">
                <DialogHeader className="px-8 pt-8 pb-4 flex flex-row items-center justify-between">
                    <DialogTitle className="text-2xl font-bold text-gray-700">
                        Tambah Sasaran
                    </DialogTitle>
                </DialogHeader>

                <div className="px-8 py-4 space-y-6">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-3">
                            <Label htmlFor="kode-risiko" className="text-base font-bold text-gray-700">
                                1. Kode Risiko
                            </Label>
                            <Select>
                                <SelectTrigger className="h-12 border-blue-300 focus:ring-blue-500 rounded-md text-base text-gray-500">
                                    <SelectValue placeholder="Pilih Kode" />
                                </SelectTrigger>
                                <SelectContent className="z-[99999]">
                                    <SelectItem value="a">a. Risiko fiskal</SelectItem>
                                    <SelectItem value="b">b. Risiko kebijakan</SelectItem>
                                    <SelectItem value="c">c. Risiko kepatuhan</SelectItem>
                                    <SelectItem value="d">d. Risiko legal</SelectItem>
                                    <SelectItem value="e">e. Risiko fraud</SelectItem>
                                    <SelectItem value="f">f. Risiko reputasi</SelectItem>
                                    <SelectItem value="g">g. Risiko operasional</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-3">
                            <Label htmlFor="unit" className="text-base font-bold text-gray-700">
                                Unit
                            </Label>
                            <Select>
                                <SelectTrigger className="h-12 border-blue-300 focus:ring-blue-500 rounded-md text-base text-gray-500">
                                    <SelectValue placeholder="Pilih Unit" />
                                </SelectTrigger>
                                <SelectContent className="z-[99999]">
                                    {UNITS.map((unit) => (
                                        <SelectItem key={unit} value={unit}>
                                            {unit}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-3">
                            <Label htmlFor="objek-risiko" className="text-base font-bold text-gray-700">
                                Objek Risiko
                            </Label>
                            <Select>
                                <SelectTrigger className="h-12 border-blue-300 focus:ring-blue-500 rounded-md text-base text-gray-500">
                                    <SelectValue placeholder="Pilih Objek" />
                                </SelectTrigger>
                                <SelectContent className="z-[99999]">
                                    {OBJEK_RISIKO.map((item) => (
                                        <SelectItem key={item.code} value={item.code}>
                                            {item.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Label
                            htmlFor="uraian-sasaran"
                            className="text-base font-bold text-gray-700"
                        >
                            2. Uraian Sasaran Strategis
                        </Label>
                        <Textarea
                            id="uraian-sasaran"
                            placeholder="Masukkan Kode..."
                            className="min-h-[120px] resize-none border-blue-300 focus-visible:ring-blue-500 text-base rounded-md placeholder:text-gray-300"
                        />
                    </div>
                </div>

                <div className="px-8 py-6 flex justify-end">
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-8 py-6 text-base font-medium">
                        <Save className="mr-2 h-5 w-5" />
                        Simpan
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
