import authRouter from '@module/auth/routes'
import productRouter from '@module/products/routes'
import usersRouter from '@module/users/routes'
import customerRouter from '@module/customers/routes'
import orderRouter from '@module/orders/routes'
import { Router } from 'express'

const routes = Router()

routes.use('/products', productRouter)
routes.use('/users', usersRouter)
routes.use('/auth', authRouter)
routes.use('/customer', customerRouter)
routes.use('/order', orderRouter)

export default routes
