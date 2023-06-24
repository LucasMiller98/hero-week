import { NextFunction, Request, Response } from "express";
import { IRequestSchedules } from "../interfaces/SchedulesInterface";
import { SchedulesService } from '../service/SchedulesService'
import { parseISO } from 'date-fns'

export class SchedulesController {

  private schedulesService: SchedulesService

  constructor() {
    this.schedulesService = new SchedulesService()
  }

  async store(req: Request, res: Response, next: NextFunction) {

    const { name, phone, date } = req.body as IRequestSchedules
    const { user_id } = req
    
    try {

      const serviceCreate = await this.schedulesService.create({ 
        name, 
        phone, 
        date,
        user_id
      })

      return res.status(201).json(serviceCreate)
      
    } catch (error) {
      next(error)
    }
  }

  async index(req: Request, res: Response, next: NextFunction) {

    const { date } = req.query
    const parseDate = date ? parseISO(date.toString()) : new Date()
    
    try {
      const listSchedules = await this.schedulesService.index(parseDate)

      return res.json(listSchedules)
    } catch (error) {
      next(error)
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    const { date } = req.body
    const { user_id } = req

    try {
      const updateSchedule = await this.schedulesService.update(
        id, 
        date, 
        user_id
      )

      return res.json(updateSchedule)

    } catch (error) {
      next(error)
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {

  }
}