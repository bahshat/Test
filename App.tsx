for /f "delims=" %%i in ('powershell -command "(Get-AppxPackage -Name Ochoa).InstallLocation"') do set "OCHOA_PATH=%%i"

echo Ochoa app is installed at: %OCHOA_PATH%

start "" "%OCHOA_PATH%\AppExecutable.exe"