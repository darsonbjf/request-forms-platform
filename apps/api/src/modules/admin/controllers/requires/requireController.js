import prisma from '../../../../shared/prisma/client.js';

// Obter todos os requisicoes
const getAllRequires = async (req, res) => {
  try {
    const requisicoes = await prisma.requisicao.findMany({
      include: {
        unidade: {
          select: { unidade: true } 
        },
        cargo: {
          select: { cargo: true } 
        },
        sistemaServico: {
          include: {
            sistema: {
              select: { sistema: true } 
            },
            servico: {
              select: { servico: true }
            },
          }
        },
        anexo1: {
          select: {  id: true, filename: true, mimetype: true }
        },
         anexo2: { 
          select: { id: true, filename: true, mimetype: true }
        }
      }
    });

    const result = requisicoes.map(item => ({
      id: item.id,
      cpf: item.cpf,
      nomeCompleto: item.nomeCompleto,
      dataNascimento: item.dataNascimento,
      matricula: item.matricula,
      emailPessoal: item.emailPessoal,
      emailFuncional: item.emailFuncional,
      contato: item.contato,
      observacao: item.observacao,
      unidade: item.unidade ? item.unidade.unidade : null,
      cargo: item.cargo ? item.cargo.cargo : null,
      sistema: item.sistemaServico?.sistema?.sistema || null,
      servico: item.sistemaServico?.servico?.servico || null,
      anexo1: item.anexo1 ? { id: item.anexo1.id, filename: item.anexo1.filename, mimetype: item.anexo1.mimetype } : null,
      anexo2: item.anexo2 ? { id: item.anexo2.id, filename: item.anexo2.filename, mimetype: item.anexo2.mimetype } : null,
      dataSolicitacao: item.dataSolicitacao,
      ipAddress: item.ipAddress
    }));

    res.status(200).json(result);
  } catch (err) {
    console.error('Erro ao buscar requisicoes', err.stack);
    res.status(500).json({ error: 'Erro ao buscar requisicoes' });
  }
};





















// Deletar uma requisição
const deleteRequire = async (req, res) => {
  const { id } = req.params;

  try {
    const requisicao = await prisma.requisicao.delete({
      where: { id: Number(id) },
    });
    res.status(200).json(requisicao);
  } catch (err) {
    if (err.code === 'P2025') {
      res.status(404).json({ error: 'Requisição não encontrada' });
    } else {
      console.error('Erro ao excluir requisição', err);
      res.status(500).json({ error: 'Erro ao excluir requisição' });
    }
  }
};

export { getAllRequires, deleteRequire };