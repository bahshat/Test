const WebSocket = require('ws');
const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
  console.log('Client connected');

  // Send dummy logs periodically
  setInterval(() => {
    const levels = ['debug', 'info', 'warning', 'error'];
    const level = levels[Math.floor(Math.random() * levels.length)];
    const message = `${new Date().toISOString()} [${level.toUpperCase()}] Dummy log message`;
    ws.send(JSON.stringify({ type: 'log', level, message }));
  }, 1000);

  // Send dummy execution status periodically
  let progress = 0;
  const interval = setInterval(() => {
    if (progress >= 100) return;
    progress += 10;
    ws.send(JSON.stringify({ type: 'status', progress }));
  }, 2000);
});

server.listen(8081, () => {
  console.log('WebSocket server running on ws://localhost:8081');
});