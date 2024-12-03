"use client";
import io from "socket.io-client";

export function createSocket() {
  const accessToken = localStorage.getItem("accessToken");
  const socket_url = "http://localhost:3001";
  return io(socket_url, {
    auth: {
      accessToken: accessToken,
    },
  });
}
