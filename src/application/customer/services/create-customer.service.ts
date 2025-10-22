import { Injectable } from '@nestjs/common';
import { ConflictException } from 'src/common/filters/errors/conflict-error';
import { CustomerRepository } from '../../../infra/database/prisma/repositories/customer.repository';
import {
  CreateCustomerRequest,
  CreateCustomerResponse,
} from '../dto/create-customer.dto';

@Injectable()
export class CreateCustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async create(data: CreateCustomerRequest): Promise<CreateCustomerResponse> {
    const existingCustomer = await this.customerRepository.findByEmail(
      data.email,
    );

    if (existingCustomer) {
      throw new ConflictException();
    }

    const newCustomer = await this.customerRepository.create(data);

    return {
      id: newCustomer.id,
      name: newCustomer.name,
      email: newCustomer.email,
      document: newCustomer.document,
      phone: newCustomer.phone,
      created_at: newCustomer.created_at,
      updated_at: newCustomer.updated_at ?? null,
    };
  }
}
