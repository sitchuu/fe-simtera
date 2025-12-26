"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen } from "lucide-react"
import { useEffect, useRef } from "react"
import gsap from "gsap"

export default function HeroSection() {
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const buttonsRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline()

    tl.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 }
    )
      .fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.5"
      )
      .fromTo(
        buttonsRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      )
  }, [])

  return (
    <section id="hero" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/img/bg bmti.png"
          alt="Gedung BMTI"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-blue-900/80 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center md:text-left mt-12">
        <div className="max-w-3xl">
          <h1
            ref={titleRef}
            className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6 drop-shadow-lg"
          >
            Sistem Informasi Manajemen Risiko Terintegrasi <br />
          </h1>
          <p
            ref={subtitleRef}
            className="text-lg md:text-xl text-zinc-200 mb-8 leading-relaxed max-w-2xl drop-shadow-md"
          >
            Implementasi Digital SK Kepala Balai Nomor /D7.5/KP Tahun 2024
            tentang Petunjuk Pelaksanaan Manajemen Risiko.
          </p>
          <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="cursor-pointer bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg px-8 py-6 rounded-xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              MASUK APLIKASI
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="cursor-pointer bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-sm font-semibold text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <BookOpen className="mr-2 h-5 w-5" />
              Lihat Panduan
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
