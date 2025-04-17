@echo off
SETLOCAL

:: Launch Ochoa silently (using PowerShell)
powershell -command "Start-Process -FilePath '%APPDATA%\Microsoft\Windows\Start Menu\Programs\Ochoa.lnk'"

:: Launch backend silently
powershell -command "Start-Process -FilePath 'C:\path\to\run.exe'"