import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import UserController from '../controllers/UserController'
import isAuthenticated from '@shared/middlewares/isAuthenticated'
import uploadConfig from '@config/upload'
import multer from 'multer'
import UserAvatarController from '../controllers/UserAvatarController'
import ForgotPasswordController from '../controllers/ForgotPasswordController'
import ResetPasswordController from '../controllers/ResetPasswordController'

const upload = multer(uploadConfig)

const usersRouter = Router()
const usersController = new UserController()
const usersAvatarController = new UserAvatarController()
const forgotPasswordController = new ForgotPasswordController()
const resetPasswordController = new ResetPasswordController()

usersRouter.get('/', usersController.index)

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
)

usersRouter.patch('/avatar', isAuthenticated, upload.single('avatar'), usersAvatarController.update)

usersRouter.post(
  '/password',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  forgotPasswordController.create,
)

usersRouter.post(
  '/reset-password',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  resetPasswordController.create,
)



export default usersRouter
