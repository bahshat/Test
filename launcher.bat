# launch.ps1

# Step 1: Start backend
Start-Process -FilePath "C:\path\to\your\backend.exe"

# Step 2: Wait for backend to be ready
$ready = $false
while (-not $ready) {
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:5000/health" -UseBasicParsing -TimeoutSec 2
        if ($response.StatusCode -eq 200) {
            $ready = $true
        }
    } catch {
        Start-Sleep -Seconds 1
    }
}

# Step 3: Launch RNW frontend
Start-Process -FilePath "C:\path\to\your\ReactNativeWindowsApp.exe"