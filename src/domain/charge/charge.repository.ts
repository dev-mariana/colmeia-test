import { Charge } from './charge.entity';

export interface IChargeRepository {
  create(data: Partial<Charge>): Promise<Charge>;
  findByIdempotencyKey(idempotency_key: string): Promise<Charge | null>;
}
