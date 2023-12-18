import { Request, Response } from 'express'
import ForgotPasswordService from '../services/ForgotPasswordService'

export default class ForgotPasswordController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email } = req.body

    const forgotPassword = new ForgotPasswordService()

    await forgotPassword.execute({ email })

    return res.json(true)
  }
}
