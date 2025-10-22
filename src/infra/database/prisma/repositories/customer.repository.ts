import { Injectable } from '@nestjs/common';
import { Customer } from 'src/domain/customer/customer.entity';
import { ICustomerRepository } from 'src/domain/customer/customer.repository';
import { CustomerMapper } from '../mappers/customer-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CustomerRepository implements ICustomerRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(customer: Partial<Customer>): Promise<Customer> {
    const createdCustomer = await this.prisma.customer.create({
      data: {
        name: customer?.name ?? '',
        email: customer?.email ?? '',
        document: customer?.document ?? '',
        phone: customer?.phone ?? '',
      },
    });

    return CustomerMapper.toDomain(createdCustomer);
  }

  async findByEmail(email: string): Promise<Customer | null> {
    const customer = await this.prisma.customer.findUnique({
      where: { email },
    });

    if (!customer) {
      return null;
    }

    return CustomerMapper.toDomain(customer);
  }
}
