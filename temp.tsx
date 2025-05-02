export const LOG_TYPES = ['info', 'debug', 'warning', 'error', 'verbose'] as const;

export const LOG_COLOUR: Record<string, string> = {
  error: 'red',
  warning: 'orange',
  debug: 'cyan',
  verbose: 'gray',
  info: 'white',
};

export const WEBSOCKET_BASE_URL = 'ws://localhost:3000/ws'; // Update as needed