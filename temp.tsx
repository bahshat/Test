import { WEBSOCKET_BASE_URL } from './Constants';

let ws: WebSocket | null = null;
const listeners: Record<string, (data: any) => void> = {};

export const initWebSocket = () => {
  if (ws) return;

  ws = new WebSocket(WEBSOCKET_BASE_URL);

  ws.onopen = () => {
    console.log('WebSocket connected');
    ws?.send('GET::Logs');
  };

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data?.type && listeners[data.type]) {
      listeners[data.type](data.payload);
    }
  };

  ws.onerror = (err) => {
    console.error('WebSocket error:', err.message);
  };

  ws.onclose = () => {
    console.warn('WebSocket disconnected. Attempting reconnect...');
    ws = null;
    setTimeout(initWebSocket, 2000);
  };
};

export const subscribeTo = (type: string, callback: (data: any) => void) => {
  listeners[type] = callback;
};

export const unsubscribe = (type: string) => {
  delete listeners[type];
};