import { ChargeStatus, PaymentMethod } from 'src/domain/charge/charge.entity';

export class CreateChargeRequest {
  amount: number;
  currency: string;
  customer_id: string;
  payment_method: PaymentMethod;
  installments?: number | null;
  due_date?: Date | null;
}

export class CreateChargeResponse {
  id: string;
  amount: number;
  currency: string;
  customer_id: string;
  payment_method: PaymentMethod;
  status: ChargeStatus;
  installments: number | null;
  due_date: Date | null;
  created_at: Date;
  updated_at: Date | null;
}
