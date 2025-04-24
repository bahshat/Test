Here's the concise version with a message generator function:

```python
import random
from datetime import datetime

def generate_log_message():
    log_types = [
        ("DEBUG", "System check completed"),
        ("INFO", "New connection established"),
        ("WARNING", "High memory usage detected"),
        ("ERROR", "Failed to process request"),
        ("VERBOSE", "Background task running")
    ]
    category, message = random.choice(log_types)
    return f"[{datetime.now().isoformat()}] {category}: {message}"

# Example usage:
# ws.send(generate_log_message())
```

Add this to your WebSocket handler and replace the placeholder with `generate_log_message()`.

Would you like me to:
1. Add severity levels?
2. Include JSON formatted messages?
3. Add specific log patterns?