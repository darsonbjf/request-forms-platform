# Request Forms Platform API

API Express para o Request Forms Platform. Ela fornece rotas públicas para envio
de solicitações e rotas administrativas protegidas por JWT.

## Stack

- Node.js
- Express
- Prisma
- PostgreSQL
- JWT
- Multer para upload em memória
- OpenTelemetry opcional

## Configuração

Use o `.env.example` da raiz do repositório como referência. As variáveis
mínimas são:

```bash
DATABASE_URL=postgresql://forms_user:forms_password@localhost:5432/forms?schema=forms
JWT_SECRET=change-me-before-use
API_PREFIX=/forms
PORT=3001
```

## Estrutura

- `src/app.js`: criação da aplicação Express e middlewares globais.
- `src/server.js`: carregamento de ambiente e inicialização HTTP.
- `src/routes/`: composição das rotas públicas e administrativas.
- `src/modules/admin/`: rotas e controllers do painel administrativo.
- `src/modules/public/`: rotas e controllers do formulário público.
- `src/shared/prisma/`: cliente Prisma compartilhado.
- `src/middlewares/`: autenticação e autorização.

## Comandos

```bash
npm install
npm run prisma:generate
npm run prisma:validate
npm run prisma:migrate
npm run dev
```

Seed administrativo opcional:

```bash
ADMIN_PASSWORD=change-me node prisma/seed.js
```

## Segurança

Não versione `.env`, dumps SQL, chaves, tokens ou credenciais reais. O seed cria
um usuário `admin` apenas quando `ADMIN_PASSWORD` estiver definida no ambiente.
