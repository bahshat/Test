// In your network.ts file
export const testWebSocketConnection = () => {
  const ws = new WebSocket('wss://echo.websocket.org');

  ws.onopen = () => {
    console.log('WebSocket connection opened');
    ws.send('Test message from React Native');
  };

  ws.onmessage = (event) => {
    console.log('Received message:', event.data);
    // This should log "Test message from React Native" from the echo server
  };

  ws.onerror = (error) => {
    console.error('WebSocket error:', error);
  };

  ws.onclose = (event) => {
    console.log('WebSocket connection closed:', event.code, event.reason);
  };

  return () => {
    ws.close();
  };
};