import prisma from '../../../../shared/prisma/client.js';

const resolveRequiredFiles = async (req, res) => {
  const { servicoId, sistemaId, cargoId } = req.body;

  try {
    const servico = await prisma.servico.findUnique({
      where: { id: parseInt(servicoId) }
    });

    if (!servico) {
      return res.status(404).json({ error: 'Serviço não encontrado.' });
    }

    const sistema = await prisma.sistema.findUnique({
      where: { id: parseInt(sistemaId) }
    });

    if (!sistema) {
      return res.status(404).json({ error: 'Sistema não encontrado.' });
    }

    const cargo = await prisma.cargo.findUnique({
      where: { id: parseInt(cargoId) }
    });

    if (!cargo) {
      return res.status(404).json({ error: 'Cargo não encontrado.' });
    }

    const sistemasServicos = await prisma.sistemasServico.findMany({
      where: {
        sistemaId: parseInt(sistemaId),
        servicoId: parseInt(servicoId),
        cargoId: parseInt(cargoId)
      },
      include: {
        arquivos: {
          include: {
            tipoArquivo: true
          }
        }
      }
    });

    const arquivos = sistemasServicos.flatMap(ss =>
      ss.arquivos
        .filter(a => a.tipoArquivo && a.tipoArquivo.arquivo)
        .map(a => a.tipoArquivo.arquivo)
    );
    const precisaArquivo = arquivos.length > 0;

    let message;
    if (precisaArquivo) {
      const listaArquivos = arquivos.join(', ');
      message = `É necessário o envio dos seguintes arquivos para este sistema e serviço: ${listaArquivos}.`;
    } else {
      message = 'Não é necessário nenhum arquivo para este sistema, serviço e cargo escolhido.';
    }

    res.status(200).json({ precisaArquivo, arquivos, message });
  } catch (err) {
    console.error('Erro ao processar solicitação', err);
    res.status(500).json({ error: 'Erro ao processar solicitação', details: err.message });
  }
};

export { resolveRequiredFiles };
