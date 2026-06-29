import prisma from '../../../../shared/prisma/client.js';

const recuperarArquivo = async (req, res) => {
    const { id, anexoTipo } = req.params;

  try {
    if (!['anexo1', 'anexo2'].includes(anexoTipo)) {
      return res.status(400).json({ error: 'Tipo de anexo inválido. Use "anexo1" ou "anexo2".' });
    }

    const requisicao = await prisma.requisicao.findUnique({
      where: { id: Number(id) },
      include: {
        anexo1: { select: { id: true, anexo: true, filename: true, mimetype: true } },
        anexo2: { select: { id: true, anexo: true, filename: true, mimetype: true } },
      },
    });

    if (!requisicao) {
      return res.status(404).json({ error: 'Requisição não encontrada' });
    }

    const anexo = anexoTipo === 'anexo1' ? requisicao.anexo1 : requisicao.anexo2;

    if (!anexo) {
      return res.status(404).json({ error: `Anexo ${anexoTipo} não encontrado` });
    }


    const { anexo: anexoBase64, filename, mimetype } = anexo;
    const arquivoBuffer = Buffer.from(anexoBase64, 'base64');

    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    res.setHeader('Content-Type', mimetype);


    res.send(arquivoBuffer);
  } catch (err) {
    console.error('Erro ao recuperar arquivo', err);
    res.status(500).json({ error: 'Erro ao recuperar arquivo', details: err.message });
  }
};

export { recuperarArquivo };