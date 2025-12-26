"use client"

import { Mail, MessageCircle } from "lucide-react"

export default function HelpdeskSection() {
  return (
    <section id="help" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">
            Butuh Bantuan?
          </h2>
          <p className="text-zinc-500 max-w-2xl mx-auto">
            Tim kami siap membantu Anda jika mengalami kendala teknis atau pertanyaan seputar aplikasi.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Admin SPI */}
          <div className="p-8 rounded-2xl bg-zinc-50 border border-zinc-100 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShieldCheckIcon className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900 mb-2">Admin SPI</h3>
            <p className="text-zinc-500 mb-6">Pengendali Internal</p>
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2 text-zinc-600">
                <MessageCircle className="h-5 w-5 text-green-500" />
                <span>+62 812-3456-7890</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-zinc-600">
                <Mail className="h-5 w-5 text-blue-500" />
                <span>spi@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Tim IT */}
          <div className="p-8 rounded-2xl bg-zinc-50 border border-zinc-100 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-purple-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <LaptopIcon className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900 mb-2">Tim IT (Teknis)</h3>
            <p className="text-zinc-500 mb-6">Dukungan Teknis Aplikasi</p>
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2 text-zinc-600">
                <MessageCircle className="h-5 w-5 text-green-500" />
                <span>+62 812-3456-7890</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-zinc-600">
                <Mail className="h-5 w-5 text-blue-500" />
                <span>it@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ShieldCheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}

function LaptopIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16" />
    </svg>
  )
}
