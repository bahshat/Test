import subprocess
import time

# Launch backend.exe (detached)
p = subprocess.Popen(["Backend.exe"], creationflags=subprocess.CREATE_NEW_CONSOLE)

print("Backend started. Waiting...")
try:
    while True:
        time.sleep(1)
except KeyboardInterrupt:
    print("Stopping backend...")
    p.terminate()