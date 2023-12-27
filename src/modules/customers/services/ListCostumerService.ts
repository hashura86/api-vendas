import { getCustomRepository } from 'typeorm'
import Customer from '../typeorm/entities/customer'
import CustomersRepository from '../typeorm/repositories/CustomerRepository'

class ListCustomerService {
  public async execute(): Promise<Customer[]> {
    const customersRepository = getCustomRepository(CustomersRepository)
    const customers = customersRepository.find()
    return customers
  }
}

export default ListCustomerService
