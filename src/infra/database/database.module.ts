import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { CustomerRepository } from './prisma/repositories/customer.repository';

@Module({
  imports: [],
  providers: [PrismaService, CustomerRepository],
  exports: [PrismaService, CustomerRepository],
})
export class DatabaseModule {}
