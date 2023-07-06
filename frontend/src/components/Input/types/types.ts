import { ReactNode } from "react"

export interface IInputProps {
  placeholder: string
  type: 'password' | 'date' | 'text' | 'number'
  error?: string
  icon?: ReactNode
  autoComplete?: string
}