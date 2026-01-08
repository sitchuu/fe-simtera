"use client"

import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FormTextarea } from "@/components/dashboard/form-textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Plus, Trash2, Pencil, FileText } from "lucide-react"

interface RiskFormWizardProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

// --- Mock Options ---
const SASARAN_OPTIONS = ["Sasaran Kinerja 1", "Sasaran Kinerja 2", "Sasaran Kinerja 3"]
const KEMUNGKINAN_OPTIONS = ["1 - Hampir Tidak Terjadi", "2 - Jarang Terjadi", "3 - Kadang Terjadi", "4 - Sering Terjadi", "5 - Hampir Pasti Terjadi"]
const DAMPAK_OPTIONS = ["1 - Tidak Signifikan", "2 - Minor", "3 - Moderat", "4 - Signifikan", "5 - Sangat Signifikan"]
const EFEKTIVITAS_OPTIONS = ["Sudah Efektif", "Kurang Efektif", "Tidak Efektif"]

const MASTER_PENYEBAB = [
  "Listrik tidak stabil (Master)",
  "Lisensi software habis (Master)",
  "Server Down karena Overheat",
  "Koneksi Internet Putus",
  "SDM Kurang Kompeten",
]

export function RiskFormWizard({ open, onOpenChange }: RiskFormWizardProps) {
  const [step, setStep] = useState(1)

  // --- Form State ---
  // Step 1
  const [sasaran, setSasaran] = useState("")
  const [uraianKegiatan, setUraianKegiatan] = useState("")

  // Step 2
  const [sumberRisiko, setSumberRisiko] = useState<"Internal" | "Eksternal">("Internal")
  const [pemilikRisiko, setPemilikRisiko] = useState("")
  const [uraianRisiko, setUraianRisiko] = useState("")
  const [dampakRisiko, setDampakRisiko] = useState("")

  // Step 3
  const [causes, setCauses] = useState<{ id: number; text: string }[]>([
    { id: 1, text: "Lorem ipsum Dolor sit amet" },
    { id: 2, text: "Lorem ipsum Dolor sit amet" },
  ])
  const [openCombobox, setOpenCombobox] = useState(false)
  const [searchValue, setSearchValue] = useState("")

  const addCause = (text: string) => {
    setCauses([...causes, { id: Date.now(), text }])
    setOpenCombobox(false)
    setSearchValue("")
  }

  const removeCause = (id: number) => {
    setCauses(causes.filter(c => c.id !== id))
  }
  // Step 4
  const [kemungkinan, setKemungkinan] = useState("")
  const [dampak, setDampak] = useState("")

  // Step 5
  const [kontrol, setKontrol] = useState("")
  const [efektivitas, setEfektivitas] = useState("")

  const handleNext = () => {
    if (step < 5) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSave = () => {
    // TODO: Implement save logic
    console.log("Saving data...")
    onOpenChange(false)
    setStep(1) // Reset step
  }

  // --- Render Steps ---

  const renderStep1 = () => (
    <div className="space-y-8 py-4">
      <div className="flex flex-col gap-4">
        <label className="text-base font-semibold text-gray-700">1. Sasaran Kinerja</label>
        <Select value={sasaran} onValueChange={setSasaran}>
          <SelectTrigger className="w-full h-10 border-gray-300 focus:ring-blue-500">
            <SelectValue placeholder="Pilih Sasaran..." />
          </SelectTrigger>
          <SelectContent>
            {SASARAN_OPTIONS.map(opt => (
              <SelectItem key={opt} value={opt}>{opt}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-4">
        <label className="text-base font-semibold text-gray-700">2. Uraian Kegiatan</label>
        <FormTextarea
          placeholder="Masukkan Uraian..."
          className="min-h-[120px]"
          value={uraianKegiatan}
          onChange={(e) => setUraianKegiatan(e.target.value)}
        />
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-4">
          <label className="text-base font-semibold text-gray-700">1. Sumber Risiko</label>
          <div className="flex flex-row gap-6">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="sumber"
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                checked={sumberRisiko === "Internal"}
                onChange={() => setSumberRisiko("Internal")}
              />
              <span className="text-gray-600">Internal</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="sumber"
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                checked={sumberRisiko === "Eksternal"}
                onChange={() => setSumberRisiko("Eksternal")}
              />
              <span className="text-gray-600">Eksternal</span>
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <label className="text-base font-semibold text-gray-700">2. Pemilik Risiko</label>
          <Input
            placeholder="Masukan Uraian..."
            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            value={pemilikRisiko}
            onChange={(e) => setPemilikRisiko(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <label className="text-base font-semibold text-gray-700">3. Uraian Risiko</label>
        <FormTextarea
          placeholder="Masukkan Uraian..."
          value={uraianRisiko}
          onChange={(e) => setUraianRisiko(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-4">
        <label className="text-base font-semibold text-gray-700">4. Dampak Risiko</label>
        <FormTextarea
          placeholder="Masukkan Uraian..."
          value={dampakRisiko}
          onChange={(e) => setDampakRisiko(e.target.value)}
        />
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-6 py-4">
      <div className="border rounded-md overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-700 font-semibold border-b">
            <tr>
              <th className="px-4 py-3 w-12 text-center">No</th>
              <th className="px-4 py-3">Uraian Penyebab</th>
              <th className="px-4 py-3 w-24 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {causes.map((cause, idx) => (
              <tr key={cause.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-center">{idx + 1}.</td>
                <td className="px-4 py-3 text-gray-600">{cause.text}</td>
                <td className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button className="text-blue-500 hover:text-blue-700 p-1">
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button 
                      className="text-red-500 hover:text-red-700 p-1"
                      onClick={() => removeCause(cause.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Popover open={openCombobox} onOpenChange={setOpenCombobox} modal={true}>
        <PopoverTrigger asChild>
          <Button 
            role="combobox"
            aria-expanded={openCombobox}
            className="bg-blue-500 hover:bg-blue-600 text-white w-fit"
          >
            <Plus className="mr-2 h-4 w-4" />
            Tambah Penyebab Lain
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[400px] p-0" align="start">
          <Command>
            <CommandInput 
              placeholder="Cari penyebab..." 
              value={searchValue}
              onValueChange={setSearchValue}
            />
            <CommandList>
              <CommandEmpty>
                <div className="p-2">
                  <p className="text-sm text-muted-foreground mb-2">Tidak ditemukan.</p>
                  <Button 
                    variant="secondary" 
                    className="w-full justify-start h-auto py-2 px-3"
                    onClick={() => addCause(searchValue)}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Gunakan &ldquo;{searchValue}&rdquo; sebagai data baru
                  </Button>
                </div>
              </CommandEmpty>
              <CommandGroup heading="Master Penyebab">
                {MASTER_PENYEBAB.map((cause) => (
                  <CommandItem
                    key={cause}
                    value={cause}
                    onSelect={() => {
                      addCause(cause)
                    }}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    {cause}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )

  const renderStep4 = () => (
    <div className="space-y-6 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-4">
          <label className="text-base font-semibold text-gray-700">1. Kemungkinan</label>
          <Select value={kemungkinan} onValueChange={setKemungkinan}>
            <SelectTrigger className="w-full h-10 border-gray-300 focus:ring-blue-500">
              <SelectValue placeholder="Pilih Kemungkinan..." />
            </SelectTrigger>
            <SelectContent>
              {KEMUNGKINAN_OPTIONS.map(opt => (
                <SelectItem key={opt} value={opt}>{opt}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-4">
          <label className="text-base font-semibold text-gray-700">2. Dampak</label>
          <Select value={dampak} onValueChange={setDampak}>
            <SelectTrigger className="w-full h-10 border-gray-300 focus:ring-blue-500">
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

      <div className="flex flex-col gap-4">
        <label className="text-base font-semibold text-gray-700">3. Hasil</label>
        <Input
          placeholder="Hasil..."
          className="border-gray-300 bg-gray-50"
          readOnly
          value={kemungkinan && dampak ? "Tinggi" : ""}
        />
      </div>
    </div>
  )

  const renderStep5 = () => (
    <div className="space-y-6 py-4">
      <div className="flex flex-col gap-4">
        <label className="text-base font-semibold text-gray-700">1. Apa kontrol yang sudah ada?</label>
        <FormTextarea
          placeholder="Masukkan Uraian..."
          className="min-h-[120px]"
          value={kontrol}
          onChange={(e) => setKontrol(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-4">
        <label className="text-base font-semibold text-gray-700">2. Penilaian Efektivitas</label>
        <Select value={efektivitas} onValueChange={setEfektivitas}>
          <SelectTrigger className="w-full h-10 border-gray-300 focus:ring-blue-500">
            <SelectValue placeholder="Pilih Penilaian..." />
          </SelectTrigger>
          <SelectContent>
            {EFEKTIVITAS_OPTIONS.map(opt => (
              <SelectItem key={opt} value={opt}>{opt}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )

  const getTitle = () => {
    switch (step) {
      case 1: return "Sasaran & Kegiatan"
      case 2: return "Identifikasi Risiko"
      case 3: return "Analisis Penyebab Risiko"
      case 4: return "Analisis / Scoring"
      case 5: return "Pengendalian"
      default: return ""
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden gap-0">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle className="text-xl font-bold text-gray-800">
            {getTitle()}
          </DialogTitle>
        </DialogHeader>

        <div 
          className="px-6 max-h-[70vh] overflow-y-auto overscroll-contain"
          onWheel={(e) => {
            const el = e.currentTarget
            const { scrollTop, scrollHeight, clientHeight } = el
            const isScrollable = scrollHeight > clientHeight
            
            if (isScrollable) {
              const isAtTop = scrollTop === 0
              const isAtBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 1
              const isScrollingUp = e.deltaY < 0
              const isScrollingDown = e.deltaY > 0
              
              if (!(isAtTop && isScrollingUp) && !(isAtBottom && isScrollingDown)) {
                e.stopPropagation()
              }
            }
          }}
        >
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          {step === 4 && renderStep4()}
          {step === 5 && renderStep5()}
        </div>

        <DialogFooter className="px-6 py-4 border-t bg-gray-50 flex justify-end gap-2">
          {step > 1 && (
            <Button variant="outline" onClick={handleBack}>
              Kembali
            </Button>
          )}
          {step < 5 ? (
            <Button className="bg-blue-500 hover:bg-blue-600 text-white" onClick={handleNext}>
              Selanjutnya
            </Button>
          ) : (
            <Button className="bg-blue-500 hover:bg-blue-600 text-white" onClick={handleSave}>
              Simpan
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
