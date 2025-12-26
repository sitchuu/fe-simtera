"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

export default function StatsSection() {
  const sectionRef = useRef(null)
  
  const count1Ref = useRef({ value: 0 })
  const count2Ref = useRef({ value: 0 })
  const count3Ref = useRef({ value: 0 })
  
  const num1Ref = useRef<HTMLDivElement>(null)
  const num2Ref = useRef<HTMLDivElement>(null)
  const num3Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const animateCount = (obj: { value: number }, target: number, element: React.MutableRefObject<HTMLDivElement | null>, suffix = "") => {
      gsap.to(obj, {
        value: target,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        onUpdate: () => {
          if (element.current) {
            element.current.textContent = Math.round(obj.value) + suffix
          }
        },
      })
    }

    animateCount(count1Ref.current, 45, num1Ref)
    animateCount(count2Ref.current, 12, num2Ref)
    animateCount(count3Ref.current, 98, num3Ref, "%")
    
  }, [])

  return (
    <section id="stats" className="py-20 bg-blue-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-0 w-64 h-64 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div ref={sectionRef} className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Statistik Risiko Tahun 2025
          </h2>
          <p className="text-blue-200 max-w-2xl mx-auto">
            Transparansi kinerja manajemen risiko di lingkungan BBPPMPV BMTI.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
            <div ref={num1Ref} className="text-5xl font-bold mb-2 text-blue-100">0</div>
            <div className="text-lg font-medium text-blue-100">Risiko Teridentifikasi</div>
          </div>
          <div className="p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
            <div ref={num2Ref} className="text-5xl font-bold mb-2 text-blue-100">0</div>
            <div className="text-lg font-medium text-blue-100">Rencana Penanganan Berjalan</div>
          </div>
          <div className="p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
            <div ref={num3Ref} className="text-5xl font-bold mb-2 text-blue-100">0%</div>
            <div className="text-lg font-medium text-blue-100">Unit Kerja Berpartisipasi</div>
          </div>
        </div>
      </div>
    </section>
  )
}
