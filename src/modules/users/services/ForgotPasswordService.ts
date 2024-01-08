import AppError from '@shared/exceptions/AppError'
import { getCustomRepository } from 'typeorm'
import UserRepository from '../typeorm/repositories/UserRepository'
import UserTokenRepository from '../typeorm/repositories/UserTokenRepository'
import EtherealMail from '@config/mail/EtherealMail'
import path from 'path'

interface IRequest {
  email: string
}

class ForgotPasswordService {
  public async execute({ email }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UserRepository)
    const userTokensRepository = getCustomRepository(UserTokenRepository)

    const user = await usersRepository.findByEmail(email)
    if (!user) throw new AppError('User not found!')

    const { token } = await userTokensRepository.generate(user.id)

    const forgotPasswordEmailTemplate = path.resolve(__dirname, '..', 'views', 'forgot_password.hbs')

    await EtherealMail.sendEmail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[PASSWORD RECOVERY]',
      templateData: {
        file: forgotPasswordEmailTemplate,
        variables: {
          name: user.name,
          link: `${process.env.WEB_URL}/reset_password?token=${token}`, //port 3000 before
        },
      },
    })
  }
}

export default ForgotPasswordService
