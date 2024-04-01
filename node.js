const express = require('express');
const bodyParser = require('body-parser');
const { ChatGPT } = require('openai');

const app = express();
const port = process.env.PORT || 3000; // Use a porta fornecida pelo Vercel ou 3000 como padrão

app.use(bodyParser.json());

const openai = new ChatGPT({
    apiKey: process.env.OPENAI_API_KEY, // Use a variável de ambiente para a chave de API do OpenAI
    engine: 'davinci' // Especifique a versão do mecanismo que deseja usar
});

app.post('/api/chat', async (req, res) => {
    const { message } = req.body;

    try {
        console.log('Recebido novo pedido de chat:', message); // Log do pedido de chat recebido
        const response = await openai.complete({
            prompt: message,
            maxTokens: 150
        });
        const reply = response.choices[0].text.trim();
        console.log('Resposta do OpenAI:', reply); // Log da resposta do OpenAI
        res.json({ reply });
    } catch (error) {
        console.error('Erro ao processar a solicitação:', error); // Log de erro
        res.status(500).json({ error: 'Erro ao processar a solicitação.' });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
