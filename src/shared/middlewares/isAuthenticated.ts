import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import AppError from '@shared/exceptions/AppError'
import authConfig from '@config/auth'

interface ITokenPayload {
  id: string
  iat: number
  exp: number
}

export default function isAuthenticated(req: Request, res: Response, next: NextFunction): void {
  const authorization = req.headers.authorization

  if (!authorization) throw new AppError('JWT Token is missing.')

  const decodedToken: ITokenPayload | any = verify(authorization, authConfig.jwt.secret)

  req.idUser = decodedToken.id

  return next()
}
