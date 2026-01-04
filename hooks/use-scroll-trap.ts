"use client"

import { useEffect, useRef } from "react"

export function useScrollTrap(isActive: boolean) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isActive) return

    const handleWheel = (e: WheelEvent) => {
      const container = containerRef.current
      if (!container) return

      // Check if the scroll target is inside our container
      const isInside = container.contains(e.target as Node)

      if (isInside) {
        // Calculate if we can scroll in the requested direction
        const { scrollTop, scrollHeight, clientHeight } = container
        const isScrollable = scrollHeight > clientHeight

        if (!isScrollable) {
          e.preventDefault()
          return
        }

        const isAtTop = scrollTop === 0
        const isAtBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 1
        const isScrollingUp = e.deltaY < 0
        const isScrollingDown = e.deltaY > 0

        // If we are at the boundary and trying to scroll past it, prevent default (parent scroll)
        if ((isAtTop && isScrollingUp) || (isAtBottom && isScrollingDown)) {
          e.preventDefault()
        }
        // Otherwise, let it scroll naturally
        e.stopPropagation() // Stop it from bubbling to parents
      } else {
        // If scrolling outside the container while active, prevent it
        e.preventDefault()
      }
    }

    // Add listener to window with passive: false to allow preventDefault
    window.addEventListener("wheel", handleWheel, { passive: false })

    return () => {
      window.removeEventListener("wheel", handleWheel)
    }
  }, [isActive])

  return containerRef
}
