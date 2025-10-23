import {
  Charge,
  ChargeStatus,
  PaymentMethod,
} from 'src/domain/charge/charge.entity';
import { Charge as RawCharge } from '../../../../../generated/prisma';

export class ChargeMapper {
  static toPrisma(charge: Charge) {
    return {
      id: charge.id,
      amount: charge.amount,
      currency: charge.currency,
      customer_id: charge.customer_id,
      payment_method: charge.payment_method,
      status: charge.status,
      due_date: charge.due_date,
      installments: charge.installments,
      created_at: charge.created_at,
      updated_at: charge.updated_at,
    };
  }

  static toDomain(raw: RawCharge): Charge {
    return {
      id: raw.id,
      amount: raw.amount,
      currency: raw.currency,
      customer_id: raw.customer_id,
      payment_method: raw.payment_method as PaymentMethod,
      status: raw.status as ChargeStatus,
      due_date: raw.due_date ?? undefined,
      installments: raw.installments ?? undefined,
      created_at: raw.created_at,
      updated_at: raw.updated_at,
    };
  }
}
