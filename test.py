Here's the minimal Flask WebSocket server that continuously sends messages once connected:

```python
from flask import Flask
from flask_sock import Sock
import time

app = Flask(__name__)
sock = Sock(app)

@sock.route('/stream')
def message_stream(ws):
    while True:
        ws.send("PLACEHOLDER MESSAGE")  # Will replace this later
        time.sleep(1)  # Send every second

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
```

This will:
1. Accept WebSocket connections at `/stream`
2. Continuously send "PLACEHOLDER MESSAGE" every second
3. Keep the connection alive until client disconnects