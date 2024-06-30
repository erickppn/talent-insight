interface CardContentProps {
  children: JSX.Element | JSX.Element[];
}

export function CardContent({ children }: CardContentProps) {
  return (
    <div className="flex flex-col gap-3">
      {children}
    </div>
  )
}