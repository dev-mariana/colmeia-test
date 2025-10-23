import { z } from 'zod';

export const createCustomerSchema = z.object({
  name: z.string().min(7).max(50),
  email: z.string().email(),
  document: z
    .string()
    .regex(
      /^\d{11}$|^\d{14}$/,
      'Document must be 11 (CPF) or 14 (CNPJ) digits.',
    ),
  phone: z.string().min(11).max(11).optional(),
});

export type CreateCustomerSchema = z.infer<typeof createCustomerSchema>;
