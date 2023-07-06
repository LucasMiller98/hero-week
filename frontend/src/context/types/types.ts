import { ReactNode } from 'react'

export interface IAuthContext {
  children: ReactNode
}

export interface IAuthContextData {
  signIn: ({ email, password }: ISignIn) => void
  signOut: () => void
  user: IUserData
  availableSchedules: Array<string>
}

export interface IUserData {
  name: string
  avatar_url: string
  email: string
}

export interface ISignIn {
  email: string
  password: string
}
