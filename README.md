# Banco Digital Backend - Documentação

## Descrição do Projeto

Este projeto é uma API backend desenvolvida com NestJS que simula o funcionamento de um sistema bancário. Ele implementa os princípios de Domain-Driven Design (DDD) para gerenciar clientes, contas bancárias e movimentações financeiras. O objetivo é garantir uma arquitetura bem organizada, com separação clara de responsabilidades, enquanto respeita as regras de negócio do domínio bancário.

## Requisitos Implementados

1. Clientes
 * Atributos:
   - Nome completo
   - CPF (único)
   - Data de nascimento
 * Regras de Negócio:
   - Validação do CPF.
   - Um cliente pode possuir uma ou mais contas bancárias.
 * Endpoints:
   - POST /customers - Criar um novo cliente.
   - GET /customers/:customerUuid - Obter informações de um cliente, incluindo suas contas.

2. Login

  * Endpoints:
    - POST /auth/login - Realizar o login.

3. Contas Bancárias
  * Atributos:
    - Número da conta (gerado automaticamente).
    - Saldo inicial (opcional, padrão: zero).
    - Status da conta (ativa/inativa).
  * Regras de Negócio:
    - Apenas contas ativas podem realizar movimentações.
    - Cada conta está vinculada a um único cliente.
  * Endpoints:
    - POST /accounts - Criar uma nova conta para um cliente.
    - PATCH /contas/:accountUuid/status - Atualizar o status de uma conta.
    - GET /contas/:accountUuid - Obter informações de uma conta, incluindo movimentações.

4. Movimentações Financeiras
  * Tipos de Movimentações:
    - Depósito
    - Saque
    - Transferência entre contas
  * Regras de Negócio:
    - O saldo da conta não pode ser negativo.
    - Transferências só podem ocorrer entre contas ativas.
    - Cada movimentação registra:
      - Data/hora
      - Tipo de movimentação
      - Valor
      - Contas envolvidas
  * Endpoints:
    - POST /transactions/deposit - Realizar um depósito.
    - POST /transactions/withdraw - Realizar um saque.
    - POST /transactions/transfer - Realizar uma transferência.

## Tecnologias Utilizadas
 * Node.js com NestJS (framework principal)
 * TypeScript
 * PostgreSQL (banco de dados relacional)
 * Sequelize (ORM)
 * class-validator (validação de entradas)
 * Swagger (documentação da API)
 * JWT (autenticação)
 * Docker (containerização)

## Configuração do Ambiente
### Pré-requisitos
 * Node.js v16 ou superior
 * Docker e Docker Compose
 * Git (para clonar o repositório)

## Installation

1. Clone o repositório
```bash
$ git clone https://github.com/maxfortune93/banking_domain_challenge.git
```
2. Instale as dependências:

```bash
$ npm install
```

3. Configure as variáveis de ambiente:

* Crie um arquivo .env baseado no .env.example.
* Configure os valores, incluindo as credenciais do banco de dados e o segredo do JWT.

4. Suba o banco de dados e a applicação usando Docker:
```bash
$ docker compose up -d  || docker compose up --build || npm run docker:debug

```

5. Execute as migrações do banco de dados:
  ```bash
  $ npm run db:migrate

  ```

6. Acesse a documentação da API:

* Acesse o Swagger em: [http://localhost:3000/docs](http://localhost:3000/docs)

