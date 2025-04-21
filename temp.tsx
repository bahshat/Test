def emit_logs():
    log_levels = ['INFO', 'DEBUG', 'WARN', 'ERROR']
    while True:
        level = random.choice(log_levels)
        log = f"[{level}] Sample log at {time.time()}"
        print("Emitting log:", log)  # Add this
        socketio.emit('log', log)
        time.sleep(1)