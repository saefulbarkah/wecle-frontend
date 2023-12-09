import { Server, Socket } from 'socket.io';

const notificationSocket = (io: Server, socket: Socket) => {
  socket.emit('notification', 'Hello from the server!');
};

export default notificationSocket;
