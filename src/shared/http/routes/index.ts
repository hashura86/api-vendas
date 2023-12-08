import productRoutes from '@module/products/routes'
import { Router } from 'express'

const routes = Router()

routes.use('/products', productRoutes)

export default routes
