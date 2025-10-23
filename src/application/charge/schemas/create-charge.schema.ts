import { z } from 'zod';

export const createChargeSchema = z.object({
  amount: z.number().positive(),
  currency: z.string().min(1),
  customer_id: z.string().min(1, 'customerId is required'),
  payment_method: z.enum(['Pix', 'Credit Card', 'Boleto']),
  due_date: z.string().datetime().optional(),
  installments: z.number().int().positive().optional(),
});

export type CreateChargeSchema = z.infer<typeof createChargeSchema>;
