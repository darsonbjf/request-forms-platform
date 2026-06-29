import prisma from '../../../../shared/prisma/client.js';

export const handleUserRequest = async (req, res) => {
  const {
    cpf,
    nomeCompleto,
    dataNascimento,
    emailPessoal,
    emailFuncional,
    matricula,
    contato,
    unidadeId,
    cargoId,
    observacao,
  } = req.body;

  try {
    const existingPessoa = await prisma.pessoa.findUnique({
      where: { matricula },
    });

    if (!existingPessoa) {
      const newPessoa = await prisma.pessoa.create({
        data: {
          cpf,
          nomeCompleto,
          dataNascimento: new Date(dataNascimento),
          emailPessoal,
          emailFuncional,
          matricula,
          contato,
          observacao,
          unidade: unidadeId ? { connect: { id: unidadeId } } : undefined,
          cargo: cargoId ? { connect: { id: cargoId } } : undefined,
        },
      });

      return res.status(201).json(newPessoa);
    }

    const updatedPessoa = await prisma.pessoa.update({
      where: { matricula },
      data: {
        cpf,
        nomeCompleto,
        dataNascimento: new Date(dataNascimento),
        emailPessoal,
        emailFuncional,
        contato,
        observacao,
        unidade: unidadeId ? { connect: { id: unidadeId } } : undefined,
        cargo: cargoId ? { connect: { id: cargoId } } : undefined,
      },
    });

    return res.status(200).json(updatedPessoa);
  } catch (err) {
    console.error('Erro ao processar solicitação', err);
    return res.status(500).json({ error: 'Erro ao processar a solicitação' });
  }
};
