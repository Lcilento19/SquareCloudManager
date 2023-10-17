// api_squarecloud.js
import axios from "axios";

export default async function api_Squarecloud() {
  try {
    const response = await axios.get("http://localhost:3001/api/data"); // Use a porta do servidor backend
    return response.data;
  } catch (error) {
    console.error("Erro na chamada para o servidor intermediário", error);
    throw error; // Rejeite o erro para que o chamador possa lidar com ele
  }
}
