import authRouter from '@module/auth/routes'
import productRouter from '@module/products/routes'
import usersRouter from '@module/users/routes'
import costumerRouter from '@module/customers/routes'
import { Router } from 'express'

const routes = Router()

routes.use('/products', productRouter)
routes.use('/users', usersRouter)
routes.use('/auth', authRouter)
routes.use('/costumer', costumerRouter)

export default routes
