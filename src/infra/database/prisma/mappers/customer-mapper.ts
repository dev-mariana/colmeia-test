import { Customer } from 'src/domain/customer/customer.entity';
import { Customer as RawCustomer } from '../../../../../generated/prisma';

export class CustomerMapper {
  static toPrisma(customer: Customer) {
    return {
      id: customer.id,
      name: customer.name,
      email: customer.email,
      document: customer.document,
      phone: customer.phone,
      created_at: customer.created_at,
      updated_at: customer.updated_at,
    };
  }

  static toDomain(raw: RawCustomer): Customer {
    return {
      id: raw.id,
      name: raw.name,
      email: raw.email,
      document: raw.document,
      phone: raw.phone ?? undefined,
      created_at: raw.created_at,
      updated_at: raw.updated_at,
    };
  }
}
