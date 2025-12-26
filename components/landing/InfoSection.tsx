"use client"

import { ShieldCheck, Layers, Activity } from "lucide-react"
import { useEffect, useRef } from "react"
import gsap from "gsap"

export default function InfoSection() {
  const sectionRef = useRef(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cardsRef.current) return

    const cards = cardsRef.current.children
    
    gsap.fromTo(
      cards,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    )
  }, [])

  const features = [
    {
      icon: <ShieldCheck className="h-10 w-10 text-blue-600" />,
      title: "Kepatuhan Regulasi",
      description: "Mengacu pada Permendikbud & SK Kepala Balai 2024 untuk memastikan standar kepatuhan tertinggi.",
    },
    {
      icon: <Layers className="h-10 w-10 text-blue-600" />,
      title: "Terintegrasi",
      description: "Pengelolaan risiko dari penetapan konteks hingga pemantauan dilakukan dalam satu pintu terpadu.",
    },
    {
      icon: <Activity className="h-10 w-10 text-blue-600" />,
      title: "Real-time Monitoring",
      description: "Pantau peta risiko dan efektivitas mitigasi secara real-time untuk pengambilan keputusan cepat.",
    },
  ]

  return (
    <section id="info" className="py-20 bg-white">
      <div ref={sectionRef} className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">
            Transformasi Budaya Risiko
          </h2>
          <p className="text-zinc-500 max-w-2xl mx-auto">
            Membangun kesadaran dan sistem manajemen risiko yang proaktif untuk mencapai tujuan organisasi.
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl bg-zinc-50 border border-zinc-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="mb-6 p-4 bg-blue-50 rounded-xl w-fit group-hover:bg-blue-100 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-zinc-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
