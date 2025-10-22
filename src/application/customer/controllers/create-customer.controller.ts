import { Body, Controller, Post } from '@nestjs/common';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import {
  CreateCustomerRequest,
  CreateCustomerResponse,
} from '../dto/create-customer.dto';
import { createCustomerSchema } from '../schemas/create-customer.schema';
import { CreateCustomerService } from '../services/create-customer.service';

@Controller('customers')
export class CreateCustomerController {
  constructor(private readonly createCustomerService: CreateCustomerService) {}

  @Post()
  async create(
    @Body(new ZodValidationPipe(createCustomerSchema))
    body: CreateCustomerRequest,
  ): Promise<CreateCustomerResponse> {
    return this.createCustomerService.create(body);
  }
}
