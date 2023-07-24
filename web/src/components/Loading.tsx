import { CircleNotch } from 'phosphor-react';
interface LoadingProps {
  size?: number,
}
 
export function Loading({ size }: LoadingProps) {
  return (
    <CircleNotch size={size || 24} weight="bold" className="animate-spin" />
  )
}