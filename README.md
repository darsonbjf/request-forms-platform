# Request Forms Platform

Aplicação full-stack para coleta e gestão de solicitações via formulário. O
projeto contém um frontend público, um painel administrativo e uma API Node.js
com Prisma e PostgreSQL.

Projeto criado e publicado originalmente em dezembro de 2024. Atualmente, esta
versão foi adaptada para portfólio, com arquitetura reorganizada, documentação
pública e remoção de credenciais, dumps e referências de ambiente interno.

## Componentes

- `apps/web/`: frontend público em React, Chakra UI e Vite.
- `apps/admin/`: painel administrativo em React, Chakra UI e Vite.
- `apps/api/`: API Express com Prisma, autenticação JWT e upload de anexos.
- `infra/observability/`: configurações opcionais de métricas, logs e tracing.
- `scripts/`: automações auxiliares para imagens e deploy local.
- `docker-compose-dev.yml`: ambiente local com PostgreSQL, backend e frontends.

## Segurança para uso público

Este repositório não deve conter segredos reais, dumps de banco, chaves de
serviços externos ou dados de ambiente interno. Use `.env.example` como base e
mantenha `.env` fora do Git.

Se você clonar uma versão antiga que continha segredos, rotacione as credenciais
antes de tornar o repositório público.

## Requisitos

- Node.js 18+
- npm 9+
- Docker e Docker Compose, opcional para ambiente local completo
- PostgreSQL 15+ se executar sem Docker

## Execução Local Com Docker

```bash
cp .env.example .env
docker compose -f docker-compose-dev.yml up --build
```

Serviços padrão:

- Frontend público: `http://localhost:5173`
- Painel admin: `http://localhost:5174`
- API: `http://localhost:3001/forms`
- PostgreSQL: `localhost:5432`

## Execução Sem Docker

Backend:

```bash
cd apps/api
npm install
npm run prisma:generate
npm run prisma:migrate
npm run dev
```

Frontend público:

```bash
cd apps/web
npm install
npm run dev
```

Painel admin:

```bash
cd apps/admin
npm install
npm run dev
```

## Scripts Úteis

Na raiz:

```bash
npm run build
npm run build:user
npm run build:admin
npm run prisma:validate
```

Build das imagens Docker:

```bash
REGISTRY_NAMESPACE=seu-usuario TAG=latest ./scripts/build-images.sh
```

## Variáveis Importantes

- `DATABASE_URL`: conexão PostgreSQL usada pelo Prisma.
- `JWT_SECRET`: chave de assinatura dos tokens do painel administrativo.
- `ADMIN_PASSWORD`: senha inicial usada pelo seed opcional.
- `VITE_BASE_URL`: URL base da API usada pelos frontends.
- `VITE_API_PREFIX`: prefixo das rotas da API, padrão `/forms`.
- `VITE_RECAPTCHA_SITE_KEY`: chave pública do reCAPTCHA.
- `VITE_REQUIRED_FILE_KEY_*`: nomes usados pela API para mapear anexos
  exigidos no formulário.
- `SECRET_KEY`: chave privada do reCAPTCHA no backend.

## Publicação

Antes de publicar:

1. Confirme que `.env`, `mysecrets.yml`, dumps SQL e builds não estão
   versionados.
2. Rode `npm run build`.
3. Rode `npm run prisma:validate`.
4. Faça uma varredura por IPs, domínios internos e segredos.
