import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Text,
} from '@chakra-ui/react';
const Modals = ({
  tipoAtual,
  itemAtual,                   
  isAddOpen,                   
  setIsAddOpen,
  isEditOpen,                 
  setIsEditOpen,
  isDeleteOpen,                
  setIsDeleteOpen,
  onSave,                      
}) => {
  const [nome, setNome] = useState('');
  // Se itemAtual mudar ou quando for editar/adicionar, atualiza o valor do input:
  useEffect(() => {
    if (itemAtual && (isEditOpen || (!isEditOpen && !isAddOpen))) {
      setNome(itemAtual.nome || '');
    } else {
      setNome('');
    }
  }, [itemAtual, isEditOpen, isAddOpen]);
  const handleSave = () => {
    // Chama a função onSave com o valor do input (no caso de exclusão, esse valor pode ser ignorado)
    onSave(nome);
    onClose();
  };
  const onClose = () => {
    if (setIsAddOpen) setIsAddOpen(false);
    if (setIsEditOpen) setIsEditOpen(false);
    if (setIsDeleteOpen) setIsDeleteOpen(false);
  };
  return (
    <>
      {isAddOpen && (
        <Modal isOpen={isAddOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Adicionar {tipoAtual}</ModalHeader>
            <ModalBody>
              <Text>Digite o nome do {tipoAtual}:</Text>
              <Input
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder={`Nome do ${tipoAtual}`}
              />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="green" onClick={handleSave}>
                Adicionar
              </Button>
              <Button onClick={onClose} ml={3}>
                Cancelar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
      {isEditOpen && (
        <Modal isOpen={isEditOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Editar {tipoAtual}</ModalHeader>
            <ModalBody>
              <Text>Editar nome do {tipoAtual}:</Text>
              <Input
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder={`Nome do ${tipoAtual}`}
              />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={handleSave}>
                Salvar
              </Button>
              <Button onClick={onClose} ml={3}>
                Cancelar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
      {isDeleteOpen && (
        <Modal isOpen={isDeleteOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Excluir {tipoAtual}</ModalHeader>
            <ModalBody>
              <Text>Tem certeza de que deseja excluir este {tipoAtual}?</Text>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="red" onClick={handleSave}>
                Excluir
              </Button>
              <Button onClick={onClose} ml={3}>
                Cancelar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};
export default Modals;
