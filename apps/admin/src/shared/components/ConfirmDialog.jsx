// ConfirmDialog.js
import React from 'react';
import {
  AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Button
} from '@chakra-ui/react';

export const ConfirmDialog = ({ isOpen, onClose, onConfirm, cancelRef, selectedUsuario, chamadoInput }) => (
  <AlertDialog
    isOpen={isOpen}
    leastDestructiveRef={cancelRef}
    onClose={onClose}
  >
    <AlertDialogOverlay>
      <AlertDialogContent>
        <AlertDialogHeader fontSize="lg" fontWeight="bold">
          Confirmar Chamado
        </AlertDialogHeader>
        <AlertDialogBody>
          Tem certeza de que deseja salvar o Nº do Chamado: "{chamadoInput[selectedUsuario?.id]}"?
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onClose}>
            Cancelar
          </Button>
          <Button colorScheme="blue" onClick={onConfirm} ml={3}>
            Confirmar
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogOverlay>
  </AlertDialog>
);
