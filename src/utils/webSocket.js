import { io } from "socket.io-client";

const webSocket = () => {
  const socket = io("http://localhost:9000", {
    reconnectionDelay: 1000,
    reconnection: true,
    reconnectionAttemps: 10,
    transports: ["websocket"],
    agent: false,
    upgrade: false,
    rejectUnauthorized: false,
  });
  return socket;
};

export default webSocket;
