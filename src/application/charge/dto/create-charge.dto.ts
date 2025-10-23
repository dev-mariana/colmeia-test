import { ApiProperty } from '@nestjs/swagger';
import { ChargeStatus, PaymentMethod } from 'src/domain/charge/charge.entity';

export class CreateChargeRequest {
  @ApiProperty({
    description: 'Valor da cobrança',
    example: 100.5,
    minimum: 0.01,
  })
  amount: number;

  @ApiProperty({
    description: 'Código da moeda (ISO 4217)',
    example: 'BRL',
    minLength: 3,
    maxLength: 3,
  })
  currency: string;

  @ApiProperty({
    description: 'ID do cliente',
    example: 'clxxx123',
  })
  customer_id: string;

  @ApiProperty({
    description: 'Método de pagamento',
    enum: ['Pix', 'Credit Card', 'Boleto'],
    example: 'Pix',
  })
  payment_method: PaymentMethod;

  @ApiProperty({
    description: 'Número de parcelas (obrigatório para Credit Card)',
    example: 3,
    required: false,
  })
  installments?: number | null;

  @ApiProperty({
    description: 'Data de vencimento (obrigatório para Boleto)',
    example: '2025-10-30T00:00:00.000Z',
    required: false,
  })
  due_date?: Date | null;
}

export class CreateChargeResponse {
  @ApiProperty({
    description: 'ID único da cobrança',
    example: 'clyyy789def012',
  })
  id: string;

  @ApiProperty({
    description: 'Valor da cobrança',
    example: 150.75,
  })
  amount: number;

  @ApiProperty({
    description: 'Código da moeda',
    example: 'BRL',
  })
  currency: string;

  @ApiProperty({
    description: 'ID do cliente',
    example: 'clxxx123abc456',
  })
  customer_id: string;

  @ApiProperty({
    description: 'Método de pagamento',
    enum: ['Pix', 'Credit Card', 'Boleto'],
    example: 'Credit Card',
  })
  payment_method: PaymentMethod;

  @ApiProperty({
    description: 'Status da cobrança',
    enum: ['PENDING', 'PAID', 'FAILED', 'EXPIRED'],
    example: 'PENDING',
  })
  status: ChargeStatus;

  @ApiProperty({
    description: 'Número de parcelas',
    example: 3,
    nullable: true,
  })
  installments: number | null;

  @ApiProperty({
    description: 'Data de vencimento',
    example: '2025-10-30T00:00:00.000Z',
    nullable: true,
  })
  due_date: Date | null;

  @ApiProperty({
    description: 'Data de criação',
    example: '2025-10-23T19:30:00.000Z',
  })
  created_at: Date;

  @ApiProperty({
    description: 'Data de atualização',
    example: '2025-10-23T19:30:00.000Z',
    nullable: true,
  })
  updated_at: Date | null;
}
