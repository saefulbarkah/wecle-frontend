import { Socket, io } from 'socket.io-client';

let socket: undefined | Socket;

// if (process.env.NODE_ENV === 'development') {
//   socket = io(process.env.NEXT_PUBLIC_API_URL as string, {
//     transports: ['websocket'],
//   });
// }

export { socket };
