const dotenv = require('dotenv');
const connectDB = require('./config/db');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const routes = require ('./routes');
const { setupWebsocket } = require ('./websocket');

// Load config
require('dotenv').config();

const app = express();
const server = http.Server(app);

setupWebsocket(server);

app.use(cors());
app.use(express.json());
app.use(routes);

// Métodos HTTP: GET, POST, PUT, DELETE

// Tipos de Parâmetros:
// Query parms: request.query (Filtros, Ordenação, Paginação ...)
// Route parms: request.parms (Identificar um recurso na Alteração ou Remoção)
// Body: request.body (Dados para alteração ou criação de um registro)

const PORT = process.env.PORT || 3333;

// connect to mongo DB
connectDB();

server.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
