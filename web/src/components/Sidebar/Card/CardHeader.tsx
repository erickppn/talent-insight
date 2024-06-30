import { ReactNode } from "react"

interface CardHeaderProps {
  children: ReactNode,
}

export function CardHeader({ children }: CardHeaderProps) {
  return (
    <div className="flex items-center gap-2 mt-1 mb-6">
      {children}
    </div>
  )
}