import { Server } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import notificationSocket from './notification-socket.js';

export const setupSocketServer = (server: Server): SocketIOServer => {
  const io: SocketIOServer = new SocketIOServer(server, {
    cors: {
      origin: process.env.ORIGIN_CORS,
    },
  });

  io.on('connection', (socket) => {
    console.log('socked connected');

    // Listen for 'notifications'
    socket.on('notifications', () => {
      notificationSocket(io, socket);
    });

    socket.on('disconnect', function () {
      console.log('socket disconnected');
    });
  });

  return io;
};
