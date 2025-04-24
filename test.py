Here's a simple Flask app with WebSocket support using the `flask-sock` extension that mimics the echo server functionality. This will help you test your React Native WebSocket client:

### 1. Install Required Packages
```bash
pip install flask flask-sock
```

### 2. Create the Flask WebSocket Server (`app.py`)
```python
from flask import Flask
from flask_sock import Sock

app = Flask(__name__)
sock = Sock(app)

@sock.route('/echo')
def echo(ws):
    print("WebSocket connection established")
    
    while True:
        try:
            message = ws.receive()
            print(f"Received: {message}")
            
            # Echo the message back
            ws.send(f"Echo: {message}")
            
        except Exception as e:
            print(f"Error: {e}")
            break

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
```

### 3. Run the Server
```bash
python app.py
```

### 4. Connect from Your React Native App
In your network.ts file:

```typescript
export const connectToFlaskWebSocket = () => {
    // Replace with your actual server IP if not running locally
    const ws = new WebSocket('ws://localhost:5000/echo');

    ws.onopen = () => {
        console.log('Connected to Flask WebSocket');
        ws.send('Hello Flask!');
    };

    ws.onmessage = (event) => {
        console.log('Received from Flask:', event.data);
        // Should log "Echo: Hello Flask!"
    };

    ws.onerror = (error) => {
        console.error('WebSocket error:', error);
    };

    ws.onclose = (event) => {
        console.log('Disconnected from Flask WebSocket');
    };

    return () => {
        ws.close();
    };
};
```

### Testing Options:

1. **Test with React Native App**:
   - Call `connectToFlaskWebSocket()` from your component
   - Check console logs for connection status and messages

2. **Test with Command Line** (to verify server works independently):
   ```bash
   wscat -c ws://localhost:5000/echo
   > Test message
   < Echo: Test message
   ```

### Important Notes:
1. If testing on a physical device, replace `localhost` with your computer's local IP address
2. Ensure your firewall allows connections on port 5000
3. For production, you'll want to add:
   - Error handling
   - Connection timeouts
   - Potentially authentication
   - WSS (secure WebSocket) instead of WS

Would you like me to add any specific features to this basic echo server, like message broadcasting or handling JSON data?