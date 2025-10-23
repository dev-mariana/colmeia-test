import { Injectable } from '@nestjs/common';
import { BadRequestException } from 'src/common/filters/errors/bad-request-error';
import { NotFoundException } from 'src/common/filters/errors/not-found-error';
import { ChargeStatus, PaymentMethod } from 'src/domain/charge/charge.entity';
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

  async create(
    data: CreateChargeRequest,
    idempotency_key?: string,
  ): Promise<CreateChargeResponse> {
    if (idempotency_key) {
      const existing =
        await this.chargeRepository.findByIdempotencyKey(idempotency_key);

      if (existing) {
        throw new BadRequestException('Duplicate charge request.');
      }
    }

    const customer = await this.customerRepository.findById(data.customer_id);

    if (!customer) {
      throw new NotFoundException('Customer not found.');
    }

    if (data.payment_method === PaymentMethod.BOLETO && !data.due_date) {
      throw new BadRequestException('Boleto requires due_date.');
    }

    if (
      data.payment_method === PaymentMethod.CREDIT_CARD &&
      !data.installments
    ) {
      throw new BadRequestException('Credit Card requires installments.');
    }

    const newCharge = await this.chargeRepository.create({
      amount: data.amount,
      currency: data.currency,
      customer_id: data.customer_id,
      payment_method: data.payment_method,
      due_date: data.due_date || undefined,
      status: ChargeStatus.PENDING,
      installments: data.installments || undefined,
      idempotency_key: idempotency_key || undefined,
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
