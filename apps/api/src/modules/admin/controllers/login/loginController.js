import prisma from '../../../../shared/prisma/client.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET;

const loginUsuario = async (req, res) => {
    const { username, password } = req.body;

    if (!JWT_SECRET) {
      return res.status(500).json({ error: 'JWT_SECRET não configurado' });
    }
  
    try {
      const usuario = await prisma.usuario.findUnique({
        where: { username },
      });
  
      if (!usuario) {
        return res.status(400).json({ error: 'Usuário ou senha incorretos' });
      }
  
      const passwordValid = await bcrypt.compare(password, usuario.passwordHash);
  
      if (!passwordValid) {
        return res.status(400).json({ error: 'Usuário ou senha incorretos' });
      }
  
      const token = jwt.sign({ userId: usuario.id }, JWT_SECRET, {
        expiresIn: '1h',
      });
  
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  };

  export default loginUsuario;
