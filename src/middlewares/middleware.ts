import AppError from '@shared/exceptions/AppError'
import { Request, Response } from 'express'

class Middleware {
  public errorHandler(error: Error, req: Request, res: Response) {
    if (error instanceof AppError) {
      console.log(error)
      return res.json({ error: error.code, message: error.message })
    }
    console.error(error)
    return res.json({ error: 500, message: 'Internal Server Error' })
  }
}

export default new Middleware()
