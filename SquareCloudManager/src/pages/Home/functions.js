import axios from "axios";

// Função para obter dados de estatísticas de serviço
export async function getServiceStatistics() {
  try {
    const response = await axios.get(
      "http://localhost:10000/api/data/service/statistics"
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao obter estatísticas de serviço:", error);
    return null;
  }
}

// Função para obter dados de estatísticas de serviço
export async function getStatusApp(appID) {
  try {
    const response = await axios.get(
      `http://localhost:10000/api/data/applications/status/${appID}`
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao obter estatísticas de serviço:", error);
    return null;
  }
}

// Função para obter dados de um usuário por ID
export async function getUserByID(userID) {
  try {
    const response = await axios.get(
      `http://localhost:10000/api/data/users/${userID}`
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao obter dados do usuário:", error);
    return null;
  }
}

export async function getAppByID(appID) {
  try {
    const response = await axios.get(
      `http://localhost:10000/api/data/applications/${appID}`
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao obter dados do usuário:", error);
    return null;
  }
}
