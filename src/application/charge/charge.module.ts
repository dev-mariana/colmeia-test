import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/database/database.module';
import { CreateChargeController } from './controllers/create-charge.controller';
import { CreateChargeService } from './services/create-charge.service';

@Module({
  imports: [DatabaseModule],
  controllers: [CreateChargeController],
  providers: [CreateChargeService],
})
export class ChargeModule {}
