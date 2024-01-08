import { getCustomRepository } from 'typeorm'
import { ProductRepository } from '../typeorm/repositories/ProductsRepository'
import AppError from '@shared/exceptions/AppError'
import RedisCache from '@shared/cache/RedisCache'

interface IRequest {
  id: string
}

class DeleteProductService {
  public async execute({ id }: IRequest): Promise<void> {
    const productRepository = getCustomRepository(ProductRepository)
    const product = await productRepository.findOne(id)
    if (!product) throw new AppError('product not found')

    const redisCache = new RedisCache()
    await redisCache.invalidate('api-vendas-product-list')

    await productRepository.remove(product)
  }
}
export default DeleteProductService
