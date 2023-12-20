import AppError from '@shared/exceptions/AppError'
import { getCustomRepository } from 'typeorm'
import UserRepository from '../typeorm/repositories/UserRepository'
import UserTokenRepository from '../typeorm/repositories/UserTokenRepository'
import EtherealMail from '@config/mail/EtherealMail'

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

    await EtherealMail.sendEmail({
      to: email,
      body: `change password requested successfully: ${token?.token}`,
    })
  }
}

export default ForgotPasswordService
