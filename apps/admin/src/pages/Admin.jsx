import React from 'react';
import { Box, Center, Card, CardBody, Heading, Flex } from '@chakra-ui/react'; 
import Header from '../shared/components/Header';
import Sidebar from '../shared/components/Sidebar'; 

const ManutencaoPage = () => {
  return (
    <Flex>
      {/* Sidebar */}
      <Sidebar />

      {/* Conteúdo principal */}
      <Box flex="1" minH="100vh" bg="#f0f2f5">
        <Header mb={5} />
        <Box minHeight="100vh" display="flex" justifyContent="center" alignItems="center" bg="gray.100" mt={5}>
          <Card maxW="sm" borderRadius="lg" shadow="lg" overflow="hidden">
            <CardBody>
              <Center>
                <Heading as="h1" size="lg" color="blue.500">
                  Manutenção
                </Heading>
              </Center>
            </CardBody>
          </Card>
        </Box>
      </Box>
    </Flex>
  );
};

export default ManutencaoPage;