import { ICreateSchedules } from "../interfaces/SchedulesInterface";
import { SchedulesRepository } from '../repositories/SchedulesRepository'
import { getHours, isBefore, startOfHour } from 'date-fns'

export class SchedulesService {
  
  private schedulesRepository: SchedulesRepository

  constructor() {
    this.schedulesRepository = new SchedulesRepository()
  }
  
  async create({ name, phone, date, user_id }: ICreateSchedules) {
    
    const dateFormatted = new Date(date)

    const hourStart = startOfHour(dateFormatted)

    const hour = getHours(hourStart)

    if(hour <= 9 || hour >= 19) {
      throw new Error('Create schedule between 9 and 19')
    }

    if(isBefore(hourStart, new Date())) {
      throw new Error('It is not allowed to schedule old date.')
    }

    const checkIsAvailable = await this.schedulesRepository.findSchedule(
      hourStart, 
      user_id
    )

    if(checkIsAvailable) {
      throw new Error('Schedule date is not available')
    }

    const createSchedule = await this.schedulesRepository.create({
      name, 
      phone, 
      date: hourStart,
      user_id 
    })

    return createSchedule
  }

  async index(date: Date) {
    const listSchedules = await this.schedulesRepository.findAllSchedules(date)
    console.log(listSchedules)

    return listSchedules
  }

  async update(id: string, date: Date, user_id: string) {
    const dateFormatted = new Date(date)
    const hourStart = startOfHour(dateFormatted)

    if(isBefore(hourStart, new Date())) {
      throw new Error('It is not allowed to schedule old date.')
    }

    const checkIsAvailable = await this.schedulesRepository.findSchedule(
      hourStart,
      user_id
    )

    if(checkIsAvailable) {
      throw new Error('Schedule date is not available')
    }

    const updateSchedule = await this.schedulesRepository.update(id, date)    

    return updateSchedule
  }

  async delete() {

  }
}