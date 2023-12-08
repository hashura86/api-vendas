import { getCustomRepository } from 'typeorm'
import { ProductRepository } from '../typeorm/repositories/ProductsRepository'
import AppError from '@shared/exceptions/AppError'

interface IRequest {
  id: string
}

class DeleteProductService {
  public async execute({ id }: IRequest): Promise<void> {
    const productRepository = getCustomRepository(ProductRepository)
    const product = await productRepository.findOne(id)
    if (!product) throw new AppError('product not found')

    await productRepository.remove(product)
  }
}
export default DeleteProductService
