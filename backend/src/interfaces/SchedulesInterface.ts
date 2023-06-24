export interface IRequestSchedules {
  name: string
  phone: string
  date: Date
}

export interface ICreateSchedules extends IRequestSchedules {
  user_id: string
}