const express = require('express');
const bodyParser = require('body-parser');
const { ChatGPT } = require('openai');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const openai = new ChatGPT({
    apiKey: process.env.OPENAI_API_KEY, // Use a variável de ambiente para a chave de API do OpenAI
    engine: 'davinci' // Especifique a versão do mecanismo que deseja usar
});

app.post('/api/chat', async (req, res) => {
    const { message } = req.body;

    try {
        const response = await openai.complete({
            prompt: message,
            maxTokens: 150
        });
        res.json({ reply: response.choices[0].text.trim() });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao processar a solicitação.' });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
