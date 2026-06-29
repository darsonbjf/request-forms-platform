import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginRequest, verifySession } from "../shared/api/api.js";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Alert,
  AlertIcon,
  VStack,
} from "@chakra-ui/react";

function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    verifyToken();
  }, []);

  const verifyToken = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await verifySession({
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.status === 200) {
          setUser(response.data.user);
          navigate("/home");
        }
      } catch (err) {
        setError("Sessão expirada. Faça login novamente.");
      }
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await loginRequest({
        username,
        password,
      });
      const token = response.data?.token;
      if (token) {
        localStorage.setItem("token", token);
        setUser({ name: username });
        navigate("/home");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Credenciais inválidas. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="center" height="100vh" bg="#f0f2f5" fontFamily="Arial, sans-serif">
      <VStack spacing={4} width="300px">
        <Heading as="h2" size="lg" textAlign="center" color="#333">Login</Heading>
        <Box p={5} bg="white" borderRadius="md" boxShadow="md" width="100%">
          <FormControl isRequired>
            <FormLabel htmlFor="username">Usuário</FormLabel>
            <Input id="username" type="text" placeholder="Usuário" value={username} onChange={(e) => setUsername(e.target.value)} />
          </FormControl>
          <FormControl isRequired mt={4}>
            <FormLabel htmlFor="password">Senha</FormLabel>
            <Input id="password" type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
          {error && (
            <Alert status="error" mt={4}>
              <AlertIcon />
              {error}
            </Alert>
          )}
          <Button mt={4} colorScheme="blue" onClick={handleLogin} width="full" isDisabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </Box>
      </VStack>
    </Box>
  );
}

export default Login;
