import React, { useState } from 'react';
import { 
  Box, Heading, VStack, Text, Flex, IconButton, Input, Select, Button 
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, AddIcon } from '@chakra-ui/icons';
import Modals from './Modals';
const BoxManagement = ({ titulo, dados, onSearch, onEdit, onDelete, onAdd }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  // Estados para controle dos modais:
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const filteredItems = dados.filter(item =>
    (item.unidade || item.cargo || item.servico || item.sistema || '')
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleModalSave = (novoNome) => {
    if (isAddOpen) {
      onAdd(novoNome);
    } else if (isEditOpen && selectedItem) {
      const itemAtualizado = { ...selectedItem };
  
      // Substituir "tipoAtual" por "titulo"
      if (titulo.includes('cargo')) {
        itemAtualizado.cargo = novoNome;
      } else if (titulo.includes('unidade')) {
        itemAtualizado.unidade = novoNome;
      } else if (titulo.includes('servico')) {
        itemAtualizado.servico = novoNome;
      } else if (titulo.includes('sistema')) {
        itemAtualizado.sistema = novoNome;
      }
  
      onEdit(itemAtualizado);
    } else if (isDeleteOpen) {
      onDelete(selectedItem);
    }
  
    setIsAddOpen(false);
    setIsEditOpen(false);
    setIsDeleteOpen(false);
    setSelectedItem(null);
  };
  const handleAddClick = () => {
    setSelectedItem(null);
    setIsAddOpen(true);
  };
  const handleEditClick = (item) => {
    setSelectedItem(item);
    setIsEditOpen(true);
  };
  const handleDeleteClick = (item) => {
    setSelectedItem(item);
    setIsDeleteOpen(true);
  };
  return (
    <>
      <Box 
        bg="white" 
        p={[3, 4, 5]} 
        borderRadius="lg" 
        boxShadow="lg" 
        width={["95%", "90%", "80%"]} 
        maxWidth="800px"
        mx="auto"
        my={4}
      >
        <Flex justifyContent="space-between" alignItems="center" mb={4}>
          <Heading size="md">{titulo}</Heading>
          <IconButton
            icon={<AddIcon />}
            colorScheme="green"
            onClick={handleAddClick}
            aria-label="Adicionar"
          />
        </Flex>
        <VStack spacing={4} width="100%">
          <Input
            placeholder="Pesquisar..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              onSearch(e.target.value);
            }}
          />
          <Select 
            value={itemsPerPage} 
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            <option value={5}>5 por página</option>
            <option value={10}>10 por página</option>
            <option value={20}>20 por página</option>
          </Select>
          <VStack spacing={2} align="stretch" width="100%" minHeight="300px">
            {currentItems.map((item, index) => (
              <Flex
                key={index}
                p={3}
                bg="gray.50"
                borderRadius="md"
                justifyContent="space-between"
                alignItems="center"
                _hover={{ bg: "gray.100" }}
                transition="background 0.2s"
              >
                <Text>{item.unidade || item.cargo || item.servico || item.sistema}</Text>
                <Flex>
                  <IconButton
                    icon={<EditIcon />}
                    colorScheme="blue"
                    size="sm"
                    mr={2}
                    onClick={() => handleEditClick(item)}
                    aria-label="Editar"
                  />
                  <IconButton
                    icon={<DeleteIcon />}
                    colorScheme="red"
                    size="sm"
                    onClick={() => handleDeleteClick(item)}
                    aria-label="Excluir"
                  />
                </Flex>
              </Flex>
            ))}
          </VStack>
          <Flex 
            justifyContent="center" 
            mt={4} 
            width="100%"
            flexWrap="wrap"
            gap={2}
          >
            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                key={i + 1}
                size="sm"
                colorScheme={currentPage === i + 1 ? "blue" : "gray"}
                onClick={() => paginate(i + 1)}
                minW="40px"
              >
                {i + 1}
              </Button>
            ))}
          </Flex>
        </VStack>
      </Box>
      <Modals
        tipoAtual={titulo}
        itemAtual={selectedItem}
        isAddOpen={isAddOpen}
        setIsAddOpen={setIsAddOpen}
        isEditOpen={isEditOpen}
        setIsEditOpen={setIsEditOpen}
        isDeleteOpen={isDeleteOpen}
        setIsDeleteOpen={setIsDeleteOpen}
        onSave={handleModalSave}
      />
    </>
  );
};
export default BoxManagement;