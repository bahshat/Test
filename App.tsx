Start-Transcript -Path "$env:TEMP\OchoaInstallLog.txt"

# Ensure script is running as administrator
If (-NOT ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole(`
    [Security.Principal.WindowsBuiltInRole] "Administrator"))
{
    Write-Host "Restarting as Administrator..."
    Start-Process powershell -ArgumentList "-ExecutionPolicy Bypass -File `"$PSCommandPath`"" -Verb RunAs
    exit
}

Write-Host "`n🚀 Installing Ochoa..." -ForegroundColor Cyan

# 1. Unzip setup.zip to Program Files
$destination = "C:\Program Files\Ochoa"
$setupZip = ".\setup.zip"  # Must be in same folder as install.ps1 or provide full path

if (Test-Path $setupZip) {
    Expand-Archive -Path $setupZip -DestinationPath $destination -Force
    Write-Host "✅ Unzipped to $destination"
} else {
    Write-Host "❌ setup.zip not found at $setupZip"
    exit 1
}

# 2. Create Start Menu shortcut to launcher.bat
$shortcutPath = "$env:ProgramData\Microsoft\Windows\Start Menu\Programs\Ochoa.lnk"
$launcherBat = "$destination\launcher.bat"
$iconPath = "$destination\Ochoa.ico"  # Optional

if (-not (Test-Path $launcherBat)) {
    Write-Host "❌ launcher.bat not found at $launcherBat"
    exit 1
}

$WshShell = New-Object -ComObject WScript.Shell
$Shortcut = $WshShell.CreateShortcut($shortcutPath)
$Shortcut.TargetPath = "schtasks.exe"
$Shortcut.Arguments = "/run /tn `"OchoaElevatedLauncher`""
$Shortcut.IconLocation = "$iconPath"
$Shortcut.Save()
Write-Host "✅ Created shortcut at $shortcutPath"

# 3. Create Scheduled Task to run launcher.bat as admin
$taskName = "OchoaElevatedLauncher"
$action = New-ScheduledTaskAction -Execute $launcherBat
$principal = New-ScheduledTaskPrincipal -UserId "BUILTIN\Administrators" -RunLevel Highest -LogonType Interactive
$trigger = New-ScheduledTaskTrigger -AtLogOn -Once
Register-ScheduledTask -TaskName $taskName -Action $action -Principal $principal -Trigger $trigger -Force
Write-Host "✅ Scheduled task created for admin launcher"

# 4. Install Frontend via Add-AppDevPackage.ps1
$addAppScript = "$destination\frontend\Add-AppDevPackage.ps1"  # Adjust path if needed

if (Test-Path $addAppScript) {
    Write-Host "📦 Installing MSIX frontend..."
    Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass -Force
    powershell -ExecutionPolicy Bypass -File $addAppScript
    Write-Host "✅ Frontend installed"
} else {
    Write-Host "⚠️ Add-AppDevPackage.ps1 not found"
}

Write-Host "`n🎉 Ochoa installation completed successfully!" -ForegroundColor Green

Stop-Transcript