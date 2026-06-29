import prisma from '../../../../shared/prisma/client.js';

// Criação de Arquivos
const addFile = async (req, res) => {
  const { arquivo } = req.body;

  try {
    const novoArquivo = await prisma.tipoArquivo.create({
      data: { arquivo },
    });
    res.status(201).json({ message: 'Arquivo adicionado com sucesso', arquivo: novoArquivo });
  } catch (err) {
    console.error('Erro ao adicionar arquivo', err);
    res.status(500).json({ error: 'Erro ao adicionar arquivo', details: err.message });
  }
};

// Verificar todos os arquivos
const getAllFiles = async (req, res) => {
  try {
    const arquivos = await prisma.tipoArquivo.findMany();
    res.status(200).json(arquivos);
  } catch (err) {
    console.error('Erro ao buscar arquivos', err);
    res.status(500).json({ error: 'Erro ao buscar arquivos' });
  }
};

// Excluir um arquivo
const deleteFile = async (req, res) => {
  const { id } = req.params;

  try {
    const arquivo = await prisma.tipoArquivo.delete({
      where: { id: Number(id) },
    });
    res.status(200).json(arquivo);
  } catch (err) {
    if (err.code === 'P2025') {
      res.status(404).json({ error: 'Arquivo não encontrado' });
    } else {
      console.error('Erro ao excluir arquivo', err);
      res.status(500).json({ error: 'Erro ao excluir arquivo' });
    }
  }
};

// Editar arquivo
const updateFile = async (req, res) => {
  const { id } = req.params;
  const { arquivo } = req.body;

  try {
    const arquivoAtualizado = await prisma.tipoArquivo.update({
      where: { id: Number(id) },
      data: { arquivo },
    });
    res.status(200).json({ message: 'Arquivo atualizado com sucesso', arquivo: arquivoAtualizado });
  } catch (err) {
    if (err.code === 'P2025') {
      res.status(404).json({ message: 'Arquivo não encontrado' });
    } else {
      console.error('Erro ao atualizar arquivo', err);
      res.status(500).json({ error: 'Erro ao atualizar arquivo', details: err.message });
    }
  }
};


export {  addFile,  getAllFiles,  deleteFile,  updateFile };