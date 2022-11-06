const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const users = require('./routes/users');
const logger = require('./middlewares/logger');

const app = express();

const server = http.createServer(app);

// Load env vars
dotenv.config({ path: '.env' });

// http protocol _____________________________________

// Middlewares
app.use(logger);
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
app.use(cors({ origin: 'http://localhost:5500' }));

app.use('/', users); // api/v1/users
// ___________________________________________________

// web socket ________________________________________
const io = new Server(server, {
  cors: { origin: 'http://localhost:5500' },
});

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);

  socket.on('message', (msg) => console.log({ msg }));

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
// ___________________________________________________

// Port
const PORT = process.env.PORT || 8888;

// Listen
server.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
