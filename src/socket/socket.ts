import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const initializeSocket = (accessToken: string): Socket => {
  socket = io("https://contentia-backend-s4pw.onrender.com", {
    auth: { accessToken },
  });
  return socket;
};

export const getSocket = (): Socket | null => socket;

export const disconnectSocket = (): void => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
