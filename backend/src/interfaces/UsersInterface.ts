export interface IRequestCreateUsers {
  email: string
  password: string
  name: string
}

export interface ICreateUsers {
  name: string
  email: string
  password: string
}

export interface IAuth {
  email: string
  password: string
}

export interface IUpdateUser {
  name: string
  oldPassword: string
  newPassword: string
  avatar_url?: FileUpload
  user_id: string
}

interface FileUpload {
  fieldname: string
  originalname: string
  encoding: string,
  mimetype: string,
  buffer: Buffer
  size: number
}

export interface Ipayload {
  sub: string
}
