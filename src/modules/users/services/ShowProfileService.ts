import AppError from '@shared/exceptions/AppError'
import { getCustomRepository } from 'typeorm'
import UserRepository from '../typeorm/repositories/UserRepository'
import User from '../typeorm/entities/User'

interface IRequest {
  user_id: string
}

class ShowProfileService {
  public async execute({ user_id }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UserRepository)
    const user = await usersRepository.findById(user_id)
    if (!user) throw new AppError('User not found!')
    return user
  }
}

export default ShowProfileService
