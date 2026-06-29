import axios from 'axios';
import { jwtDecode } from "jwt-decode";

const APP_KEY = import.meta.env.VITE_EXTERNAL_AUTH_APP_KEY || '';
const AUTH_BASE_URL = import.meta.env.VITE_EXTERNAL_AUTH_BASE_URL || '';
const LOGIN_URL = AUTH_BASE_URL && APP_KEY ? `${AUTH_BASE_URL}/login?app-key=${APP_KEY}` : '';
const API_URL = AUTH_BASE_URL ? `${AUTH_BASE_URL}/api/auth/me` : '';

// Redireciona o usuário para a tela de login do Acesso Cidadão
export const login = () => {
  if (!LOGIN_URL) {
    throw new Error('Provedor externo de autenticação não configurado.');
  }
  window.location.href = LOGIN_URL;
};

// Faz logout removendo o token armazenado
export const logout = (navigate) => {
  localStorage.removeItem('access_token');
  navigate('/');
};

// Obtém os dados do usuário logado através da API
export const fetchUserData = async () => {
  const token = localStorage.getItem('access_token');
  if (!token || !API_URL || !APP_KEY) return null;

  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Accept-Client': APP_KEY,
      },
    });
    console.log('Dados do usuário recebidos da API:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao obter dados do usuário:', error.response?.data || error.message);
    return null;
  }
};

// Captura o token da URL, armazena no localStorage e obtém os dados do usuário
export const handleAuthRedirect = async (setUser, setLoading) => {
  const params = new URLSearchParams(window.location.search);
  const accessToken = params.get('token');

  if (accessToken) {
    localStorage.setItem('access_token', accessToken);
    try {
      // Decodificar o token para obter informações básicas
      const decoded = jwtDecode(accessToken);
      console.log('Token decodificado:', decoded);
      
      const userData = await fetchUserData();
      if (userData) {
        setUser({
          id: userData.identifier || decoded.identifier || 'ID não disponível',
          name: userData.name || decoded.name || 'Usuário sem nome',
        });
        console.log('Usuário autenticado:', userData);
      }
    } catch (error) {
      console.error('Erro ao processar autenticação:', error);
    }
  }
  setLoading(false);
};
