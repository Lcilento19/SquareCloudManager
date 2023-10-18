import axios from "axios";

const baseURL = "https://squarecloudapi.onrender.com/api/data/";

// Função para obter dados de estatísticas de serviço
export async function getServiceStatistics() {
  try {
    const response = await axios.get(`${baseURL}service/statistics`);
    return response.data;
  } catch (error) {
    console.error("Erro ao obter estatísticas de serviço:", error);
    return null;
  }
}

// Função para obter dados de estatísticas de serviço
export async function getStatusApp(appID) {
  try {
    const response = await axios.get(`${baseURL}applications/status/${appID}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao obter estatísticas de serviço:", error);
    return null;
  }
}

// Função para obter dados de um usuário por ID
export async function getUserByID(userID) {
  try {
    const response = await axios.get(`${baseURL}users/${userID}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao obter dados do usuário:", error);
    return null;
  }
}

export async function getAppByID(appID) {
  try {
    const response = await axios.get(`${baseURL}applications/${appID}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao obter dados do usuário:", error);
    return null;
  }
}

export async function startApp(appID) {
  try {
    const response = await axios.post(`${baseURL}applications/${appID}/start`);
    return response.data;
  } catch (error) {
    console.error("Erro ao obter dados do usuário:", error);
    return null;
  }
}

export async function stopApp(appID) {
  try {
    const response = await axios.post(`${baseURL}applications/${appID}/stop`);
    return response.data;
  } catch (error) {
    console.error("Erro ao obter dados do usuário:", error);
    return null;
  }
}

export async function restartApp(appID) {
  try {
    const response = await axios.post(
      `${baseURL}applications/${appID}/restart`
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao obter dados do usuário:", error);
    return null;
  }
}
