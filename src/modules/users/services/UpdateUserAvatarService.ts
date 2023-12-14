import { getCustomRepository } from 'typeorm'
import User from '../typeorm/entities/User'
import UserRepository from '../typeorm/repositories/UserRepository'
import AppError from '@shared/exceptions/AppError'
import path from 'path'
import uploadConfig from '@config/uploads'
import fs from 'fs'

interface IRequest {
  idUser: string
  avatarPath: any
}

class UpdateUserAvatarService {
  public async execute({ idUser, avatarPath }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository)

    const user = await userRepository.findById(idUser)

    if (!user) throw new AppError('User not found!')

    if (!avatarPath || avatarPath.length == 0) throw new AppError('Image not found!')

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath)

      if (userAvatarFileExists) await fs.promises.unlink(userAvatarFilePath)
    }

    user.avatar = avatarPath

    await userRepository.save(user)

    return user
  }
}

export default UpdateUserAvatarService
