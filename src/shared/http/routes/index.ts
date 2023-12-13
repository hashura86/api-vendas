import authRouter from '@module/auth/routes'
import productRoutes from '@module/products/routes'
import usersRouter from '@module/users/routes'
import { Router } from 'express'

const routes = Router()

routes.use('/products', productRoutes)
routes.use('/users', usersRouter)
routes.use('/auth', authRouter)

export default routes
