import prisma from '../../../../shared/prisma/client.js';

// Criação de Cargos
const addPosition = async (req, res) => {
  const { cargo } = req.body;

  try {
    const novoCargo = await prisma.cargo.create({
      data: { cargo },
    });
    res.status(201).json({ message: 'Cargo adicionado com sucesso', cargo: novoCargo });
  } catch (err) {
    console.error('Erro ao adicionar cargo', err);
    res.status(500).json({ error: 'Erro ao adicionar cargo', details: err.message });
  }
};

// Obter cargos
const getAllPositions = async (req, res) => {
  try {
    const cargos = await prisma.cargo.findMany();
    res.status(200).json(cargos);
  } catch (err) {
    console.error('Erro ao buscar cargos', err.stack);
    res.status(500).json({ error: 'Erro ao buscar cargos' });
  }
};

// Excluir um cargo
const deletePosition = async (req, res) => {
  const { id } = req.params;

  try {
    const cargo = await prisma.cargo.delete({
      where: { id: Number(id) },
    });
    res.status(200).json(cargo);
  } catch (err) {
    if (err.code === 'P2025') {
      res.status(404).json({ error: 'Cargo não encontrado' });
    } else {
      console.error('Erro ao excluir cargo', err);
      res.status(500).json({ error: 'Erro ao excluir cargo' });
    }
  }
};

// Editar cargo
const updatePosition = async (req, res) => {
  const { id } = req.params;
  const { cargo } = req.body;

  try {
    const cargoAtualizado = await prisma.cargo.update({
      where: { id: Number(id) },
      data: { cargo },
    });
    res.status(200).json({ message: 'Cargo atualizado com sucesso', cargo: cargoAtualizado });
  } catch (err) {
    if (err.code === 'P2025') {
      res.status(404).json({ message: 'Cargo não encontrado' });
    } else {
      console.error('Erro ao atualizar cargo', err);
      res.status(500).json({ error: 'Erro ao atualizar cargo', details: err.message });
    }
  }
};

export {  addPosition,  getAllPositions,  deletePosition,  updatePosition };