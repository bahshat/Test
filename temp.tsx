let socket: WebSocket | null = null;
const listeners: Record<string, (data: any) => void> = {};

export const initWebSocket = () => {
  if (socket) return;
  socket = new WebSocket('ws://localhost:5000/ws');

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.type && listeners[data.type]) {
      listeners[data.type](data.payload);
    }
  };

  socket.onclose = () => {
    socket = null;
  };
};

export const subscribeTo = (type: string, callback: (data: any) => void) => {
  listeners[type] = callback;
};

export const unsubscribe = (type: string) => {
  delete listeners[type];
};