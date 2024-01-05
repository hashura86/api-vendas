import { EntityRepository, In, Repository } from 'typeorm'
import Product from '../entities/Product'

interface IProducts {
  id: string
}
@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  public async findByName(name: string): Promise<Product | undefined> {
    return this.findOne({ where: { name } })
  }

  public async findAllByIds(products: IProducts[]): Promise<Product[]> {
    const idProducts = products.map(product => product.id)
    return await this.find({ where: { id: In(idProducts) } })
  }
}
