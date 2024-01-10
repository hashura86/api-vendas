import { getCustomRepository } from 'typeorm'
import { ProductRepository } from '../typeorm/repositories/ProductsRepository'
import AppError from '@shared/exceptions/AppError'
import Product from '../typeorm/entities/Product'
import redisCache from '@shared/cache/RedisCache'

interface IRequest {
  name: string
  price: number
  quantity: number
}

class CreateProductService {
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository)
    const productExists = await productRepository.findByName(name)
    if (productExists) throw new AppError('product already exists')

    const product = productRepository.create({ name, price, quantity })

    await redisCache.invalidate('api-vendas-product-list')

    await productRepository.save(product)
    return product
  }
}

export default CreateProductService
