import prisma from '../../../../shared/prisma/client.js';

// Criação de Unidades
const addUnit = async (req, res) => {
  const { unidade } = req.body;

  try {
    const novaUnidade = await prisma.unidade.create({
      data: { unidade },
    });
    res.status(201).json({ message: 'Unidade adicionada com sucesso', unidade: novaUnidade });
  } catch (err) {
    console.error('Erro ao adicionar unidade', err);
    res.status(500).json({ error: 'Erro ao adicionar unidade', details: err.message });
  }
};

// Obter unidades
const getAllUnits = async (req, res) => {
  try {
    const unidades = await prisma.unidade.findMany();
    res.status(200).json(unidades);
  } catch (err) {
    console.error('Erro ao buscar unidades', err.stack);
    res.status(500).json({ error: 'Erro ao buscar unidades' });
  }
};

// Excluir uma unidade
const deleteUnit = async (req, res) => {
  const { id } = req.params;

  try {
    const unidade = await prisma.unidade.delete({
      where: { id: Number(id) },
    });
    res.status(200).json(unidade);
  } catch (err) {
    if (err.code === 'P2025') {
      res.status(404).json({ error: 'Unidade não encontrada' });
    } else {
      console.error('Erro ao excluir unidade', err);
      res.status(500).json({ error: 'Erro ao excluir unidade' });
    }
  }
};

// Editar unidade
const updateUnit = async (req, res) => {
  const { id } = req.params;
  const { unidade } = req.body;

  try {
    const unidadeAtualizada = await prisma.unidade.update({
      where: { id: Number(id) },
      data: { unidade },
    });
    res.status(200).json({ message: 'Unidade atualizada com sucesso', unidade: unidadeAtualizada });
  } catch (err) {
    if (err.code === 'P2025') {
      res.status(404).json({ message: 'Unidade não encontrada' });
    } else {
      console.error('Erro ao atualizar unidade', err);
      res.status(500).json({ error: 'Erro ao atualizar unidade', details: err.message });
    }
  }
};

export { addUnit, getAllUnits, deleteUnit, updateUnit};