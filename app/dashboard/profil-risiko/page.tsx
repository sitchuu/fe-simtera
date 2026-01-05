"use client"

import React, { useState } from "react"
import { Plus, Info, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DashboardFilters } from "@/components/dashboard/dashboard-filters"
import { RiskFormWizard } from "@/components/dashboard/risk-form-wizard"

// Mock Data
const RISKS = [
  {
    id: 1,
    event: "Sasaran kinerja",
    level: "Sangat Tinggi",
    controlStatus: "Sudah Efektif",
  },
  {
    id: 2,
    event: "Sasaran kinerja",
    level: "Rendah",
    controlStatus: "Tidak Efektif",
  },
  {
    id: 3,
    event: "Sasaran kinerja",
    level: "Sedang",
    controlStatus: "Kurang Efektif",
  },
  {
    id: 4,
    event: "Sasaran kinerja",
    level: "Tinggi",
    controlStatus: "Kurang Efektif",
  },
  {
    id: 5,
    event: "Sasaran kinerja",
    level: "Sangat Rendah",
    controlStatus: "Kurang Efektif",
  },
]

const getLevelBadgeColor = (level: string) => {
  switch (level) {
    case "Sangat Tinggi":
      return "bg-red-100 text-red-600"
    case "Tinggi":
      return "bg-orange-100 text-orange-600"
    case "Sedang":
      return "bg-yellow-100 text-yellow-600"
    case "Rendah":
      return "bg-green-100 text-green-600"
    case "Sangat Rendah":
      return "bg-blue-100 text-blue-600"
    default:
      return "bg-gray-100 text-gray-600"
  }
}

const getControlStatusBadgeColor = (status: string) => {
  switch (status) {
    case "Sudah Efektif":
      return "bg-green-100 text-green-600"
    case "Kurang Efektif":
      return "bg-yellow-100 text-yellow-600"
    case "Tidak Efektif":
      return "bg-red-100 text-red-600"
    default:
      return "bg-gray-100 text-gray-600"
  }
}

export default function ProfilRisikoPage() {
  const [selectedUnit, setSelectedUnit] = useState("Semua Unit")
  const [selectedTriwulan, setSelectedTriwulan] = useState("Triwulan 4")
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString())
  const [isWizardOpen, setIsWizardOpen] = useState(false)

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-20">
      {/* Header & Filters */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-3xl font-bold text-gray-800">
            Formulir Manajemen Risiko
          </h1>
          <DashboardFilters 
            selectedUnit={selectedUnit}
            setSelectedUnit={setSelectedUnit}
            selectedTriwulan={selectedTriwulan}
            setSelectedTriwulan={setSelectedTriwulan}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
          />
        </div>
        
        {/* Add Button Row */}
        <div className="flex justify-end pt-2">
          <Button 
            className="bg-blue-500 hover:bg-blue-600 text-white shadow-md"
            onClick={() => setIsWizardOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Tambah
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-4">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="w-12.5 text-center">No</TableHead>
              <TableHead className="w-auto text-center">Kejadian Risiko</TableHead>
              <TableHead className="w-40 text-center">Level Risiko</TableHead>
              <TableHead className="w-48 text-center">Status Pengendalian</TableHead>
              <TableHead className="w-25 text-center">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {RISKS.map((risk, index) => (
              <TableRow key={risk.id}>
                <TableCell className="text-center font-medium">
                  {index + 1}.
                </TableCell>
                <TableCell className="text-gray-600">{risk.event}</TableCell>
                <TableCell className="text-center">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getLevelBadgeColor(
                      risk.level
                    )}`}
                  >
                    {risk.level}
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getControlStatusBadgeColor(
                      risk.controlStatus
                    )}`}
                  >
                    {risk.controlStatus}
                  </span>
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

      {/* Wizard Modal */}
      <RiskFormWizard open={isWizardOpen} onOpenChange={setIsWizardOpen} />
    </div>
  )
}
