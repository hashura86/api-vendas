import { Request, Response } from 'express'
import CreateAuthService from '../services/AuthService'

export default class AuthController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body

    const createSession = new CreateAuthService()

    const user = await createSession.execute({ email, password })

    return res.json(user)
  }
}
