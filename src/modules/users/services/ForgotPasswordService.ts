import AppError from '@shared/exceptions/AppError'
import { getCustomRepository } from 'typeorm'
import UserRepository from '../typeorm/repositories/UserRepository'
import UserTokenRepository from '../typeorm/repositories/UserTokenRepository'

interface IRequest {
  email: string
}

class ForgotPasswordService {
  public async execute({ email }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UserRepository)
    const userTokensRepository = getCustomRepository(UserTokenRepository)

    const user = await usersRepository.findByEmail(email)
    if (!user) throw new AppError('User not found!')

    const token = await userTokensRepository.generate(user.id)

    console.log(token)
  }
}

export default ForgotPasswordService
