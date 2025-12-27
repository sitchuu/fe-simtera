"use client"

import React from "react"
import { Plus, Info, Pencil, Save, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function PenetapanKonteksPage() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-20">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Penetapan Konteks Manajemen Risiko
        </h1>
        <p className="text-gray-500 mt-2">
          Silakan lengkapi data konteks unit Anda untuk periode berjalan.
        </p>
      </div>

      {/* Informasi Umum Unit */}
      <div className="mb-14">
        <h2 className="text-lg font-bold text-gray-700 mb-4 uppercase tracking-wide">
          INFORMASI UMUM UNIT
        </h2>
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <label className="w-40 text-base font-bold text-gray-700">
              Tahun Periode:
            </label>
            <div className="text-base text-gray-900 font-medium">2025</div>
          </div>
          <div className="flex items-center gap-4">
            <label className="w-40 text-base font-bold text-gray-700">
              Unit Organisasi:
            </label>
            <div className="text-base text-gray-900 font-medium">
              BBPPMPV BMTI
            </div>
          </div>
        </div>
      </div>

      {/* Ruang Lingkup Penerapan */}
      <div className="mb-10">
        <label className="block text-lg font-bold text-gray-700 mb-4">
          Ruang Lingkup Penerapan:
        </label>
        <Textarea
          placeholder="Isi dengan tugas dan fungsi unit terkait"
          className="min-h-[150px] resize-y text-base border-blue-300 focus:border-blue-500 rounded-lg"
        />
      </div>

      {/* Tabs Navigation */}
      <Tabs defaultValue="sasaran" className="w-full">
        <TabsList className="w-full justify-start h-auto p-0 bg-transparent border-b-2 border-gray-200 rounded-none space-x-8 mb-8">
          <TabsTrigger
            value="sasaran"
            className="px-0 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 text-base font-bold text-blue-400 hover:text-blue-500 bg-transparent shadow-none transition-all -mb-0.5"
          >
            1. Sasaran Organisasi
          </TabsTrigger>
          <TabsTrigger
            value="struktur"
            className="px-0 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 text-base font-bold text-blue-400 hover:text-blue-500 bg-transparent shadow-none transition-all -mb-0.5"
          >
            2. Struktur UPR
          </TabsTrigger>
          <TabsTrigger
            value="stakeholder"
            className="px-0 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 text-base font-bold text-blue-400 hover:text-blue-500 bg-transparent shadow-none transition-all -mb-0.5"
          >
            3. Stakeholder
          </TabsTrigger>
          <TabsTrigger
            value="regulasi"
            className="px-0 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 text-base font-bold text-blue-400 hover:text-blue-500 bg-transparent shadow-none transition-all -mb-0.5"
          >
            4. Regulasi
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sasaran" className="mt-8 space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="text-xl font-bold text-gray-800 uppercase">
                DAFTAR SASARAN ORGANISASI / KINERJA
              </h3>
              <p className="text-gray-400 text-sm mt-1">
                *Tips: Mengacu pada dokumen Renstra / Perjanjian Kinerja Unit.
              </p>
            </div>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white shadow-md">
              <Plus className="mr-2 h-4 w-4" />
              Tambah Sasaran
            </Button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="w-[50px] text-center">No</TableHead>
                  <TableHead className="w-[150px]">Kode Risiko</TableHead>
                  <TableHead>Uraian Sasaran Strategis</TableHead>
                  <TableHead className="w-[100px] text-center">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[1, 2, 3, 4, 5].map((item) => (
                  <TableRow key={item}>
                    <TableCell className="text-center font-medium">{item}.</TableCell>
                    <TableCell>BMIT01</TableCell>
                    <TableCell className="text-gray-600">
                      Meningkatnya kualitas tata kelola...
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <button className="text-blue-500 hover:text-blue-700 transition-colors p-1 rounded-md hover:bg-blue-50">
                          <Pencil className="h-5 w-5" />
                        </button>
                        <button className="text-orange-500 hover:text-orange-700 transition-colors p-1 rounded-md hover:bg-orange-50">
                          <Info className="h-5 w-5" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="struktur">
          <div className="p-8 text-center text-gray-500 bg-white rounded-xl border border-dashed border-gray-300">
            Konten Struktur UPR akan ditampilkan di sini.
          </div>
        </TabsContent>
        <TabsContent value="stakeholder">
          <div className="p-8 text-center text-gray-500 bg-white rounded-xl border border-dashed border-gray-300">
            Konten Stakeholder akan ditampilkan di sini.
          </div>
        </TabsContent>
        <TabsContent value="regulasi">
          <div className="p-8 text-center text-gray-500 bg-white rounded-xl border border-dashed border-gray-300">
            Konten Regulasi akan ditampilkan di sini.
          </div>
        </TabsContent>
      </Tabs>

      {/* Footer Actions */}
      <div className="flex justify-end gap-4 pt-8 border-t border-gray-200">
        <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6">
          <Save className="mr-2 h-4 w-4" />
          Simpan Draft
        </Button>
        <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-50 px-6">
          <Lock className="mr-2 h-4 w-4" />
          Kunci & Finalisasi
        </Button>
      </div>
    </div>
  )
}
