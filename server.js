const path = require('path');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const consultasRouter = require('./routes/consultas');
app.use('/api/consultas', consultasRouter);

app.get('/health', (_req, res) => res.send('OK'));

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
// Atualização de teste para Iteração 2
