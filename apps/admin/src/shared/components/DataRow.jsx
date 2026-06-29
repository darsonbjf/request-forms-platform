// DataRow.js
import React from 'react';
import { Tr, Td, Button, Input, DarkMode } from '@chakra-ui/react';
import { formatDate } from '../utils/date.js';

export const DataRow = ({
  usuario, unidades, cargos, servicos, sistemas, chamadoInput,
  handleChamadoChange, handleOpenConfirmation
}) => (
  <Tr>
    <Td>{usuario.id}</Td>
    <Td>
      <Button size="xs" onClick={() => handleCopy(usuario)}>Copiar</Button>
    </Td>
    <Td>
      {usuario.chamadoId ? (
        usuario.chamadoId
      ) : (
        <Input
          size="sm"
          placeholder="Digite o Nº do Chamado"
          value={chamadoInput[usuario.id] || ''}
          onChange={(e) => handleChamadoChange(usuario.id, e.target.value)}
        />
      )}
      {!usuario.chamadoId && (
        <Button size="xs" onClick={() => handleOpenConfirmation(usuario)} ml={2}>
          Confirmar
        </Button>
      )}
    </Td>
    <Td>{formatDate(new Date(usuario.dataSolicitacao), true)}</Td>
    <Td>{usuario.nomeCompleto}</Td>
    <Td>{usuario.cpf}</Td>
    <Td>{formatDate(new Date(usuario.dataNascimento))}</Td>
    <Td>{usuario.emailPessoal}</Td>
    <Td>{usuario.emailFuncional}</Td>
    <Td>{usuario.matricula}</Td>
    <Td>{usuario.contato}</Td>
    <Td>{unidades[usuario.unidadeId] || 'N/A'}</Td>
    <Td>{cargos[usuario.cargoId] || 'N/A'}</Td>
    <Td>{servicos[usuario.servicoId] || 'N/A'}</Td>
    <Td>{sistemas[usuario.sistemaId] || 'N/A'}</Td>
    <Td>
      {usuario.anexo && (
        <Button size="xs" colorScheme="blue" onClick={() => handleDownload(usuario.id)}>
          Download
        </Button>
      )}
    </Td>
    <Td>{usuario.observacao}</Td>
    <Td>{usuario.ipAddress}</Td>
    <Td></Td>
  </Tr>
);

export default DataRow;