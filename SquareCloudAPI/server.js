const express = require("express");
const axios = require("axios");
const cors = require("cors");
const dotenv = require("dotenv"); // Importe o dotenv

// Carregue as variáveis de ambiente do arquivo .env
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const apiKey = process.env.SQUARECLOUD_API_KEY;

app.use(express.json());
app.use(cors());

// Rota que lida com as solicitações para obter dados de estatísticas do serviço SquareCloud
app.get("/api/data/service/statistics", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.squarecloud.app/v2/service/statistics"
    );
    res.json(response.data);
  } catch (error) {
    console.error("Erro na chamada para a API SquareCloud:", error);
    res.status(500).json({ error: "Erro na chamada para a API SquareCloud" });
  }
});

// Rota que lida com as solicitações para obter dados de um usuário pelo ID (com autenticação)
app.get("/api/data/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(
      `https://api.squarecloud.app/v2/user/${id}`,
      { headers: { Authorization: `${apiKey}` } }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Erro na chamada para a API SquareCloud:", error);
    res.status(500).json({ error: "Erro na chamada para a API SquareCloud" });
  }
});

app.get("/api/data/aplications/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(
      `https://api.squarecloud.app/v2/apps/${id}`,
      { headers: { Authorization: `${apiKey}` } }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Erro na chamada para a API SquareCloud:", error);
    res.status(500).json({ error: "Erro na chamada para a API SquareCloud" });
  }
});

// Outras rotas que não requerem autenticação podem ser definidas aqui.

app.listen(port, () => {
  console.log(`Servidor intermediário está rodando na porta ${port}`);
});
