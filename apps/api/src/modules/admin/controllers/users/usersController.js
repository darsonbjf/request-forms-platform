import prisma from '../../../../shared/prisma/client.js';

const getAllUsers = async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany();
    res.status(200).json(usuarios);
  } catch (err) {
    console.error('Erro ao buscar requisitantes', err);
    res.status(500).json({ error: 'Erro ao buscar requisitantes' });
  }
};

// Excluir um usuário
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const usuarios = await prisma.usuario.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.status(200).json(usuarios);
  } catch (err) {
    if (err.code === 'P2025') {
      res.status(404).json({ error: 'Requisitante não encontrado' });
    } else {
      console.error('Erro ao excluir requisitante', err);
      res.status(500).json({ error: 'Erro ao excluir requisitante' });
    }
  }
};

export { getAllUsers, deleteUser };