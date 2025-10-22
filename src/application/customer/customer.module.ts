import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/database/database.module';
import { CreateCustomerController } from './controllers/create-customer.controller';
import { CreateCustomerService } from './services/create-customer.service';

@Module({
  imports: [DatabaseModule],
  controllers: [CreateCustomerController],
  providers: [CreateCustomerService],
})
export class CustomerModule {}
