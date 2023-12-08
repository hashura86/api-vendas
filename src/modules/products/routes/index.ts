import { Router } from 'express'
import ProductController from '../controllers/ProductController'

const productController = new ProductController()

const productRoutes = Router()

productRoutes.post('/', productController.create)
productRoutes.get('/:id', productController.getOne)
productRoutes.get('/', productController.index)
productRoutes.put('/:id', productController.update)
productRoutes.delete('/:id', productController.delete)

export default productRoutes
