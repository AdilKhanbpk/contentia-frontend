import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

const socket_url = process.env.NEXT_PUBLIC_BACKEND_BASE_URL

export const initializeSocket = (accessToken: string): Socket => {
  socket = io(socket_url, {
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
