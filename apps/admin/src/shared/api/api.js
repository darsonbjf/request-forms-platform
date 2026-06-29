import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:3001';
const API_PREFIX = import.meta.env.VITE_API_PREFIX || '/forms';

const api = axios.create({
  baseURL: BASE_URL.replace(/\/+$/, ""),
});

const path = (route) => `${API_PREFIX.replace(/\/+$/, "")}${route}`;

export const login = (credentials) => api.post(path('/admin/login'), credentials);
export const verifySession = (config = {}) => api.get(path('/admin/requisicoes/verificacao'), config);

export const getUsuarios = () => api.get(path('/admin/requisicoes/verificacao'));

export const getCargos = () => api.get(path('/admin/cargos/verificacao'));
export const createCargo = (data) => api.post(path('/admin/cargos/cadastro'), data);
export const updateCargo = (id, data) => api.put(path(`/admin/cargos/${id}`), data);
export const deleteCargo = (id) => api.delete(path(`/admin/cargos/${id}`));

export const getServicos = () => api.get(path('/admin/servico-sistema/servico/verificacao'));
export const createServico = (data) => api.post(path('/admin/servico-sistema/servico/cadastro'), data);
export const updateServico = (id, data) => api.put(path(`/admin/servico-sistema/servico/${id}`), data);
export const deleteServico = (id) => api.delete(path(`/admin/servico-sistema/servico/${id}`));

export const getSistemas = () => api.get(path('/admin/servico-sistema/sistema/verificacao'));
export const createSistema = (data) => api.post(path('/admin/servico-sistema/sistema/cadastro'), data);
export const updateSistema = (id, data) => api.put(path(`/admin/servico-sistema/sistema/${id}`), data);
export const deleteSistema = (id) => api.delete(path(`/admin/servico-sistema/sistema/${id}`));

export const getUnidades = () => api.get(path('/admin/unidades/verificacao'));
export const createUnidade = (data) => api.post(path('/admin/unidades/cadastro'), data);
export const updateUnidade = (id, data) => api.put(path(`/admin/unidades/${id}`), data);
export const deleteUnidade = (id) => api.delete(path(`/admin/unidades/${id}`));

export const getUsers = () => api.get(path('/admin/usuarios/verificacao'));
export const createUser = (data) => api.post(path('/admin/usuarios/cadastro'), data);
export const updateUser = (id, data) => api.put(path(`/admin/usuarios/${id}`), data);
export const deleteUser = (id) => api.delete(path(`/admin/usuarios/${id}`));

export const downloadAnexo = (solicitacaoId, anexoCampo) =>
  api.get(path(`/admin/uploads/${solicitacaoId}/${anexoCampo}`), { responseType: 'blob' });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Exportação da API configurada
export default api;
