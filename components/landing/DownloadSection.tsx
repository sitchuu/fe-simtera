"use client"

import { FileText, Download, PlayCircle, FileSpreadsheet } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DownloadSection() {
  const downloads = [
    {
      icon: <FileText className="h-6 w-6 text-red-500" />,
      title: "SK & Juknis Manajemen Risiko 2024",
      type: "PDF Document",
      action: "Download PDF",
    },
    // {
    //   icon: <FileSpreadsheet className="h-6 w-6 text-green-600" />,
    //   title: "Template Manual Risiko",
    //   type: "Excel Template",
    //   action: "Download Template",
    // },
    {
      icon: <FileText className="h-6 w-6 text-blue-500" />,
      title: "User Manual Aplikasi",
      type: "PDF Guide",
      action: "Download Guide",
    },
    // {
    //   icon: <PlayCircle className="h-6 w-6 text-purple-600" />,
    //   title: "Video Tutorial Penggunaan",
    //   type: "Video Resource",
    //   action: "Tonton Video",
    // },
  ]

  return (
    <section id="download" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">
            Dokumen & Regulasi
          </h2>
          <p className="text-zinc-500 max-w-2xl mx-auto">
            Akses cepat ke semua dokumen pendukung dan panduan yang Anda butuhkan.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {downloads.map((item, index) => (
            <div
              key={index}
              className="relative flex items-center p-6 bg-white rounded-xl border border-zinc-200 shadow-sm hover:shadow-2xl hover:-translate-y-2 hover:translate-x-2 hover:scale-105 hover:z-10 transition-all duration-300 group"
            >
              <div className="p-3 bg-zinc-50 rounded-lg mr-4">
                {item.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-zinc-900">{item.title}</h3>
                <p className="text-sm text-zinc-500">{item.type}</p>
              </div>
              <Button variant="ghost" size="sm" className="cursor-pointer text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                {item.action === "Download PDF" || item.action === "Download Template" || item.action === "Download Guide" ? (
                  <Download className="h-4 w-4" />
                ) : (
                  <PlayCircle className="h-4 w-4" />
                )}
                <span className="ml-2 hidden sm:inline">{item.action}</span>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
