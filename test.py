@echo off
title Launching Ochoa App

:: Step 1: Launch backend
echo Starting Backend...
start "" /b /min "C:\Path\To\Backend.exe"

:: Step 2: Wait until backend is accepting requests
echo Waiting for backend to be ready...
:waitloop
powershell -Command ^
  "$res = try {Invoke-WebRequest -Uri 'http://127.0.0.1:5000/ping' -TimeoutSec 1 } catch { $null }; if (-not $res) { Start-Sleep -Milliseconds 500; exit 1 }"
if errorlevel 1 goto waitloop

echo Backend is ready.

:: Step 3: Launch frontend (.exe or MSIX)
echo Launching Frontend...
start "" /wait "C:\Path\To\Ochoa.exe"

:: Step 4: Kill backend after frontend closes
echo Closing backend...
powershell -Command "Get-Process | Where-Object { $_.Path -like '*Backend.exe' } | Stop-Process -Force"

exit