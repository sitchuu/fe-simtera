"use client"

import React, { useState } from "react"
import { Save, Plus, FileText, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type UnitData = {
  unit: string
  objects: string[]
}

const INITIAL_DATA: UnitData[] = [
  {
    unit: "DAI",
    objects: [
      "01 Aplikasi SPBE",
      "02 Infrastruktur SPBE",
      "03 Keamanan SPBE",
      "04 Layanan SPBE",
    ],
  },
]

export default function SubKategoriRisikoPage() {
  const [data, setData] = useState<UnitData[]>(INITIAL_DATA)
  // State to track which unit is currently adding a new item
  const [addingToUnit, setAddingToUnit] = useState<string | null>(null)
  const [newItemValue, setNewItemValue] = useState("")

  const handleStartAdd = (unitName: string) => {
    setAddingToUnit(unitName)
    setNewItemValue("")
  }

  const handleCancelAdd = () => {
    setAddingToUnit(null)
    setNewItemValue("")
  }

  const handleSaveItem = (unitIndex: number) => {
    if (!newItemValue.trim()) return

    const newData = [...data]
    newData[unitIndex].objects.push(newItemValue)
    setData(newData)
    handleCancelAdd()
  }

  const handleDeleteItem = (unitIndex: number, objIndex: number) => {
    const newData = [...data]
    newData[unitIndex].objects.splice(objIndex, 1)
    setData(newData)
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-20">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Sub Kategori Risiko
        </h1>
        <p className="text-gray-500 mt-2">
          Halaman untuk mengelola data sub-kategori risiko per unit.
        </p>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="w-[200px] font-bold text-gray-700">Unit</TableHead>
              <TableHead className="font-bold text-gray-700">Objek Risiko</TableHead>
              <TableHead className="w-[100px] text-center font-bold text-gray-700">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, unitIndex) => {
              const rowCount = row.objects.length + 1 // objects + adder row

              return (
                <React.Fragment key={row.unit}>
                  {/* Existing Items */}
                  {row.objects.map((obj, objIndex) => (
                    <TableRow key={`${row.unit}-${objIndex}`} className="hover:bg-gray-50/50">
                      {objIndex === 0 ? (
                        <TableCell
                          rowSpan={rowCount}
                          className="align-top font-medium text-base py-4 border-r bg-white"
                        >
                          <div className="flex items-start gap-2">
                            <div className="p-2 bg-blue-50 rounded-lg text-blue-600 mt-1">
                              <FileText className="h-5 w-5" />
                            </div>
                            <span className="mt-2">{row.unit}</span>
                          </div>
                        </TableCell>
                      ) : null}

                      <TableCell className="py-3">
                        <div className="flex items-center gap-3">
                          <span className="font-medium min-w-[20px] text-gray-400 select-none">
                            {objIndex + 1}.
                          </span>
                          <span className="text-gray-700">{obj}</span>
                        </div>
                      </TableCell>

                      <TableCell className="py-3 text-center">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                          onClick={() => handleDeleteItem(unitIndex, objIndex)}
                          title="Hapus"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}

                  {/* Adder Row */}
                  <TableRow key={`${row.unit}-adder`} className="hover:bg-transparent">
                    {row.objects.length === 0 ? (
                      <TableCell
                        rowSpan={1}
                        className="align-top font-medium text-base py-4 border-r bg-white"
                      >
                        <div className="flex items-start gap-2">
                          <div className="p-2 bg-blue-50 rounded-lg text-blue-600 mt-1">
                            <FileText className="h-5 w-5" />
                          </div>
                          <span className="mt-2">{row.unit}</span>
                        </div>
                      </TableCell>
                    ) : null}

                    <TableCell className="py-3">
                      {addingToUnit === row.unit ? (
                        <div className="flex items-center gap-3 animate-in fade-in slide-in-from-top-1 duration-200">
                          <span className="font-medium min-w-[20px] text-gray-400 text-sm select-none">
                            {row.objects.length + 1}.
                          </span>
                          <div className="flex items-center gap-2 w-full max-w-md">
                            <Input
                              autoFocus
                              value={newItemValue}
                              onChange={(e) => setNewItemValue(e.target.value)}
                              placeholder="Masukkan objek risiko baru..."
                              className="h-9 text-sm"
                              onKeyDown={(e) => {
                                if (e.key === "Enter") handleSaveItem(unitIndex)
                                if (e.key === "Escape") handleCancelAdd()
                              }}
                            />
                            <Button
                              size="sm"
                              className="bg-blue-600 hover:bg-blue-700 h-9 px-3"
                              onClick={() => handleSaveItem(unitIndex)}
                            >
                              <Save className="h-4 w-4 mr-1" />
                              Simpan
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-9 px-3 text-gray-500 hover:text-gray-700"
                              onClick={handleCancelAdd}
                            >
                              Batal
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <Button
                          variant="ghost"
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 pl-0 h-auto py-1 px-2 justify-start font-medium text-sm ml-8" // ml-8 to align with text
                          onClick={() => handleStartAdd(row.unit)}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Tambah Data
                        </Button>
                      )}
                    </TableCell>

                    <TableCell /> {/* Empty Aksi cell for adder row */}
                  </TableRow>
                </React.Fragment>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
