import { Body, Controller, Post } from '@nestjs/common';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import {
  CreateChargeRequest,
  CreateChargeResponse,
} from '../dto/create-charge.dto';
import { createChargeSchema } from '../schemas/create-charge.schema';
import { CreateChargeService } from '../services/create-charge.service';

@Controller('charges')
export class CreateChargeController {
  constructor(private readonly createChargeService: CreateChargeService) {}

  @Post()
  async create(
    @Body(new ZodValidationPipe(createChargeSchema)) body: CreateChargeRequest,
  ): Promise<CreateChargeResponse> {
    return this.createChargeService.create(body);
  }
}
