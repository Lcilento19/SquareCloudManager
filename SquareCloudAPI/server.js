const express = require("express");
const axios = require("axios");
const cors = require("cors");
const dotenv = require("dotenv"); 

dotenv.config();

const app = express();
const port = process.env.PORT || 10000;
const apiKey = process.env.SQUARECLOUD_API_KEY;

app.use(express.json());
app.use(cors());

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

app.get("/api/data/applications/status/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const response = await axios.get(
      `https://api.squarecloud.app/v2/apps/${id}/status`,
      { headers: { Authorization: `${apiKey}` } }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Erro na chamada para a API SquareCloud:", error);
    res.status(500).json({ error: "Erro na chamada para a API SquareCloud" });
  }
});

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

app.get("/api/data/applications/:id", async (req, res) => {
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

app.get("/api/data/applications/logs/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(
      `https://api.squarecloud.app/v2/apps/${id}/logs`,
      { headers: { Authorization: `${apiKey}` } }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Erro na chamada para a API SquareCloud:", error);
    res.status(500).json({ error: "Erro na chamada para a API SquareCloud" });
  }
});


app.post("/api/data/applications/:id/start", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.post(
      `https://api.squarecloud.app/v2/apps/${id}/start`, 
      {},
      {
        headers: { Authorization: `${apiKey}` }, 
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Erro na chamada para a API SquareCloud:", error);
    res.status(500).json({ error: "Erro na chamada para a API SquareCloud" });
  }
});

app.post("/api/data/applications/:id/restart", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.post(
      `https://api.squarecloud.app/v2/apps/${id}/restart`, 
      {
        headers: { Authorization: `${apiKey}` }, 
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Erro na chamada para a API SquareCloud:", error);
    res.status(500).json({ error: "Erro na chamada para a API SquareCloud" });
  }
});

app.post("/api/data/applications/:id/stop", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.post(
      `https://api.squarecloud.app/v2/apps/${id}/stop`, 
      {},
      {
        headers: { Authorization: `${apiKey}` }, 
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Erro na chamada para a API SquareCloud:", error);
    res.status(500).json({ error: "Erro na chamada para a API SquareCloud" });
  }
});


app.listen(port, () => {
  console.log(`Servidor intermediário está rodando na porta ${port}`);
});
