## Descricao

Este projeto consiste em uma API para gerenciamento de produtos favoritos para clientes. Construído com NestJS e NodeJS.

### Motivações

De acordo com o teste proposto, eu preferi criar uma tabela no banco de dados chamada products, onde iria armazenar os produtos para serem favoritados. Para alimentar essa tabela, criei um agendador que, de 5 em 5 minutos, busca os produtos na API recomendada para importar dentro da aplicação.

Essa motivação surgiu pensando que, em uma API real, a mesma possa estar fora do ar no momento de validar a favoritação do produto para o cliente. Neste formato, caso a API esteja fora do ar, ainda assim teríamos a última carga importada, não parando o funcionamento da aplicação de favoritos.

### Documentação do projeto

Dentro da raiz, em docs, existem duas imagens e uma collection do Postman.

O arquivo organizacao-arquitetura.png explica como está ocorrendo o fluxo da aplicação e como o importador de produtos funciona.

Já o arquivo recursos-api.png guarda informações dos recursos presentes na API e sua estrutura de path para acesso e entendimento.

O arquivo Favorite-API.postman_collection.json pode ser importado no Postman para ter uma collection para realizar as operações da API.
As chaves de Basic Auth devem ser informadas de acordo com as variáveis de ambiente `HTTP_BASIC_USER` e `HTTP_BASIC_PASS`.

### Arquitetura

A arquitetura do projeto reúne um misto de experiências passadas com Clean Architecture, utilizando o framework NestJS. Desenvolvi esse modelo que me atende muito bem em diversos cenários, deixando os elementos mais organizados e reutilizáveis.

Basicamente, dentro de cada módulo temos três pastas, sendo:

- application: onde armazena arquivos de servicos e usecases.
- domain: onde guarda arquivos de entidades e modelos.
- infra: armazena arquivos de mappers, DTOs, repositórios e controllers.

Foi implementada uma camada de `FilterException` para garantir a equidade das saídas de erro para os endpoints da aplicação.

Os arquivos referentes à configuração de banco de dados e migrations ficam armazenados na pasta `infra/database`, para que, em uma possível troca de ORM, fique mais fácil sua substituição.

### Documentação Swagger

Disponível para acessar em `http://localhost:3000/docs`

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

## Instalação: como rodar

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
