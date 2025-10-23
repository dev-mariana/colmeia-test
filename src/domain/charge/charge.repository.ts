import { Charge } from './charge.entity';

export interface IChargeRepository {
  create(data: Partial<Charge>): Promise<Charge>;
}
