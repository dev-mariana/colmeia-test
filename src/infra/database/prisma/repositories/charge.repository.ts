import { Injectable } from '@nestjs/common';
import { Charge } from 'src/domain/charge/charge.entity';
import { IChargeRepository } from 'src/domain/charge/charge.repository';
import { ChargeMapper } from '../mappers/charge-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ChargeRepository implements IChargeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Partial<Charge>): Promise<Charge> {
    const createdCharge = await this.prisma.charge.create({
      data: {
        amount: data.amount!,
        currency: data.currency!,
        customer: {
          connect: { id: data.customer_id! },
        },
        payment_method: data.payment_method!,
        status: data.status!,
        due_date: data.due_date || null,
        installments: data.installments || null,
        idempotency_key: data.idempotency_key || null,
      },
    });

    return ChargeMapper.toDomain(createdCharge);
  }

  async findByIdempotencyKey(idempotency_key: string): Promise<Charge | null> {
    const charge = await this.prisma.charge.findUnique({
      where: { idempotency_key },
    });

    if (!charge) return null;

    return ChargeMapper.toDomain(charge);
  }
}
