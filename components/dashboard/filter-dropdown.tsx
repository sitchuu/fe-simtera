"use client"

import * as React from "react"
import { Check, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface FilterDropdownProps {
  label: string
  value?: string
  options: string[]
  onSelect: (value: string) => void
  className?: string
}

export function FilterDropdown({
  label,
  value,
  options,
  onSelect,
  className,
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  // Close on click outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
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
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="outline"
        className={cn("bg-white hover:bg-zinc-50 font-normal gap-2 justify-between min-w-[120px]", className)}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="truncate">{value || label}</span>
        <ChevronDown className={cn("h-4 w-4 text-zinc-500 transition-transform duration-200", isOpen && "rotate-180")} />
      </Button>

      {isOpen && (
        <div 
          className="absolute top-full left-0 mt-1 w-full min-w-[160px] max-h-[300px] overflow-y-auto overscroll-contain rounded-md border border-zinc-200 bg-white p-1 shadow-lg z-50 animate-in fade-in-0 zoom-in-95 duration-100"
          onWheel={handleWheel}
        >
          {options.map((option) => (
            <button
              key={option}
              className={cn(
                "relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none hover:bg-zinc-100 focus:bg-zinc-100",
                value === option && "bg-zinc-50 font-medium"
              )}
              onClick={() => {
                onSelect(option)
                setIsOpen(false)
              }}
            >
              <span className="truncate">{option}</span>
              {value === option && (
                <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
                  <Check className="h-4 w-4 text-zinc-600" />
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
