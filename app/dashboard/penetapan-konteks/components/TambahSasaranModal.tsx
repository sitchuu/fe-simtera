"use client"

import React from "react"
import { X, Save } from "lucide-react"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface TambahSasaranModalProps {
    isOpen: boolean
    onClose: () => void
}

export function TambahSasaranModal({ isOpen, onClose }: TambahSasaranModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden gap-0 rounded-2xl">
                <DialogHeader className="px-8 pt-8 pb-4 flex flex-row items-center justify-between">
                    <DialogTitle className="text-2xl font-bold text-gray-700">
                        Tambah Sasaran
                    </DialogTitle>
                    {/* Close button is handled by DialogPrimitive.Close inside DialogContent, 
              but the design shows a specific X icon in a circle or similar, 
              we can let the default close handle it or customize if needed. 
              The default close is absolute positioned. 
              Let's hide the default one and make a custom one if layout demands, 
              or stick to default. The design shows a circled X. 
              Review of the design image suggests standard X. 
              We'll stick to default for now but ensure it looks right. 
              Actually, the default DialogContent has a Close button absolute positioned.
              We can just use that.
          */}
                </DialogHeader>

                <div className="px-8 py-4 space-y-6">
                    <div className="space-y-3">
                        <Label htmlFor="kode-risiko" className="text-base font-bold text-gray-700">
                            1. Kode Risiko
                        </Label>
                        <Input
                            id="kode-risiko"
                            placeholder="Masukkan Kode..."
                            className="h-12 border-blue-300 focus-visible:ring-blue-500 text-base rounded-xl placeholder:text-gray-300"
                        />
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
                            className="min-h-[120px] resize-none border-blue-300 focus-visible:ring-blue-500 text-base rounded-xl placeholder:text-gray-300"
                        />
                    </div>
                </div>

                <div className="px-8 py-6 flex justify-end">
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-8 py-6 text-base font-medium shadow-lg shadow-blue-500/20">
                        <Save className="mr-2 h-5 w-5" />
                        Simpan
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
