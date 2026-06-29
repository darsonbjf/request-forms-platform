import prisma from '../../../../shared/prisma/client.js';


// Criação de Serviços
const addService = async (req, res) => {
  const { servico } = req.body;

  try {
    const novoServico = await prisma.servico.create({
      data: { servico },
    });
    res.status(201).json({ message: 'Serviço adicionado com sucesso', servico: novoServico });
  } catch (err) {
    console.error('Erro ao adicionar serviço', err);
    res.status(500).json({ error: 'Erro ao adicionar serviço', details: err.message });
  }
};

// Obter serviços
const getAllServices = async (req, res) => {
  try {
    const servicos = await prisma.servico.findMany();
    res.status(200).json(servicos);
  } catch (err) {
    console.error('Erro ao buscar serviços', err.stack);
    res.status(500).json({ error: 'Erro ao buscar serviços' });
  }
};

// Excluir um serviço
const deleteService = async (req, res) => {
  const { id } = req.params;

  try {
    const servico = await prisma.servico.delete({
      where: { id: Number(id) },
    });
    res.status(200).json(servico);
  } catch (err) {
    if (err.code === 'P2025') {
      res.status(404).json({ error: 'Serviço não encontrado' });
    } else {
      console.error('Erro ao excluir serviço', err);
      res.status(500).json({ error: 'Erro ao excluir serviço' });
    }
  }
};

// Editar serviço
const updateService = async (req, res) => {
  const { id } = req.params;
  const { servico } = req.body;

  try {
    const servicoAtualizado = await prisma.servico.update({
      where: { id: Number(id) },
      data: { servico },
    });
    res.status(200).json({ message: 'Serviço atualizado com sucesso', servico: servicoAtualizado });
  } catch (err) {
    if (err.code === 'P2025') {
      res.status(404).json({ message: 'Serviço não encontrado' });
    } else {
      console.error('Erro ao atualizar serviço', err);
      res.status(500).json({ error: 'Erro ao atualizar serviço', details: err.message });
    }
  }
};

export { addService, getAllServices, deleteService, updateService };