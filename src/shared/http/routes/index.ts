import productRoutes from '@module/products/routes'
import usersRouter from '@module/users/routes'
import { Router } from 'express'

const routes = Router()

routes.use('/products', productRoutes)
routes.use('/users', usersRouter)

export default routes
