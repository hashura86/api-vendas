import { getCustomRepository } from 'typeorm'
import Customer from '../typeorm/entities/customer'
import CustomersRepository from '../typeorm/repositories/CustomerRepository'

interface IPaginateCustomer {
  from: number
  to: number
  per_page: number
  total: number
  current_page: number
  next_page: number | null
  prev_page: number | null
  data: Customer[]
}

class ListCustomerService {
  public async execute(): Promise<IPaginateCustomer> {
    const customersRepository = getCustomRepository(CustomersRepository)
    return (await customersRepository.createQueryBuilder().paginate()) as IPaginateCustomer
  }
}

export default ListCustomerService
