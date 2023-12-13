import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import AppError from '@shared/exceptions/AppError'
import authConfig from '@config/auth'

interface TokenPayload {
  iat: number
  exp: number
  sub: string
}

export default function isAuthenticated(req: Request, res: Response, next: NextFunction): void {
  const authorization = req.headers.authorization

  if (!authorization) throw new AppError('JWT Token is missing.')

  try {
    const decodedToken = verify(authorization, authConfig.jwt.secret)

    const { sub } = decodedToken as TokenPayload

    req.idUser = sub

    return next()
  } catch {
    throw new AppError('Invalid JWT Token.')
  }
}
