import { Injectable } from '@nestjs/common';
import { Customer } from 'src/domain/customer/customer.entity';
import { ICustomerRepository } from 'src/domain/customer/customer.repository';
import { CustomerMapper } from '../mappers/customer-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CustomerRepository implements ICustomerRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Partial<Customer>): Promise<Customer> {
    const createdCustomer = await this.prisma.customer.create({
      data: {
        name: data.name ?? '',
        email: data.email ?? '',
        document: data.document ?? '',
        phone: data.phone ?? null,
      },
    });

    return CustomerMapper.toDomain(createdCustomer);
  }

  async findByEmail(email: string): Promise<Customer | null> {
    const customer = await this.prisma.customer.findUnique({
      where: { email },
    });

    if (!customer) return null;

    return CustomerMapper.toDomain(customer);
  }

  async findById(id: string): Promise<Customer | null> {
    const customer = await this.prisma.customer.findUnique({
      where: { id },
    });

    if (!customer) return null;

    return CustomerMapper.toDomain(customer);
  }
}
