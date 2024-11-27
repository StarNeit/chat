import express from 'express';
import { json } from 'body-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import httpContext from 'express-http-context';
import { Socket } from 'socket.io';

import handleSocket from "./socket/handleSocket";

import './config/mongoose';

import RootRouter from './routes';

const app = express();

app.use(helmet());

app.use(httpContext.middleware);

app.use(cors());

app.use(express.static('public/images'));

app.use(json());
app.use(morgan('tiny'));
app.use('/api/v1', RootRouter);

const http = app.listen(8080, () => {
  console.log('server is listening on port 8080');
});

const io = require('socket.io')(http, {
  path: '/api/chat',
  cors: {
    origin: '*',
  }
});
io.on('connection', (socket: Socket) => {
  console.log('socket is connected');
  socket.emit('connection', null);

  handleSocket(socket);
})
