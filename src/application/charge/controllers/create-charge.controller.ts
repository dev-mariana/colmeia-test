import { Body, Controller, Headers, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiHeader,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import {
  CreateChargeRequest,
  CreateChargeResponse,
} from '../dto/create-charge.dto';
import { createChargeSchema } from '../schemas/create-charge.schema';
import { CreateChargeService } from '../services/create-charge.service';

@ApiTags('charges')
@Controller('charges')
export class CreateChargeController {
  constructor(private readonly createChargeService: CreateChargeService) {}

  @Post()
  @ApiOperation({
    summary: 'Criar nova cobrança',
    description:
      'Cria uma nova cobrança associada a um cliente existente. Suporta PIX, Cartão de Crédito e Boleto.',
  })
  @ApiHeader({
    name: 'Idempotency-Key',
    description:
      'CUID para garantir idempotência na criação de cobranças (opcional)',
    required: false,
    schema: { type: 'string', format: 'cuid' },
  })
  @ApiResponse({
    description: 'Cobrança criada com sucesso',
    type: CreateChargeResponse,
  })
  @ApiNotFoundResponse({
    description: 'Cliente não encontrado',
  })
  @ApiBadRequestResponse({
    description: 'Dados inválidos ou campos obrigatórios faltando',
  })
  async create(
    @Body(new ZodValidationPipe(createChargeSchema)) body: CreateChargeRequest,
    @Headers('idempotency-key') idempotency_key?: string,
  ): Promise<CreateChargeResponse> {
    return this.createChargeService.create(body, idempotency_key);
  }
}
