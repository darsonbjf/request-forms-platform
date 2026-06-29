import prisma from '../../../../shared/prisma/client.js';

// Criação de Sistemas
const addSystem = async (req, res) => {
  const { sistema } = req.body;

  try {
    const novoSistema = await prisma.sistema.create({
      data: { sistema },
    });
    res.status(201).json({ message: 'Sistema adicionado com sucesso', sistema: novoSistema });
  } catch (err) {
    console.error('Erro ao adicionar sistema', err);
    res.status(500).json({ error: 'Erro ao adicionar sistema', details: err.message });
  }
};

// Obter sistemas
const getAllSystems = async (req, res) => {
  try {
    const sistemas = await prisma.sistema.findMany();
    res.status(200).json(sistemas);
  } catch (err) {
    console.error('Erro ao buscar sistemas', err.stack);
    res.status(500).json({ error: 'Erro ao buscar sistemas' });
  }
};

// Excluir um sistema
const deleteSystem = async (req, res) => {
  const { id } = req.params;

  try {
    const sistema = await prisma.sistema.delete({
      where: { id: Number(id) },
    });
    res.status(200).json(sistema);
  } catch (err) {
    if (err.code === 'P2025') {
      res.status(404).json({ error: 'Sistema não encontrado' });
    } else {
      console.error('Erro ao excluir sistema', err);
      res.status(500).json({ error: 'Erro ao excluir sistema' });
    }
  }
};

// Editar sistema
const updateSystem = async (req, res) => {
  const { id } = req.params;
  const { sistema } = req.body;

  try {
    const sistemaAtualizado = await prisma.sistema.update({
      where: { id: Number(id) },
      data: { sistema },
    });
    res.status(200).json({ message: 'Sistema atualizado com sucesso', sistema: sistemaAtualizado });
  } catch (err) {
    if (err.code === 'P2025') {
      res.status(404).json({ message: 'Sistema não encontrado' });
    } else {
      console.error('Erro ao atualizar sistema', err);
      res.status(500).json({ error: 'Erro ao atualizar sistema', details: err.message });
    }
  }
};

export  {  addSystem,  getAllSystems,  deleteSystem,  updateSystem };