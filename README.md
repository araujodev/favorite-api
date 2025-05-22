## Descricao

Este projeto consiste em uma API para gerenciamento de produtos favoritos para clientes. Construido com NestJS e NodeJS.

## Tecnologias

- NestJS
  - Framework
  - Http Service
  - Swagger
  - Config
  - Schedule
  - Rate Limit Throttler
  - Passport (auth)
- TypeORM
  - ORM - Entity
  - Migrations
  - Postgres
- Validation
  - Class Validator

## Instalacao, como rodar

```bash
# 1. Instalando dependencias do projeto
$ npm install

# 2. Copiar o .env.example e renomear para .env o arq. copiado
$ cp .env.example .env

# 3. Banco de dados em Docker
$ docker-compose up -d --build

# 4. Rodando migrations no banco de dados
$ npm run typeorm:apply-migrations

# 5. Rodando a aplicacao em modo watch
$ npm run start:dev
```

## Autor

Leandro de Souza Araujo
+5567991604334
leandro.souara.web@gmail.com
