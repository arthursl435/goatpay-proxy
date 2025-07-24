const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/criar-pix", async (req, res) => {
  const { produto_id, email } = req.body;

  try {
    const resposta = await fetch("https://api.goatpay.com.br/pagamentos", {
      method: "POST",
      headers: {
        "Authorization": "Bearer FaZjWx9cGDFyyIF3slMUUHdJZY0UcvOzod5LpAYW9X5TqplYy4PAm6nq27Jl",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        produto_id,
        nome: "Lead do Site",
        email
      })
    });

    const dados = await resposta.json();
    res.json(dados);
  } catch (e) {
    res.status(500).json({ erro: "Erro ao gerar Pix", detalhes: e.message });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Proxy rodando!");
});