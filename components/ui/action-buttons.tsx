"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Plus, Save, ChevronRight, ChevronLeft, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Props untuk action buttons
 */
interface ActionButtonProps extends React.ComponentPropsWithoutRef<typeof Button> {
  /** Teks yang ditampilkan pada button */
  label?: string
  /** Tampilkan loading spinner */
  loading?: boolean
  /** Custom children (override label) */
  children?: React.ReactNode
}

/**
 * Button untuk menyimpan data
 * @example
 * <SaveButton onClick={handleSave} />
 * <SaveButton label="Simpan Draft" loading={isLoading} />
 */
export function SaveButton({ 
  label = "Simpan", 
  loading = false, 
  className,
  disabled,
  ...props 
}: ActionButtonProps) {
  return (
    <Button 
      className={cn(
        "bg-blue-500 hover:bg-blue-600 text-white",
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Save className="mr-2 h-4 w-4" />
      )}
      {label}
    </Button>
  )
}

/**
 * Button untuk navigasi ke step selanjutnya
 * @example
 * <NextButton onClick={handleNext} />
 * <NextButton label="Lanjutkan" />
 */
export function NextButton({ 
  label = "Selanjutnya", 
  loading = false,
  className,
  disabled,
  ...props 
}: ActionButtonProps) {
  return (
    <Button 
      className={cn(
        "bg-blue-500 hover:bg-blue-600 text-white",
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <>
          {label}
          <ChevronRight className="ml-1 h-4 w-4" />
        </>
      )}
    </Button>
  )
}

/**
 * Button untuk kembali ke step sebelumnya
 * @example
 * <BackButton onClick={handleBack} />
 */
export function BackButton({ 
  label = "Kembali", 
  className,
  ...props 
}: ActionButtonProps) {
  return (
    <Button 
      variant="outline"
      className={cn(className)}
      {...props}
    >
      <ChevronLeft className="mr-1 h-4 w-4" />
      {label}
    </Button>
  )
}

/**
 * Button untuk menambah item baru
 * @example
 * <AddButton onClick={handleAdd} label="Tambah Sasaran" />
 * <AddButton onClick={handleAdd}>Tambah Data Baru</AddButton>
 */
export function AddButton({ 
  label = "Tambah", 
  children,
  loading = false,
  className,
  disabled,
  ...props 
}: ActionButtonProps) {
  return (
    <Button 
      className={cn(
        "bg-blue-500 hover:bg-blue-600 text-white shadow-md",
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Plus className="mr-2 h-4 w-4" />
      )}
      {children || label}
    </Button>
  )
}
