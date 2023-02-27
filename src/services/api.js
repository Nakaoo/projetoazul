import axios from "axios"

const api = axios.create({
  baseURL: `${process.env.REACT_APP_URL_API}/api/v1/`,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
})

api.interceptors.request.use((request) => {
  const token = localStorage.getItem("tk-user");

  if (token) {
    request.headers.Authorization = `Bearer ${(JSON.parse(token))}`;
  }
  return request;
});

api.interceptors.response.use((response) => {
  // Retorna a resposta caso a requisição tenha sucesso.
  return response;
}, async (error) => {
  // O config é responsável por manter todas as informações da sua request.
  const originalRequest = error.config;

  // verifica se recebeu status 401 (unauthorized)
  // verifica se já houve mais de uma tentativa de buscar o mesmo endpoint
  if (
    error?.response?.status === 401 &&
    !originalRequest?.__isRetryRequest
  ) {
    return (window.location.href = "/login");
  }

  // Parte necessária para retornar as requisições que não tiveram sucesso
  return Promise.reject(error);
});

export default api