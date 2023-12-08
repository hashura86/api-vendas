import { getCustomRepository } from 'typeorm'
import Product from '../typeorm/entities/Product'
import { ProductRepository } from '../typeorm/repositories/ProductsRepository'
import AppError from '@shared/exceptions/AppError'

interface IRequest {
  id: string
}

class GetProductService {
  public async execute({ id }: IRequest): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository)
    const product = await productRepository.findOne(id)
    if (!product) throw new AppError('product not found')
    return product
  }
}
export default GetProductService
