const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;
const appointmentRoutes = require('./routes/appointments')
const path = require('path'); // Importa path para servir arquivos estáticos

// Middleware para permitir o uso de JSON no corpo das requisições
app.use(express.json());

// Servir arquivos estáticos da pasta "public"
app.use(express.static(path.join(__dirname, 'Views')));

// Conectar ao banco de dados MongoDB
mongoose.connect('mongodb://localhost/agenda')
    .then(() => console.log('Conectado ao MongoDB'))
    .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

// Usar as rotas de compromissos
app.use('/appointments', appointmentRoutes);


// Rota inicial de teste

app.get('/cadastrar', (req, res) => {
    res.sendFile(path.join(__dirname, 'Views', 'cadastrar.html'));

});

app.get('/index', (req, res) =>{
    res.sendFile(path.join(__dirname, 'Views', 'index.html'));
});

app.get('/produtos', (req, res) => {
    res.sendFile(path.join(__dirname, 'Views', 'produtos.html'));
});

app.listen(PORT, () => {
    console.log(`O servidor está rodando em http://localhost:${PORT}`);
});
