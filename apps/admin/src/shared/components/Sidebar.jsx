import React, { useEffect, useState } from 'react';
import { Box, Text, VStack, Button, Divider, Icon } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { getUsers } from '../api/api.js';
import { FaHome, FaUser } from 'react-icons/fa'; // Importa o ícone de casa e o ícone de usuário

const Sidebar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUsers();
        if (response.data.length > 0) {
          setUser(response.data[0]);
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    };
    fetchUser();
  }, []);

  return (
    <Box
      w="250px"
      h="100vh"
      bg="white"
      boxShadow="2xl"
      p={5}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      position="fixed"
      top="0" 
      left="0" 
      zIndex="1000"
    >
      {/* Seção de usuário */}
      <VStack spacing={3} align="center" w="100%">
        {user ? (
          <>
            <Icon as={FaUser} boxSize={10} color="blue.500" /> {/* Ícone de usuário */}
            <Text fontWeight="bold" fontSize="lg" textAlign="center">{user.nome}</Text>
            <Text fontSize="md" color="gray.600" textAlign="center">{user.nivelPermissao}</Text>
            <Text fontSize="sm" color="gray.500" textAlign="center">{user.cpf}</Text>
          </>
        ) : (
          <Text textAlign="center">Carregando...</Text>
        )}
      </VStack>
  
      {/* Botão de Início */}
      <Button
        colorScheme="blue"
        width="100%"
        mt={4} // Adiciona margem superior para espaçamento
        onClick={() => navigate('/home')}
        leftIcon={<Icon as={FaHome} />}
      >
        Início
      </Button>
  
      <Divider mt={4} /> {/* Divisor abaixo do botão "Início" */}
  
      {/* Botão de Logout */}
      <Button colorScheme="red" onClick={() => navigate('/login')} width="100%">
        Logout
      </Button>
    </Box>
  );
};

export default Sidebar;