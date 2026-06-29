import React, { useState, useEffect } from 'react';
import { Box, Button, VStack, useToast, Flex } from '@chakra-ui/react';
import Header from '../shared/components/Header';
import Sidebar from '../shared/components/Sidebar';
import BoxManagement from '../shared/components/BoxManagement';
import {
  getUnidades, getCargos, getServicos, getSistemas,
  createCargo, updateCargo, deleteCargo,
  createUnidade, updateUnidade, deleteUnidade,
  createServico, updateServico, deleteServico,
  createSistema, updateSistema, deleteSistema
} from '../shared/api/api.js';

const Gerenciamento = () => {
  const [dados, setDados] = useState({ unidades: [], cargos: [], servicos: [], sistemas: [] });
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSections, setActiveSections] = useState([]);
  const toast = useToast();

  const handleAdd = async (section) => {
    const novoNome = window.prompt(`Digite o nome do novo ${section.slice(0, -1)}`);
    if (!novoNome) return;
    try {
      let response;
      switch (section) {
        case 'cargos':
          response = await createCargo({ cargo: novoNome });
          break;
        case 'unidades':
          response = await createUnidade({ unidade: novoNome });
          break;
        case 'servicos':
          response = await createServico({ servico: novoNome });
          break;
        case 'sistemas':
          response = await createSistema({ sistema: novoNome });
          break;
        default:
          return;
      }
      fetchData(section);
      toast({
        title: "Sucesso",
        description: `${section.slice(0, -1)} adicionado com sucesso`,
        status: "success",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: `Erro ao adicionar ${section.slice(0, -1)}`,
        status: "error",
        duration: 3000,
      });
    }
  };

  const handleEdit = async (item) => {
    const novoNome = window.prompt("Digite o novo nome", item.cargo || item.unidade || item.servico || item.sistema);
    if (!novoNome) return;
    try {
      if (item.cargo) {
        await updateCargo(item.id, { cargo: novoNome });
        fetchData('cargos');
      } else if (item.unidade) {
        await updateUnidade(item.id, { unidade: novoNome });
        fetchData('unidades');
      } else if (item.servico) {
        await updateServico(item.id, { servico: novoNome });
        fetchData('servicos');
      } else if (item.sistema) {
        await updateSistema(item.id, { sistema: novoNome });
        fetchData('sistemas');
      }
      toast({
        title: "Sucesso",
        description: "Item atualizado com sucesso",
        status: "success",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao atualizar item",
        status: "error",
        duration: 3000,
      });
    }
  };

  const handleDelete = async (item) => {
    if (!window.confirm("Tem certeza que deseja excluir este item?")) return;
    try {
      if (item.cargo) {
        await deleteCargo(item.id);
        fetchData('cargos');
      } else if (item.unidade) {
        await deleteUnidade(item.id);
        fetchData('unidades');
      } else if (item.servico) {
        await deleteServico(item.id);
        fetchData('servicos');
      } else if (item.sistema) {
        await deleteSistema(item.id);
        fetchData('sistemas');
      }
      toast({
        title: "Sucesso",
        description: "Item excluído com sucesso",
        status: "success",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao excluir item",
        status: "error",
        duration: 3000,
      });
    }
  };

  const fetchData = async (section) => {
    try {
      let response;
      switch (section) {
        case 'unidades':
          response = await getUnidades();
          break;
        case 'cargos':
          response = await getCargos();
          break;
        case 'servicos':
          response = await getServicos();
          break;
        case 'sistemas':
          response = await getSistemas();
          break;
        default:
          return;
      }
      setDados(prev => ({ ...prev, [section]: response.data }));
    } catch (error) {
      console.error(`Erro ao buscar ${section}:`, error);
      toast({
        title: "Erro",
        description: `Erro ao carregar ${section}`,
        status: "error",
        duration: 3000,
      });
    }
  };

  const toggleSection = (section) => {
    if (!activeSections.includes(section)) {
      fetchData(section);
    }
    setActiveSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  return (
    <Flex>
      {/* Sidebar */}
      <Sidebar />

      {/* Conteúdo principal */}
      <Box flex="1" minH="100vh" bg="#f0f2f5">
        <Header mb={5} />
        <Box mt={10} bg="white" p={6} borderRadius="lg" boxShadow="lg" width="90%" maxWidth="650px" mx="auto">
          <VStack spacing={4} align="stretch">
            {['cargos', 'unidades', 'servicos', 'sistemas'].map(section => (
              <Box
                key={section}
                p={5}
                borderRadius="lg"
                boxShadow="md"
                bg="white"
                textAlign="center"
                cursor="pointer"
                _hover={{ boxShadow: "lg", transform: "scale(1.05)" }}
              >
                <Button
                  colorScheme="blue"
                  width="100%"
                  onClick={() => toggleSection(section)}
                >
                  Gerenciar {section}
                </Button>
                {activeSections.includes(section) && (
                  <BoxManagement
                    titulo={`${section}`}
                    dados={dados[section]}
                    onSearch={setSearchTerm}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onAdd={() => handleAdd(section)}
                  />
                )}
              </Box>
            ))}
          </VStack>
        </Box>
      </Box>
    </Flex>
  );
};

export default Gerenciamento;