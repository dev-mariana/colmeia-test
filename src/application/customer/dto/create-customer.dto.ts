import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerRequest {
  @ApiProperty({
    description: 'Nome completo do cliente',
    example: 'João da Silva',
    minLength: 7,
    maxLength: 50,
  })
  name: string;

  @ApiProperty({
    description: 'Email do cliente',
    example: 'joao.silva@email.com',
  })
  email: string;

  @ApiProperty({
    description: 'Documento do cliente (CPF ou CNPJ)',
    example: '12345678901',
    minLength: 11,
    maxLength: 14,
  })
  document: string;

  @ApiProperty({
    description: 'Telefone do cliente',
    example: '11987654321',
    required: false,
  })
  phone?: string;
}

export class CreateCustomerResponse {
  @ApiProperty({
    description: 'ID único do cliente',
    example: 'clxxx123abc456',
  })
  id: string;

  @ApiProperty({
    description: 'Nome do cliente',
    example: 'João da Silva',
  })
  name: string;

  @ApiProperty({
    description: 'Email do cliente',
    example: 'joao.silva@email.com',
  })
  email: string;

  @ApiProperty({
    description: 'Documento do cliente',
    example: '12345678901',
  })
  document: string;

  @ApiProperty({
    description: 'Telefone do cliente',
    example: '11987654321',
    nullable: true,
  })
  phone: string | undefined;

  @ApiProperty({
    description: 'Data de criação',
    example: '2025-10-23T19:30:00.000Z',
  })
  created_at: Date;

  @ApiProperty({
    description: 'Data de atualização',
    example: '2025-10-23T19:30:00.000Z',
    nullable: true,
  })
  updated_at: Date | null;
}
