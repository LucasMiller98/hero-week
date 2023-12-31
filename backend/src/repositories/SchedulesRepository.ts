import { endOfDay, startOfDay } from "date-fns";
import { prisma } from "../database/prisma";
import { ICreateSchedules } from '../interfaces/SchedulesInterface'

export class SchedulesRepository {
  async create({ name, phone, date, user_id }: ICreateSchedules) {
    
    const result = await prisma.schedule.create({
      data: {
        name, 
        phone, 
        date,
        user_id
      }
    })

    return result
  }

  async findSchedule(date: Date, user_id: string) {
    const result = await prisma.schedule.findFirst({
      where: {
        date,
        user_id
      }
    })

    return result
  }

  async findAll(date: Date) {
    const result = await prisma.schedule.findMany({
      where: {
        date: {
          gte: startOfDay(date),
          lt: endOfDay(date),
        },
      },
      orderBy: {
        date: 'asc',
      },
    });
    return result;
  }

  async update(id: string, date: Date) {
    const updateSchedule = await prisma.schedule.update({
      where: {
        id
      },
      data: {
        date
      }
    })

    return updateSchedule
  }
}