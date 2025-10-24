import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import request from 'supertest';
import { HttpExceptionFilter } from './../src/common/filters/http-exception.filter';
import { PrismaService } from './../src/infra/database/prisma/prisma.service';

describe('Charges E2E Tests', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let customerId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalFilters(new HttpExceptionFilter());

    prisma = app.get<PrismaService>(PrismaService);

    await app.init();
  });

  afterAll(async () => {
    await prisma.$disconnect();
    await app.close();
  });

  beforeEach(async () => {
    await prisma.charge.deleteMany();
    await prisma.customer.deleteMany();

    const customer = await prisma.customer.create({
      data: {
        name: 'João Silva',
        email: 'joao@email.com',
        document: '12345678901',
      },
    });
    customerId = customer.id;
  });

  describe('POST /charges', () => {
    it('should create a charge with PIX', () => {
      return request(app.getHttpServer())
        .post('/charges')
        .send({
          amount: 100,
          currency: 'BRL',
          customer_id: customerId,
          payment_method: 'Pix',
        })
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.amount).toBe(100);
          expect(res.body.status).toBe('Pending');
        });
    });

    it('should return 404 if customer not found', () => {
      return request(app.getHttpServer())
        .post('/charges')
        .send({
          amount: 100,
          currency: 'BRL',
          customer_id: 'invalid-id',
          payment_method: 'Pix',
        })
        .expect(404);
    });

    it('should use idempotency key', async () => {
      const idempotencyKey = 'test-key-123';

      const res1 = await request(app.getHttpServer())
        .post('/charges')
        .set('Idempotency-Key', idempotencyKey)
        .send({
          amount: 100,
          currency: 'BRL',
          customer_id: customerId,
          payment_method: 'Pix',
        })
        .expect(201);

      await request(app.getHttpServer())
        .post('/charges')
        .set('Idempotency-Key', idempotencyKey)
        .send({
          amount: 100,
          currency: 'BRL',
          customer_id: customerId,
          payment_method: 'Pix',
        })
        .expect(400);
    });
  });
});
