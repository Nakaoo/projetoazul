import axios from "axios"

const api = axios.create({
    baseURL: "https://api.dkawasaka.com/api/v1",
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
  }
})

api.interceptors.request.use((request) => {
  const token = localStorage.getItem("tk-user");
  
  if(token) {
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
      originalRequest.retry = true;
      // Buscando seu refreshToken salvo no localstorage ou qualquer outro local
      const refreshToken = localStorage.getItem("tk-user");
      if(!refreshToken) {
          // Limpa o localStorage para evitar redirecionamento automático da possível configuração em suas rotas
          localStorage.removeItem('tk-user');
          // Redireciona automáticamente o usuário para uma rota aqui utilizei "/" que é para login
          return (window.location.href = "/login");
      }
      
      return api(originalRequest);
  }
  
  // Parte necessária para retornar as requisições que não tiveram sucesso
  return Promise.reject(error);
});

export default api