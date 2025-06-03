@echo off
echo Starting Backend...
cd /d "C:\Path\To\BackendFolder"

:: Run Backend.exe and keep console open
start "BackendWindow" cmd /k "Backend.exe"