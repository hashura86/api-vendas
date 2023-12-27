import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import UserController from '../controllers/UserController'
import isAuthenticated from '@shared/middlewares/isAuthenticated'
import uploadConfig from '@config/upload'
import multer from 'multer'
import UserAvatarController from '../controllers/UserAvatarController'
import ForgotPasswordController from '../controllers/ForgotPasswordController'
import ResetPasswordController from '../controllers/ResetPasswordController'
import ProfileController from '../controllers/ProfileController'

const upload = multer(uploadConfig)

const usersRouter = Router()
const usersController = new UserController()
const usersAvatarController = new UserAvatarController()
const forgotPasswordController = new ForgotPasswordController()
const resetPasswordController = new ResetPasswordController()
const profileController = new ProfileController()

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

usersRouter.get('/list-user', isAuthenticated, profileController.show)

usersRouter.put(
  '/edit-profile',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string().optional(),
      password_confirmation: Joi.string().valid(Joi.ref('password')).when('password', {
        is: Joi.exist(),
        then: Joi.required(),
      }),
    },
  }),
  profileController.update,
)

export default usersRouter
