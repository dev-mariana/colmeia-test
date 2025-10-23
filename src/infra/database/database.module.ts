import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { ChargeRepository } from './prisma/repositories/charge.repository';
import { CustomerRepository } from './prisma/repositories/customer.repository';

@Module({
  imports: [],
  providers: [PrismaService, CustomerRepository, ChargeRepository],
  exports: [PrismaService, CustomerRepository, ChargeRepository],
})
export class DatabaseModule {}
