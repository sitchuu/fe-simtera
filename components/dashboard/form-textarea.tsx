"use client"

import * as React from "react"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

interface FormTextareaProps extends React.ComponentProps<typeof Textarea> {}

export function FormTextarea({ className, ...props }: FormTextareaProps) {
  return (
    <Textarea
      className={cn(
        "resize-none border-gray-300 focus-visible:border-blue-500 focus-visible:ring-blue-500/20 focus-visible:ring-[3px] min-h-[100px]",
        className
      )}
      {...props}
    />
  )
}
