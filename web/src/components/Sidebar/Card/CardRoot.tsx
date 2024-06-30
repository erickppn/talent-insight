import { ReactNode } from "react"

interface CardRootProps {
  children: ReactNode,
}

export function CardRoot({ children }: CardRootProps) {
  return (
    <section className="px-4 py-6 bg-white dark:bg-black rounded-xl overflow-hidden">
      {children}
    </section>
  )
}