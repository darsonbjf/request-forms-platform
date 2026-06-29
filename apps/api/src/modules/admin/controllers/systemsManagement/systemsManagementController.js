import prisma from '../../../../shared/prisma/client.js';

// Adicionar Sistema, Serviço e Cargo com Arquivo
const addSystemServicePositionFile = async (req, res) => {
    const { sistemaId, servicoId, cargoId, arquivoId } = req.body;
  
    try {
      // Adiciona o conjunto na tabela SistemasServico
      const newSystemService = await prisma.sistemasServico.create({
        data: {
          sistemaId,
          servicoId,
          cargoId,
        },
      });


// Cria a relação na tabela SistemasServicosArquivo
const newRelationFile = await prisma.sistemasServicosArquivo.create({
    data: {
      sistemasServicosId: newSystemService.id,
      arquivoId,
    },
  });

  res.status(201).json({
    message: 'Sistema, Serviço, Cargo e Arquivo adicionados com sucesso',
    sistemaServico: newSystemService,
    relacaoArquivo: newRelationFile,
  });
} catch (err) {
  console.error('Erro ao adicionar Sistema, Serviço, Cargo e Arquivo', err);
  res.status(500).json({
    error: 'Erro ao adicionar Sistema, Serviço, Cargo e Arquivo',
    details: err.message,
  });
}
};

export default addSystemServicePositionFile;