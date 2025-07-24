const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const TOKEN = "FaZjWx9cGDFyyIF3slMUUHdJZY0UcvOzod5LpAYW9X5TqplYy4PAm6nq27Jl";

app.post("/criar-pix", async (req, res) => {
  const { produto_id, email } = req.body;

  try {
    const resposta = await axios.post("https://api.goatpay.com.br/pagamentos", {
      produto_id,
      nome: "Lead do site",
      email
    }, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json"
      }
    });

    res.json(resposta.data);
  } catch (error) {
    console.error("Erro:", error.response?.data || error.message);
    res.status(500).json({ erro: "Erro ao gerar Pix com GoatPay" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor rodando na porta", PORT);
});
