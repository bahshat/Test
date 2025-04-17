@echo off
SETLOCAL

:: 1. Launch Ochoa App (React Native Windows App)
:: Try multiple common Start Menu locations
if exist "%ProgramData%\Microsoft\Windows\Start Menu\Programs\Ochoa.lnk" (
    start "" "%ProgramData%\Microsoft\Windows\Start Menu\Programs\Ochoa.lnk"
) else if exist "%APPDATA%\Microsoft\Windows\Start Menu\Programs\Ochoa.lnk" (
    start "" "%APPDATA%\Microsoft\Windows\Start Menu\Programs\Ochoa.lnk"
) else (
    echo Could not find Ochoa in Start Menu.
    echo Manually locate Ochoa.exe and update this script.
    pause
    exit /b 1
)

:: 2. Launch Backend (run.exe)
:: Check common installation paths
set BACKEND_PATHS=(
    "C:\Program Files\Ochoa\run.exe"
    "C:\Program Files (x86)\Ochoa\run.exe"
    "%LOCALAPPDATA%\Programs\Ochoa\run.exe"
    "%~dp0run.exe"  %== Same folder as batch file ==%
)

for %%i in %BACKEND_PATHS% do (
    if exist "%%i" (
        start "" "%%i"
        goto BACKEND_LAUNCHED
    )
)

echo Could not find run.exe. Tried:
for %%i in %BACKEND_PATHS% do echo   %%i
pause
exit /b 1

:BACKEND_LAUNCHED
echo Both Ochoa and backend launched successfully!
timeout /t 3 >nul  %== Auto-close after 3 seconds ==%