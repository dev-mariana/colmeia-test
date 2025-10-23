import { Injectable } from '@nestjs/common';
import { NotFoundException } from 'src/common/filters/errors/not-found-error';
import { ChargeStatus } from 'src/domain/charge/charge.entity';
import { ChargeRepository } from 'src/infra/database/prisma/repositories/charge.repository';
import { CustomerRepository } from 'src/infra/database/prisma/repositories/customer.repository';
import {
  CreateChargeRequest,
  CreateChargeResponse,
} from '../dto/create-charge.dto';

@Injectable()
export class CreateChargeService {
  constructor(
    private readonly chargeRepository: ChargeRepository,
    private readonly customerRepository: CustomerRepository,
  ) {}

  async create(data: CreateChargeRequest): Promise<CreateChargeResponse> {
    const customer = await this.customerRepository.findById(data.customer_id);

    if (!customer) {
      throw new NotFoundException('Customer not found.');
    }

    const newCharge = await this.chargeRepository.create({
      amount: data.amount,
      currency: data.currency,
      customer_id: data.customer_id,
      payment_method: data.payment_method,
      due_date: data.due_date || undefined,
      status: ChargeStatus.PENDING,
      installments: data.installments || undefined,
    });

    return {
      id: newCharge.id,
      amount: newCharge.amount,
      currency: newCharge.currency,
      customer_id: newCharge.customer_id,
      payment_method: newCharge.payment_method,
      status: newCharge.status,
      due_date: newCharge.due_date || null,
      installments: newCharge.installments || null,
      created_at: newCharge.created_at,
      updated_at: newCharge.updated_at || null,
    };
  }
}
