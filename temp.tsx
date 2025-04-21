from flask import Flask
from flask_socketio import SocketIO
import eventlet
import random
import time

eventlet.monkey_patch()

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

@app.route("/")
def index():
    return "WebSocket Server Running"

def emit_logs():
    log_levels = ['INFO', 'DEBUG', 'WARN', 'ERROR']
    while True:
        level = random.choice(log_levels)
        socketio.emit('log', f"[{level}] Sample log at {time.time()}", namespace='/')
        time.sleep(1)

def emit_status():
    for i in range(0, 101, 10):
        socketio.emit('statusUpdate', {'id': 'test-123', 'progress': f"{i}%"}, namespace='/')
        time.sleep(2)

@socketio.on('connect')
def on_connect():
    print("Client connected")

if __name__ == '__main__':
    socketio.start_background_task(target=emit_logs)
    socketio.start_background_task(target=emit_status)
    socketio.run(app, host='0.0.0.0', port=5000)