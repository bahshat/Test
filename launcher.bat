import { spawn } from 'child_process';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

// Launch backend only once
const backendProcess = spawn('C:\\Path\\To\\Your\\Backend.exe', [], {
  detached: true,
  stdio: 'ignore', // or 'inherit' to see logs
});

backendProcess.unref(); // Let it run independently

AppRegistry.registerComponent(appName, () => App);