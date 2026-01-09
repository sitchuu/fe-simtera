"use client"

import React from "react"
import { Trash2, Pencil, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SaveButton, AddButton } from "@/components/ui/action-buttons"
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
import { TambahSasaranDialog } from "./components/TambahSasaranModal"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function PenetapanKonteksPage() {
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [isAnggotaModalOpen, setIsAnggotaModalOpen] = React.useState(false)
  const [isStakeholderModalOpen, setIsStakeholderModalOpen] = React.useState(false)
  const [isRegulasiModalOpen, setIsRegulasiModalOpen] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

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
        <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 items-center">
          <label className="text-base font-bold text-gray-700">
            Tahun Periode:
          </label>
          <div className="text-base text-gray-900 font-medium">2025</div>
          <label className="text-base font-bold text-gray-700">
            Unit Organisasi:
          </label>
          <div className="text-base text-gray-900 font-medium">
            BBPPMPV BMTI
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
          className="min-h-37.5 resize-y text-base border-blue-300 focus:border-blue-500 rounded-lg"
        />
      </div>

      {/* Tabs Navigation */}
      <Tabs defaultValue="sasaran" className="w-full">
        <TabsList className="w-full justify-start h-auto p-0 bg-transparent border-b-2 border-gray-200 rounded-none space-x-8 mb-8">
          <TabsTrigger
            value="sasaran"
            className="px-0 py-3 rounded-none border-t-0 border-x-0 border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 text-base font-bold text-blue-400 hover:text-blue-500 bg-transparent shadow-none data-[state=active]:shadow-none data-[state=active]:bg-transparent transition-all -mb-0.5"
          >
            1. Sasaran Organisasi
          </TabsTrigger>
          <TabsTrigger
            value="struktur"
            className="px-0 py-3 rounded-none border-t-0 border-x-0 border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 text-base font-bold text-blue-400 hover:text-blue-500 bg-transparent shadow-none data-[state=active]:shadow-none data-[state=active]:bg-transparent transition-all -mb-0.5"
          >
            2. Struktur UPR
          </TabsTrigger>
          <TabsTrigger
            value="stakeholder"
            className="px-0 py-3 rounded-none border-t-0 border-x-0 border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 text-base font-bold text-blue-400 hover:text-blue-500 bg-transparent shadow-none data-[state=active]:shadow-none data-[state=active]:bg-transparent transition-all -mb-0.5"
          >
            3. Stakeholder
          </TabsTrigger>
          <TabsTrigger
            value="regulasi"
            className="px-0 py-3 rounded-none border-t-0 border-x-0 border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 text-base font-bold text-blue-400 hover:text-blue-500 bg-transparent shadow-none data-[state=active]:shadow-none data-[state=active]:bg-transparent transition-all -mb-0.5"
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
            <AddButton
              onClick={() => setIsModalOpen(true)}
              label="Tambah Sasaran"
            />
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="w-12.5 text-center">No</TableHead>
                  <TableHead className="w-37.5">Kode Risiko</TableHead>
                  <TableHead>Uraian Sasaran Strategis</TableHead>
                  <TableHead className="w-25 text-center">Aksi</TableHead>
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
                        <button className="text-red-500 hover:text-red-700 transition-colors p-1 rounded-md hover:bg-red-50">
                          <Trash2 className="h-5 w-5" />
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
          <div className="space-y-12">
            <div>
              <h3 className="text-xl font-bold text-gray-800 capitalize mb-1">
                Struktur UPR (Unit Pemilik Risiko)
              </h3>
              <p className="text-gray-400 text-sm">
                Menentukan siapa penanggung jawab
              </p>
            </div>

            {/* Pemilik Risiko */}
            <div className="space-y-6">
              <h4 className="text-lg font-bold text-gray-700">
                1. Pemilik Risiko (Ketua UPR)
              </h4>
              <div className="space-y-6">
                <div className="w-full md:w-1/2 lg:w-1/3">
                  <Label className="text-xs font-bold text-gray-700 mb-2 block">
                    Jabatan:
                  </Label>
                  <Select>
                    <SelectTrigger className="h-12 border-blue-300 rounded-md text-gray-500">
                      <SelectValue placeholder="Jabatan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kepala">Kepala</SelectItem>
                      <SelectItem value="wakil">Wakil Kepala</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-gray-700">NIP:</Label>
                    <Input
                      placeholder="Masukkan NIP..."
                      className="h-12 border-blue-300 rounded-md"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-gray-700">Nama:</Label>
                    <Input
                      placeholder="Nama Pemilik Risiko..."
                      className="h-12 border-blue-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Pengelola Risiko */}
            <div className="space-y-6">
              <h4 className="text-lg font-bold text-gray-700">
                2. Pengelola Risiko (Koordinator/Sekretaris)
              </h4>
              <div className="space-y-6">
                <div className="w-full md:w-1/2 lg:w-1/3">
                  <Label className="text-xs font-bold text-gray-700 mb-2 block">
                    Jabatan:
                  </Label>
                  <Select>
                    <SelectTrigger className="h-12 border-blue-300 rounded-md text-gray-500">
                      <SelectValue placeholder="Jabatan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sekretaris">Sekretaris</SelectItem>
                      <SelectItem value="koordinator">Koordinator</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-gray-700">NIP:</Label>
                    <Input
                      placeholder="Masukkan NIP..."
                      className="h-12 border-blue-300 rounded-md"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-gray-700">Nama:</Label>
                    <Input
                      placeholder="Nama Pemilik Risiko..."
                      className="h-12 border-blue-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Anggota Tim */}
            <div className="space-y-6">
              <h4 className="text-lg font-bold text-gray-700">
                3. Anggota Tim (Opsional)
              </h4>
              <div>
                <AddButton
                  className="rounded-lg h-10 px-4 text-xs font-medium"
                  onClick={() => setIsAnggotaModalOpen(true)}
                  label="Tambah Anggota"
                />
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="stakeholder" className="mt-8 space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="text-xl font-bold text-gray-800 uppercase">
                DAFTAR PEMANGKU KEPENTINGAN (STAKEHOLDER)
              </h3>
              <p className="text-gray-400 text-sm mt-1">
                Mengidentifikasi pihak yang berinteraksi.
              </p>
            </div>
            <AddButton
              onClick={() => setIsStakeholderModalOpen(true)}
              label="Tambah Stakeholder"
            />
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="w-12.5 text-center">No</TableHead>
                  <TableHead>Nama Stakeholder</TableHead>
                  <TableHead>Hubungan / Keterangan</TableHead>
                  <TableHead className="w-25 text-center">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[1, 2, 3, 4, 5].map((item) => (
                  <TableRow key={item}>
                    <TableCell className="text-center font-medium">{item}.</TableCell>
                    <TableCell>Peserta Diklat</TableCell>
                    <TableCell className="text-gray-600">
                      Penerima Layanan
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <button className="text-blue-500 hover:text-blue-700 transition-colors p-1 rounded-md hover:bg-blue-50">
                          <Pencil className="h-5 w-5" />
                        </button>
                        <button className="text-red-500 hover:text-red-700 transition-colors p-1 rounded-md hover:bg-red-50">
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        <TabsContent value="regulasi" className="mt-8 space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="text-xl font-bold text-gray-800 uppercase">
                DAFTAR PERATURAN PERUNDANG-UNDANGAN TERKAIT
              </h3>
              <p className="text-gray-400 text-sm mt-1">
                Mengidentifikasi dasar hukum kerja.
              </p>
            </div>
            <AddButton
              onClick={() => setIsRegulasiModalOpen(true)}
              label="Tambah Regulasi"
            />
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="w-12.5 text-center">No</TableHead>
                  <TableHead>Nama Peraturan / UU</TableHead>
                  <TableHead>Tentang / Isi Ringkas</TableHead>
                  <TableHead className="w-25 text-center">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[1, 2, 3, 4, 5].map((item) => (
                  <TableRow key={item}>
                    <TableCell className="text-center font-medium">{item}.</TableCell>
                    <TableCell>Permendikbud No 26/2020</TableCell>
                    <TableCell className="text-gray-600">
                      OTK UPT Kemendikbud
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <button className="text-blue-500 hover:text-blue-700 transition-colors p-1 rounded-md hover:bg-blue-50">
                          <Pencil className="h-5 w-5" />
                        </button>
                        <button className="text-red-500 hover:text-red-700 transition-colors p-1 rounded-md hover:bg-red-50">
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      {/* Footer Actions */}
      <div className="flex justify-end gap-4 pt-8 border-t border-gray-200">
        <SaveButton label="Simpan Draft" className="px-6" />
        <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-50 px-6">
          <Lock className="mr-2 h-4 w-4" />
          Kunci & Finalisasi
        </Button>
      </div>
      {mounted && (
        <>
          <TambahSasaranDialog isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
          <TambahAnggotaModal isOpen={isAnggotaModalOpen} onClose={() => setIsAnggotaModalOpen(false)} />
          <TambahStakeholderModal isOpen={isStakeholderModalOpen} onClose={() => setIsStakeholderModalOpen(false)} />
          <TambahRegulasiModal isOpen={isRegulasiModalOpen} onClose={() => setIsRegulasiModalOpen(false)} />
        </>
      )}
    </div>
  )
}

function TambahAnggotaModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-150 p-0 overflow-hidden gap-0 rounded-2xl">
        <DialogHeader className="px-8 pt-8 pb-4 flex flex-row items-center justify-between">
          <DialogTitle className="text-2xl font-bold text-gray-700">
            Tambah Anggota Tim
          </DialogTitle>
        </DialogHeader>

        <div className="px-8 py-4 space-y-6">
          {/* 1. Jabatan */}
          <div className="space-y-3">
            <Label className="text-base font-bold text-gray-700">
              1. Jabatan
            </Label>
            <Select>
              <SelectTrigger className="h-12 border-blue-300 focus:ring-blue-500 rounded-md text-base text-gray-500">
                <SelectValue placeholder="Jabatan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="anggota">Anggota</SelectItem>
                <SelectItem value="staff">Staff</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 2. NIP */}
          <div className="space-y-3">
            <Label htmlFor="nip" className="text-base font-bold text-gray-700">
              2. NIP
            </Label>
            <Input
              id="nip"
              placeholder="Masukkan NIP..."
              className="h-12 border-blue-300 focus-visible:ring-blue-500 text-base rounded-md placeholder:text-gray-300"
            />
          </div>

          {/* 3. Nama */}
          <div className="space-y-3">
            <Label htmlFor="nama" className="text-base font-bold text-gray-700">
              3. Nama
            </Label>
            <Input
              id="nama"
              placeholder="Nama Anggota..."
              className="h-12 border-blue-300 focus-visible:ring-blue-500 text-base rounded-md placeholder:text-gray-300"
            />
          </div>
        </div>

        <div className="px-8 py-6 flex justify-end">
          <SaveButton className="rounded-lg px-8 py-6 text-base font-medium" />
        </div>
      </DialogContent>
    </Dialog>
  )
}

function TambahStakeholderModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-150 p-0 overflow-hidden gap-0 rounded-2xl">
        <DialogHeader className="px-8 pt-8 pb-4 flex flex-row items-center justify-between">
          <DialogTitle className="text-2xl font-bold text-gray-700">
            Tambah Stakeholder
          </DialogTitle>
        </DialogHeader>

        <div className="px-8 py-4 space-y-6">
          {/* 1. Nama Stakeholder */}
          <div className="space-y-3">
            <Label htmlFor="nama-stakeholder" className="text-base font-bold text-gray-700">
              1. Nama Stakeholder
            </Label>
            <Input
              id="nama-stakeholder"
              placeholder="Masukan Nama..."
              className="h-12 border-blue-300 focus-visible:ring-blue-500 text-base rounded-md placeholder:text-gray-300"
            />
          </div>

          {/* 2. Hubungan / Keterangan */}
          <div className="space-y-3">
            <Label htmlFor="hubungan" className="text-base font-bold text-gray-700">
              2. Hubungan / Keterangan
            </Label>
            <Textarea
              id="hubungan"
              className="min-h-15 resize-none border-blue-300 focus-visible:ring-blue-500 text-base rounded-md"
            />
          </div>
        </div>

        <div className="px-8 py-6 flex justify-end">
          <SaveButton className="rounded-lg px-8 py-6 text-base font-medium" />
        </div>
      </DialogContent>
    </Dialog>
  )
}

function TambahRegulasiModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-150 p-0 overflow-hidden gap-0 rounded-2xl">
        <DialogHeader className="px-8 pt-8 pb-4 flex flex-row items-center justify-between">
          <DialogTitle className="text-2xl font-bold text-gray-700">
            Tambah Regulasi
          </DialogTitle>
        </DialogHeader>

        <div className="px-8 py-4 space-y-6">
          {/* 1. Nama Peraturan / UU */}
          <div className="space-y-3">
            <Label htmlFor="nama-peraturan" className="text-base font-bold text-gray-700">
              1. Nama Peraturan / UU
            </Label>
            <Input
              id="nama-peraturan"
              placeholder="Masukan Nama..."
              className="h-12 border-blue-300 focus-visible:ring-blue-500 text-base rounded-md placeholder:text-gray-300"
            />
          </div>

          {/* 2. Tentang / Isi Ringkas */}
          <div className="space-y-3">
            <Label htmlFor="tentang" className="text-base font-bold text-gray-700">
              2. Tentang / Isi Ringkas
            </Label>
            <Input
              id="tentang"
              placeholder="Masukan Isi..."
              className="h-12 border-blue-300 focus-visible:ring-blue-500 text-base rounded-md placeholder:text-gray-300"
            />
          </div>
        </div>

        <div className="px-8 py-6 flex justify-end">
          <SaveButton className="rounded-lg px-8 py-6 text-base font-medium" />
        </div>
      </DialogContent>
    </Dialog>
  )
}
