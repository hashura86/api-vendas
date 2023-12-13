import AppError from '@shared/exceptions/AppError'
import { compare } from 'bcryptjs'
import { getCustomRepository } from 'typeorm'
import User from '../../users/typeorm/entities/User'
import UserRepository from '../../users/typeorm/repositories/UserRepository'
import { sign } from 'jsonwebtoken'
import authConfig from '@config/auth'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: User
  token: string
}

class AuthService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const userRepository = getCustomRepository(UserRepository)
    const user = await userRepository.findByEmail(email)

    if (!user) throw new AppError('Incorrect email/password combination.', 401)

    const passwordConfirmed = await compare(password, user.password)

    if (!passwordConfirmed) throw new AppError('Incorrect email/password combination.', 401)

    const token = sign({ id: user.id }, authConfig.jwt.secret, {
      expiresIn: authConfig.jwt.expiresIn,
    })

    return { user, token }
  }
}

export default AuthService
