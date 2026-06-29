import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  const senhaAdmin = process.env.ADMIN_PASSWORD;
  if (!senhaAdmin) {
    console.warn('ADMIN_PASSWORD não definida. Seed administrativo ignorado.');
    return;
  }

const saltRounds = 10;
const senhaHash = await bcrypt.hash(senhaAdmin, saltRounds);

const admin = await prisma.usuario.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      passwordHash: senhaHash, // senha hash
      cpf: '000.000.000-01',
      nome: 'Administrador',
      status: true,
      nivelPermissao: 'administrador',
    },
  });

console.log(`Usuário admin disponível: ${admin.username}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
