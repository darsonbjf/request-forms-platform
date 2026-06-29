import React, { useState, useEffect } from 'react';
import { getUsuarios, downloadAnexo } from '../shared/api/api.js';
import {
  Table, Thead, Tbody, Tr, Th, Td, Button, Input, useDisclosure, Box, Flex
} from '@chakra-ui/react';
import {
  AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay
} from '@chakra-ui/react';
import Header from '../shared/components/Header';

const Admin = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [chamadoInput, setChamadoInput] = useState({});
  const [selectedUsuario, setSelectedUsuario] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usuariosResponse = await getUsuarios();
        setUsuarios(usuariosResponse.data.sort((a, b) => a.id - b.id));
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };
    fetchData();
  }, []);

  const handleDownload = async (solicitacaoId, anexoCampo) => {
    try {
      const response = await downloadAnexo(solicitacaoId, anexoCampo);
  
      const blob = new Blob([response.data], { type: response.headers['content-type'] });
  
      const url = URL.createObjectURL(blob);
  
      const filename = `${anexoCampo}-${solicitacaoId}.${response.headers['content-type'].split('/')[1] || 'file'}`;
  
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
  
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Erro ao baixar o arquivo:', error);
    }
  };

  const handleCopy = (usuario) => {
    const texto = 
     `CPF: ${usuario.cpf}
      Nome Completo: ${usuario.nomeCompleto}
      Data de Nascimento: ${usuario.dataNascimento}
      Matrícula: ${usuario.matricula}
      Email Pessoal: ${usuario.emailPessoal}
      Email Funcional: ${usuario.emailFuncional}
      Contato: ${usuario.contato}
      Observação: ${usuario.observacao}
      Cargo: ${usuario.cargo}
      Serviço: ${usuario.servico}
      Sistema: ${usuario.sistema}
      Anexo 1: ${usuario.anexo1?.filename || 'Nenhum Anexo'}
      Anexo 2: ${usuario.anexo2?.filename || 'Nenhum Anexo'}`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(texto)
        .then(() => console.log('Dados copiados com sucesso!'))
        .catch((error) => {
          console.error('Erro ao copiar os dados:', error);
          fallbackCopyToClipboard(texto);
        });
    } else {
      fallbackCopyToClipboard(texto);
    }
  };

  const fallbackCopyToClipboard = (text) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      console.log('Dados copiados com sucesso (fallback)!');
    } catch (err) {
      console.error('Erro ao copiar os dados (fallback):', err);
    }
    document.body.removeChild(textArea);
  };

  const formatDate = (date, includeTime = false) => {
    const localDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
    const options = {
      year: 'numeric', month: '2-digit', day: '2-digit',
      ...(includeTime && {
        hour: '2-digit', minute: '2-digit', second: '2-digit',
      }),
      timeZone: 'America/Fortaleza',
    };
    return new Intl.DateTimeFormat('pt-BR', options).format(localDate);
  };

  const handleConfirmChamado = () => {
    if (selectedUsuario) {
      setUsuarios((prevUsuarios) =>
        prevUsuarios.map((usuario) =>
          usuario.id === selectedUsuario.id ? { ...usuario, chamadoId: chamadoInput[selectedUsuario.id] } : usuario
        )
      );
    }
    onClose();
  };

  const handleChamadoChange = (id, value) => {
    setChamadoInput((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleOpenConfirmation = (usuario) => {
    setSelectedUsuario(usuario);
    onOpen();
  };

  return (
    
    <Box p={5} bg="#f0f2f5" minHeight="100vh">
      <Flex justifyContent="center" mb={50}>
        <Header mb={5}/>
      </Flex>
      <Box width="100%" maxWidth="1800px" mx="auto" overflowX="auto">
        <Table colorScheme="blue" size="sm">
          <Thead bg="blue.400">
            <Tr>
              <Th color="white">ID</Th>
              <Th color="white">Copiar</Th>
              <Th color="white">Nº do Chamado</Th>
              <Th color="white">Data Solicitação</Th>
              <Th color="white">Nome Completo</Th>
              <Th color="white">CPF</Th>
              <Th color="white">Data de Nascimento</Th>
              <Th color="white">Email Pessoal</Th>
              <Th color="white">Email Funcional</Th>
              <Th color="white">Matrícula</Th>
              <Th color="white">Contato</Th>
              <Th color="white">Unidade</Th>
              <Th color="white">Cargo</Th>
              <Th color="white">Serviço</Th>
              <Th color="white">Sistema</Th>
              <Th color="white">Anexo 1</Th>
              <Th color="white">Anexo 2</Th>
              <Th color="white">Observação</Th>
              <Th color="white">IP Address</Th>
              <Th color="white">Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            {usuarios.map((usuario) => (
              <Tr key={usuario.id}>
                <Td>{usuario.id}</Td>
                <Td>
                  <Button ssize="sm" colorScheme="blue"onClick={() => handleCopy(usuario)}>Copiar</Button>
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
                <Td>{formatDate(new Date(usuario.dataSolicitacao), false)}</Td>
                <Td>{usuario.nomeCompleto}</Td>
                <Td>{usuario.cpf}</Td>
                <Td>{formatDate(new Date(usuario.dataNascimento))}</Td>
                <Td>{usuario.emailPessoal}</Td>
                <Td>{usuario.emailFuncional}</Td>
                <Td>{usuario.matricula}</Td>
                <Td>{usuario.contato}</Td>
                <Td>{usuario.unidade || 'N/A'}</Td>
                <Td>{usuario.cargo || 'N/A'}</Td>
                <Td>{usuario.servico || 'N/A'}</Td>
                <Td>{usuario.sistema || 'N/A'}</Td>
                <Td>
                  {usuario.anexo1 ? (
                    <Button size="sm" colorScheme="blue" onClick={() => handleDownload(usuario.id, 'anexo1')}>
                    Baixar Anexo 1
                  </Button>
                  ) : (
                    'Nenhum Anexo'
                  )}
                </Td>
                <Td>
                  {usuario.anexo2 ? (
                    <Button size="sm" colorScheme="blue" onClick={() => handleDownload(usuario.id, 'anexo2')}>
                    Baixar Anexo 2
                  </Button>
                  ) : (
                    'Nenhum Anexo'
                  )}
                </Td>

                <Td>{usuario.observacao || 'N/A'}</Td>
                <Td>{usuario.ipAddress || 'N/A'}</Td>
                <Td>
                  <Button size="sm" colorScheme="blue" onClick={() => handleCopy(usuario)}>
                    
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default Admin;
