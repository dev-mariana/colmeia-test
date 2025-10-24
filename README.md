# SwiftPag Test - Sistema de Cobrança

Sistema de gerenciamento de clientes e cobranças desenvolvido com NestJS, Prisma e PostgreSQL.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Arquitetura](#arquitetura)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Executando o Projeto](#executando-o-projeto)
- [API Endpoints](#api-endpoints)
- [Testes](#testes)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Contribuição](#contribuição)

## 🚀 Sobre o Projeto

O SwiftPag Test é uma API REST para gerenciamento de clientes e cobranças, desenvolvida como parte de um teste técnico. O sistema permite:

- **Gestão de Clientes**: Criação e consulta de clientes com validação de dados únicos
- **Gestão de Cobranças**: Criação de cobranças com diferentes métodos de pagamento (PIX, Cartão de Crédito, Boleto)
- **Idempotência**: Suporte a chaves de idempotência para evitar duplicação de cobranças
- **Validação de Dados**: Validação robusta usando Zod
- **Documentação Automática**: API documentada com Swagger

## 🛠 Tecnologias Utilizadas

### Backend

- **NestJS** - Framework Node.js para aplicações escaláveis
- **TypeScript** - Superset do JavaScript com tipagem estática
- **Prisma** - ORM moderno para TypeScript e Node.js
- **PostgreSQL** - Banco de dados relacional
- **Zod** - Biblioteca de validação de esquemas
- **Jest** - Framework de testes
- **Supertest** - Biblioteca para testes de API

### Ferramentas de Desenvolvimento

- **ESLint** - Linter para JavaScript/TypeScript
- **Prettier** - Formatador de código
- **Docker** - Containerização
- **Swagger** - Documentação da API

## 🏗 Arquitetura

O projeto segue os princípios da **Clean Architecture** e **Domain-Driven Design (DDD)**:

```
src/
├── application/          # Camada de Aplicação
│   ├── charge/          # Módulo de Cobranças
│   └── customer/        # Módulo de Clientes
├── domain/              # Camada de Domínio
│   ├── charge/          # Entidades e Repositórios de Cobrança
│   └── customer/        # Entidades e Repositórios de Cliente
├── infra/               # Camada de Infraestrutura
│   └── database/        # Configuração do Banco de Dados
└── common/              # Utilitários e Filtros Globais
```

### Padrões Implementados

- **Repository Pattern**: Abstração do acesso a dados
- **DTO Pattern**: Transferência de dados entre camadas
- **Mapper Pattern**: Conversão entre entidades de domínio e persistência
- **Validation Pipe**: Validação de entrada usando Zod
- **Exception Filter**: Tratamento global de exceções

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- PostgreSQL (versão 13 ou superior)
- Docker e Docker Compose (opcional)

## ⚙️ Instalação

1. **Clone o repositório**

```bash
git clone <url-do-repositorio>
cd colmeia-test
```

2. **Instale as dependências**

```bash
npm install
```

3. **Configure as variáveis de ambiente**

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/swiftpag_test"
```

## 🚀 Executando o Projeto

### Usando Docker (Recomendado)

1. **Inicie o banco de dados**

```bash
docker-compose up -d
```

2. **Execute as migrações**

```bash
npm run migrate:dev
```

3. **Gere o cliente Prisma**

```bash
npm run generate
```

4. **Inicie a aplicação**

```bash
npm run start:dev
```

### Usando PostgreSQL Local

1. **Configure o PostgreSQL** e crie o banco de dados
2. **Execute as migrações**

```bash
npm run migrate:dev
```

3. **Gere o cliente Prisma**

```bash
npm run generate
```

4. **Inicie a aplicação**

```bash
npm run start:dev
```

A aplicação estará disponível em `http://localhost:3000`

## 📚 API Endpoints

### Documentação Swagger

Acesse `http://localhost:3000/swagger` para visualizar a documentação interativa da API.

### Clientes

#### POST /customers

Cria um novo cliente.

**Body:**

```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "document": "12345678901",
  "phone": "11987654321"
}
```

**Resposta (201):**

```json
{
  "id": "clxxx123",
  "name": "João Silva",
  "email": "joao@email.com",
  "document": "12345678901",
  "phone": "11987654321",
  "created_at": "2025-10-23T19:30:00.000Z",
  "updated_at": null
}
```

### Cobranças

#### POST /charges

Cria uma nova cobrança.

**Headers:**

- `Idempotency-Key` (opcional): Chave para garantir idempotência

**Body:**

```json
{
  "amount": 100.5,
  "currency": "BRL",
  "customer_id": "clxxx123",
  "payment_method": "Pix",
  "due_date": "2025-10-30T00:00:00.000Z",
  "installments": 3
}
```

**Resposta (201):**

```json
{
  "id": "clyyy789",
  "amount": 100.5,
  "currency": "BRL",
  "customer_id": "clxxx123",
  "payment_method": "Pix",
  "status": "Pending",
  "due_date": null,
  "installments": null,
  "created_at": "2025-10-23T19:30:00.000Z",
  "updated_at": null
}
```

### Métodos de Pagamento Suportados

- **PIX**: Pagamento instantâneo
- **Credit Card**: Cartão de crédito (requer `installments`)
- **Boleto**: Boleto bancário (requer `due_date`)

### Status de Cobrança

- **Pending**: Pendente
- **Paid**: Paga
- **Cancelled**: Cancelada
- **Expired**: Expirada

## 🧪 Testes

### Executar Testes E2E

```bash
npm run test:e2e
```

### Executar Todos os Testes

```bash
npm run test:e2e:cov
```

## 📁 Estrutura do Projeto

```
src/
├── application/                 # Camada de Aplicação
│   ├── charge/                 # Módulo de Cobranças
│   │   ├── controllers/        # Controladores REST
│   │   ├── dto/               # Data Transfer Objects
│   │   ├── schemas/           # Esquemas de Validação Zod
│   │   └── services/          # Lógica de Negócio
│   └── customer/              # Módulo de Clientes
│       ├── controllers/       # Controladores REST
│       ├── dto/              # Data Transfer Objects
│       ├── schemas/          # Esquemas de Validação Zod
│       └── services/         # Lógica de Negócio
├── common/                    # Utilitários Comuns
│   ├── filters/              # Filtros de Exceção
│   └── pipes/                # Pipes de Validação
├── domain/                    # Camada de Domínio
│   ├── charge/               # Entidades e Contratos de Cobrança
│   └── customer/             # Entidades e Contratos de Cliente
├── infra/                     # Camada de Infraestrutura
│   └── database/             # Configuração do Banco
│       └── prisma/           # Implementações Prisma
│           ├── mappers/      # Mapeadores de Entidades
│           └── repositories/ # Implementações de Repositórios
└── main.ts                   # Ponto de Entrada da Aplicação
```

## 🔒 Validações e Segurança

- **Validação de Dados**: Todos os inputs são validados usando Zod
- **Idempotência**: Suporte a chaves de idempotência para cobranças
- **Constraints de Banco**: Validação de unicidade para email e documento
- **Tratamento de Erros**: Filtros globais para tratamento de exceções
- **Tipagem Forte**: TypeScript para prevenção de erros em tempo de compilação

## 📊 Cobertura de Testes

O projeto mantém alta cobertura de testes com:

- **Testes Unitários**: Para serviços e lógica de negócio
- **Testes E2E**: Para endpoints da API
- **Testes de Integração**: Para repositórios e banco de dados

## 📝 Licença

MIT

## 📝 Autor

Mariana Bastos
