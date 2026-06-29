import React from "react";
import { Box, Button, Heading, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Header = ({ title }) => {
  const navigate = useNavigate();

  return (
    <Box
      as="header"
      bg="white"
      w="100%"
      h="60px"
      px={6}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      boxShadow="md"
      position="fixed"
      top={0}
      zIndex={1000}
    >
      <Flex flex="1" justifyContent="center">
        <Heading as="h3" size="md" textAlign="center">
          {title}
        </Heading>
      </Flex>
      <Box w="48px" />
    </Box>
  );
};

export default Header;
