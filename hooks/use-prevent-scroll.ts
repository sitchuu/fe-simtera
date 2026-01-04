"use client"

import { useEffect, useRef } from "react"

export function usePreventScroll<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleWheel = (e: WheelEvent) => {
      const { scrollTop, scrollHeight, clientHeight } = element
      const isScrollable = scrollHeight > clientHeight

      if (!isScrollable) return

      // Scrolling up and at the top
      if (e.deltaY < 0 && scrollTop === 0) {
        e.preventDefault()
      }
      
      // Scrolling down and at the bottom
      if (e.deltaY > 0 && scrollTop + clientHeight >= scrollHeight - 1) { // -1 for sub-pixel rounding
        e.preventDefault()
      }
    }

    // Passive: false is required to use preventDefault
    element.addEventListener("wheel", handleWheel, { passive: false })

    return () => {
      element.removeEventListener("wheel", handleWheel)
    }
  }, [])

  return ref
}
