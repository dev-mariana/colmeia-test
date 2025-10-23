export class Charge {
  id: string;
  amount: number;
  currency: string;
  payment_method: PaymentMethod;
  status: ChargeStatus;
  customer_id: string;
  due_date?: Date;
  installments?: number;
  created_at: Date;
  updated_at?: Date | null;
}

export enum PaymentMethod {
  PIX = 'Pix',
  CREDIT_CARD = 'Credit Card',
  BOLETO = 'Boleto',
}

export enum ChargeStatus {
  PENDING = 'Pending',
  PAID = 'Paid',
  CANCELLED = 'Cancelled',
  EXPIRED = 'Expired',
}
