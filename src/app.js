const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var server = require('http').Server(app);
var io = require('socket.io')(server);

var clientes = [];

var PORT = normalizePort(process.env.PORT || '81');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
server.listen(PORT, () => console.log('Servidor iniciado en ' 
 ));

//rutas
app.use(require('./routes/chat.routes'));

app.post('/login' , (req, res) => {
  let username = req.body.username;
  let id = req.body.id;
  clientes.push({ id, username });
  io.emit('socket_conectado', { id, username });
  return res.json(clientes);
});

app.post('/send', (req, res) => {
  let username = req.body.username;
  let id = req.body.id;
  let msg = req.body.text;
  io.emit('mensaje', { id, msg, username });
  return res.json({ text: 'Mensaje enviado.' });
});

app.use(express.static('/public'));

io.on('connection', socket => {
  console.log('Socket conectado', socket.id);
  socket.on('disconnect', () => {
    clientes = clientes.filter(cliente => cliente.id != socket.id);
    io.emit('socket_desconectado', {texto: 'Socket desconectado.', id: socket.id});
  });
});

module.exports = server;
