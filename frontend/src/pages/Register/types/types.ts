import { IFormValues } from '../../Login/types/types'

export interface IFormRegister extends IFormValues {
  name: string
}

export interface ICreateUsers {
  email: string
  password: string
  name: string
  avatar_url: string
}