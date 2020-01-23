const express = require('../node_modules/express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const routes = require('./routes');


// Permite ligar com rotas, parametros e rotas para os clientes
const app = express();

// Raliza a divisão do sevidor para http e web socket
const server = require('http').Server(app);
const io = require('socket.io')(server);

mongoose.connect('mongodb+srv://admin:admin@cluster0-67kjz.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use((req,res, next)=>{
  req.io = io;

  next();
})

// permite que o app acesse o backend em react mesmo estando em dominios diferentes, uma entrada de segurança do node.
app.use(cors());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));

app.use(express.json());
app.use(routes);

server.listen(3333);
