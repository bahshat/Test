Excellent refinements! Here’s how to address each of your points clearly and effectively:

✅ 1. Remove MSIX’s Default Start Menu Icon

When installing an MSIX via Add-AppDevPackage.ps1, Windows automatically adds a Start Menu entry. Since we don’t want users launching the frontend directly:

❌ There’s no official way to suppress MSIX icon creation

But ✅ here’s what you can do:

✅ Workaround
	•	After installing the MSIX, delete the unwanted shortcut from the Start Menu:

Remove-Item "$env:APPDATA\Microsoft\Windows\Start Menu\Programs\OchoaApp.lnk" -ErrorAction SilentlyContinue



	You can place this in your install.ps1 right after Add-AppDevPackage.ps1 runs.

✅ 2. Fix: Shortcut Icon Not Reflecting

This usually happens because .ico file:
	•	Is missing or inaccessible at shortcut creation time
	•	Is removed/moved afterward
	•	Is not absolute path or not registered

✅ Fix: Use full absolute path

Make sure Ochoa.ico exists before shortcut is created, and use this in your script:

$iconPath = "C:\Program Files\OchoaLauncher\Ochoa.ico"

$Shortcut.IconLocation = "$iconPath,0"

✅ Make sure to copy .ico file before shortcut creation:

Copy-Item ".\Ochoa.ico" "C:\Program Files\OchoaLauncher\Ochoa.ico"

✅ 3. Make Launcher .bat Find Frontend App by Name

You cannot run "Ochoa.exe" directly if it’s an MSIX app, but you can search and launch it via AppxPackage name dynamically using PowerShell.

Here’s how to do it:

✅ Replace your current frontend launch line in .bat:

for /f "tokens=*" %%i in ('powershell -command "Get-StartApps | Where-Object { $_.Name -like '*Ochoa*' } | Select -ExpandProperty AppId"') do (
    explorer.exe shell:appsFolder\%%i
)

	This dynamically finds the App ID and launches it via shell:appsFolder\.

✅ This way:
	•	No hardcoded App ID
	•	Even if AppID changes across machines, it still works

✅ Bonus: Full Working .bat Snippet (Summarized)

@echo off
echo Launching Ochoa backend...

start "" /b /min "C:\Program Files\OchoaBackend\Backend.exe"

echo Waiting for backend...
:waitloop
powershell -Command ^
  "$r = try {Invoke-WebRequest -Uri 'http://127.0.0.1:5000/ping' -TimeoutSec 1 } catch { $null }; if (-not $r) { Start-Sleep -Milliseconds 500; exit 1 }"
if errorlevel 1 goto waitloop

echo Backend ready. Launching frontend...

:: Dynamically launch MSIX frontend
for /f "tokens=*" %%i in ('powershell -command "Get-StartApps | Where-Object { $_.Name -like '*Ochoa*' } | Select -ExpandProperty AppId"') do (
    start "" "explorer.exe" "shell:appsFolder\%%i"
)

:: Wait until app window closes
:waitwindow
powershell -Command ^
  "$running = Get-Process | Where-Object { $_.MainWindowTitle -like '*Ochoa*' }; if ($running) { Start-Sleep -Seconds 5; exit 1 }"
if errorlevel 1 goto waitwindow

echo Closing backend...
powershell -Command "Get-Process | Where-Object { $_.Path -like '*Backend.exe' } | Stop-Process -Force"

exit

Let me know if you want me to package all this logic into a prebuilt installer project (Inno Setup / WiX).