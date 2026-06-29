import prisma from '../../../../shared/prisma/client.js';
import multer from 'multer';

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['application/pdf', 'image/png', 'image/jpeg'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de arquivo não permitido. Apenas PDF, PNG e JPG são aceitos.'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});

const uploadFields = upload.fields([
  { name: 'file1', maxCount: 1 },
  { name: 'file2', maxCount: 1 },
  { name: 'file3', maxCount: 1 },
]);

const uploadDocs = async (req, res) => {
  try {

    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    const file1 = req.files['file1'] ? req.files['file1'][0] : null; 
    const file2 = req.files['file2'] ? req.files['file2'][0] : null; 
    const { sistemaId, servicoId, cpf, nomeCompleto, dataNascimento, matricula, emailPessoal, emailFuncional, contato, unidadeId, cargoId, observacao } = req.body;

    console.info('Solicitação de upload recebida', {
      sistemaId,
      servicoId,
      unidadeId,
      cargoId,
      arquivos: Object.keys(req.files || {}),
    });

    const resultArquivo = await prisma.sistemasServicosArquivo.findMany({
      where: {
        sistemasServico: {
          sistemaId: parseInt(sistemaId),
          servicoId: parseInt(servicoId)
        }
      },
      select: {
        tipoArquivo: true
      }
    });

    console.info(`Tipos de arquivo exigidos encontrados: ${resultArquivo.length}`);

    let anexo1 = null;
    if (file1) {
      const arquivoBase64_1 = file1.buffer.toString('base64');
      anexo1 = await prisma.anexo.create({
        data: {
          filename: file1.originalname,
          anexo: arquivoBase64_1,
          mimetype: file1.mimetype,
          size: file1.size
        }
      });
    }

      let anexo2 = null;
      if (file2) {
        const arquivoBase64_2 = file2.buffer.toString('base64');
        anexo2 = await prisma.anexo.create({
          data: {
            filename: file2.originalname,
            anexo: arquivoBase64_2,
            mimetype: file2.mimetype,
            size: file2.size
          }
        });
      }

      const sistemaServico = await prisma.sistemasServico.findFirst({
        where: {
          sistemaId: parseInt(sistemaId),
          servicoId: parseInt(servicoId)
        }
      });

      if (!sistemaServico) {
        return res.status(400).json({ error: 'Sistema e serviço não encontrados' });
      }

      const unidade = await prisma.unidade.findUnique({
        where: { id: parseInt(unidadeId) }
      });

      const cargo = await prisma.cargo.findUnique({
        where: { id: parseInt(cargoId) }
      });

      await prisma.requisicao.create({
        data: {
          cpf,
          nomeCompleto,
          dataNascimento: new Date(dataNascimento),
          matricula,
          emailPessoal,
          emailFuncional,
          contato,
          unidadeId: unidade ? unidade.id : null,
          cargoId: cargo ? cargo.id : null,
          sistemaServicoId: sistemaServico.id,
          anexo1Id: anexo1 ? anexo1.id : null,
          anexo2Id: anexo2 ? anexo2.id : null,
          observacao: observacao,
          dataSolicitacao: new Date(),
          ipAddress
        }
      });

      res.status(200).json({ message: 'Arquivo enviado e dados registrados com sucesso' });
    } catch (err) {
      console.error('Erro ao enviar arquivo', err);
      res.status(500).json({ error: 'Erro ao enviar arquivo', details: err.message });
    }
  };


export { uploadDocs, uploadFields };
