import { z } from 'zod';

export const createCustomerSchema = z.object({
  name: z.string().min(7).max(50),
  email: z.string().email(),
  document: z.string().min(11).max(14),
  phone: z.string().min(11).max(11).optional(),
});

export type CreateCustomerSchema = z.infer<typeof createCustomerSchema>;
