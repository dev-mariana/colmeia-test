import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import {
  CreateCustomerRequest,
  CreateCustomerResponse,
} from '../dto/create-customer.dto';
import { createCustomerSchema } from '../schemas/create-customer.schema';
import { CreateCustomerService } from '../services/create-customer.service';

@ApiTags('customers')
@Controller('customers')
export class CreateCustomerController {
  constructor(private readonly createCustomerService: CreateCustomerService) {}

  @Post()
  @ApiOperation({
    summary: 'Criar novo cliente',
    description:
      'Cria um novo cliente no sistema. Email e documento devem ser únicos.',
  })
  @ApiResponse({
    status: 201,
    description: 'Cliente criado com sucesso',
    type: CreateCustomerResponse,
  })
  @ApiConflictResponse({
    description: 'Email ou documento já cadastrado',
  })
  @ApiBadRequestResponse({
    description: 'Dados inválidos',
  })
  async create(
    @Body(new ZodValidationPipe(createCustomerSchema))
    body: CreateCustomerRequest,
  ): Promise<CreateCustomerResponse> {
    return this.createCustomerService.create(body);
  }
}
