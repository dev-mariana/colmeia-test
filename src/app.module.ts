import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ChargeModule } from './application/charge/charge.module';
import { CustomerModule } from './application/customer/customer.module';
import { DatabaseModule } from './infra/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    CustomerModule,
    ChargeModule,
  ],
})
export class AppModule {}
