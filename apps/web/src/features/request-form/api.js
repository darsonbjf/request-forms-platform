import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3001";
const API_PREFIX = import.meta.env.VITE_API_PREFIX || "/forms";

const api = axios.create({
  baseURL: `${BASE_URL.replace(/\/+$/, "")}`,
});

const path = (route) => `${API_PREFIX.replace(/\/+$/, "")}${route}`;

export const getCargos = () => api.get(path("/public/cargos"));
export const getUnidades = () => api.get(path("/public/unidades"));
export const getServicos = () => api.get(path("/public/servicos"));
export const getSistemas = () => api.get(path("/public/sistemas"));

export const verificarArquivoNecessario = (selectedServicos, selectedSistemas, selectedCargos) => {
  return api.post(path("/requirements/submit"), {
    servicoId: selectedServicos.value,
    sistemaId: selectedSistemas.value,
    cargoId: selectedCargos.value,
  });
};

export const enviarFormulario = (formData) => {
  return api.post(path("/upload/"), formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
