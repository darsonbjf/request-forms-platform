import React from 'react';
import { Box, SimpleGrid, Text, VStack, Icon, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaFileInvoiceDollar, FaFileAlt } from 'react-icons/fa';
import Sidebar from '../shared/components/Sidebar';
import Header from '../shared/components/Header';

const Home = () => {
  const navigate = useNavigate();

  const items = [
    { icon: FaUser, label: "Painel Administrativo", route: "/admin" },
    { icon: FaFileAlt, label: "Gerenciamento", route: "/gerenciamento" },
    { icon: FaFileAlt, label: "Painel", route: "/teste" },
  ];

  return (
    <Flex>
      <Sidebar />

      <Box flex="1" minH="100vh" bg="#f0f2f5">
      <Header mb={5} />

        <Box p={5} display="flex" flexDirection="column" alignItems="center">
          <SimpleGrid columns={[1, 2, 3]} spacing={20} mt={20}>
            {items.map((item, index) => (
              <Box
                key={index}
                p={5}
                borderRadius="lg"
                boxShadow="md"
                bg="white"
                textAlign="center"
                cursor="pointer"
                onClick={() => navigate(item.route)}
                _hover={{ boxShadow: "lg", transform: "scale(1.05)" }}
              >
                <VStack spacing={3}>
                  <Icon as={item.icon} boxSize={10} />
                  <Text fontWeight="bold">{item.label}</Text>
                </VStack>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </Box>
    </Flex>
  );
};

export default Home;
