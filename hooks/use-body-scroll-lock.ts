"use client"

import { useEffect, useRef, useState } from "react"

export function useBodyScrollLock() {
  const [isLocked, setIsLocked] = useState(false)
  
  // Store original values to restore later
  const originalStyle = useRef<{ overflow: string; paddingRight: string } | null>(null)

  useEffect(() => {
    if (isLocked) {
      // 1. Calculate scrollbar width
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
      
      // 2. Save original styles
      originalStyle.current = {
        overflow: document.body.style.overflow,
        paddingRight: document.body.style.paddingRight
      }

      // 3. Apply locking styles
      // We apply to body. Some browsers might need html too, but usually body is enough for modern apps.
      document.body.style.overflow = "hidden"
      
      // Only add padding if there was a scrollbar
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`
      }
    } else {
      // Restore styles
      if (originalStyle.current) {
        document.body.style.overflow = originalStyle.current.overflow
        document.body.style.paddingRight = originalStyle.current.paddingRight
        originalStyle.current = null
      }
    }

    // Cleanup on unmount
    return () => {
      if (originalStyle.current) {
        document.body.style.overflow = originalStyle.current.overflow
        document.body.style.paddingRight = originalStyle.current.paddingRight
      }
    }
  }, [isLocked])

  const lock = () => setIsLocked(true)
  const unlock = () => setIsLocked(false)

  return { isLocked, lock, unlock }
}
