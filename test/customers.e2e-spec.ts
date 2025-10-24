import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { CustomerModule } from './../src/application/customer/customer.module';
import { HttpExceptionFilter } from './../src/common/filters/http-exception.filter';
import { DatabaseModule } from './../src/infra/database/database.module';
import { PrismaService } from './../src/infra/database/prisma/prisma.service';

describe('Customers E2E Tests', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule, CustomerModule],
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
  });

  describe('POST /customers', () => {
    it('should create a new customer', () => {
      return request(app.getHttpServer())
        .post('/customers')
        .send({
          name: 'João Silva',
          email: 'joao@email.com',
          document: '12345678901',
          phone: '11987654321',
        })
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.name).toBe('João Silva');
          expect(res.body.email).toBe('joao@email.com');
        });
    });

    it('should return 409 if email already exists', async () => {
      await request(app.getHttpServer()).post('/customers').send({
        name: 'João Silva',
        email: 'joao@email.com',
        document: '12345678901',
      });

      return request(app.getHttpServer())
        .post('/customers')
        .send({
          name: 'Maria Silva',
          email: 'joao@email.com',
          document: '98765432100',
        })
        .expect(409);
    });

    it('should return 409 if document already exists', async () => {
      await request(app.getHttpServer()).post('/customers').send({
        name: 'João Silva',
        email: 'joao@email.com',
        document: '12345678901',
      });

      return request(app.getHttpServer())
        .post('/customers')
        .send({
          name: 'Maria Silva',
          email: 'maria@email.com',
          document: '12345678901',
        })
        .expect(409);
    });

    it('should return 400 with invalid data', () => {
      return request(app.getHttpServer())
        .post('/customers')
        .send({
          name: 'Jo',
          email: 'invalid-email',
          document: '123',
        })
        .expect(400);
    });
  });
});
