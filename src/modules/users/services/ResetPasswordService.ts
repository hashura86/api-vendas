import AppError from '@shared/exceptions/AppError'
import { getCustomRepository } from 'typeorm'
import UserTokenRepository from '../typeorm/repositories/UserTokenRepository'
import UserRepository from '../typeorm/repositories/UserRepository'
import { isAfter, addHours } from 'date-fns'
import { hash } from 'bcryptjs'

interface IRequest {
  token: string
  password: string
}

class ResetPasswordService {
  public async execute({ token, password }: IRequest): Promise<void> {
    const userRepository = getCustomRepository(UserRepository)
    const userTokensRepository = getCustomRepository(UserTokenRepository)

    const userToken = await userTokensRepository.findByToken(token)
    if (!userToken) throw new AppError('token not found!')

    const user = await userRepository.findById(userToken.user_id)
    if (!user) throw new AppError('user not found!')

    const tokenCreatedAt = userToken.created_at
    const compareDate = addHours(tokenCreatedAt, 2)

    if (isAfter(Date.now(), compareDate)) throw new AppError('expired token')

    user.password = await hash(password, 8)

    await userRepository.save(user)
  }
}

export default ResetPasswordService
