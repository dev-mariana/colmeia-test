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
        amount: data?.amount ?? 0,
        currency: data.currency ?? '',
        customer: {
          connect: { id: data.customer_id },
        },
        payment_method: data.payment_method ?? '',
        status: data.status ?? '',
        due_date: data.due_date ?? '',
        installments: data.installments ?? 0,
      },
    });

    return ChargeMapper.toDomain(createdCharge);
  }
}
