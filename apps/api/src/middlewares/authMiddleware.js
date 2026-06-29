import jwt from 'jsonwebtoken';
import prisma from '../shared/prisma/client.js';
const JWT_SECRET = process.env.JWT_SECRET;


async function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]; 

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  if (!JWT_SECRET) {
    return res.status(500).json({ error: 'JWT_SECRET não configurado' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    const usuario = await prisma.usuario.findUnique({
      where: { id: decoded.userId },
    });

    if (!usuario) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    req.usuario = usuario;

    next();
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
}

export { authMiddleware };
