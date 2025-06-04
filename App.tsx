# Ensure script is running as administrator
If (-NOT ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole(`
    [Security.Principal.WindowsBuiltInRole] "Administrator"))
{
    Write-Host "Restarting as Administrator..."
    Start-Process powershell -ArgumentList "-ExecutionPolicy Bypass -File `"$PSCommandPath`"" -Verb RunAs
    exit
}

Write-Host "Uninstalling Ochoa..." -ForegroundColor Cyan

# 1. Remove installed backend + launcher files
$backendPath = "C:\Program Files\Ochoa"
if (Test-Path $backendPath) {
    Remove-Item -Path $backendPath -Recurse -Force
    Write-Host "✅ Removed $backendPath"
} else {
    Write-Host "⚠️ Backend folder not found: $backendPath"
}

# 2. Remove shortcut from Start Menu
$shortcutPath = "$env:ProgramData\Microsoft\Windows\Start Menu\Programs\Ochoa.lnk"
if (Test-Path $shortcutPath) {
    Remove-Item $shortcutPath -Force
    Write-Host "✅ Removed Start Menu shortcut"
} else {
    Write-Host "⚠️ Shortcut not found"
}

# 3. Uninstall MSIX Frontend
$packageName = "Ochoa"  # Match your app's name from Get-AppxPackage
$appx = Get-AppxPackage | Where-Object { $_.Name -like "*$packageName*" }

if ($appx) {
    Remove-AppxPackage -Package $appx.PackageFullName
    Write-Host "✅ Uninstalled MSIX frontend"
} else {
    Write-Host "⚠️ MSIX app not found"
}

# 4. Remove scheduled task for admin launcher (if used)
$taskName = "OchoaElevatedLauncher"
if (Get-ScheduledTask -TaskName $taskName -ErrorAction SilentlyContinue) {
    Unregister-ScheduledTask -TaskName $taskName -Confirm:$false
    Write-Host "✅ Removed Scheduled Task"
}

Write-Host "`n🎉 Uninstallation complete." -ForegroundColor Green