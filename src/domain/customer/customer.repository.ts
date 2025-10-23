import { Customer } from './customer.entity';

export interface ICustomerRepository {
  create(customer: Customer): Promise<Customer>;
  findByEmailOrDocument(
    email: string,
    document: string,
  ): Promise<Customer | null>;
  findById(id: string): Promise<Customer | null>;
}
