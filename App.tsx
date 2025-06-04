[Setup]
AppName=Ochoa
AppVersion=1.0
DefaultDirName={pf}\Ochoa
DefaultGroupName=Ochoa
UninstallDisplayIcon={app}\ul.ico
OutputDir=output
OutputBaseFilename=OchoaInstaller
SetupIconFile=installer_source\ul.ico
PrivilegesRequired=admin
ArchitecturesInstallIn64BitMode=x64
Compression=lzma
SolidCompression=yes

[Files]
Source: "installer_source\*"; DestDir: "{app}"; Flags: recursesubdirs createallsubdirs

[Icons]
Name: "{commonprograms}\Ochoa"; Filename: "schtasks.exe"; Parameters: "/run /tn ""OchoaLauncherTask"""; IconFilename: "{app}\ul.ico"
Name: "{group}\Uninstall Ochoa"; Filename: "{uninstallexe}"

[Run]
; Install Frontend MSIX app
Filename: "powershell.exe"; Parameters: "-ExecutionPolicy Bypass -File ""{app}\frontend\Add-AppDevPackage.ps1"""; Flags: runhidden waituntilterminated

; Register loopback exemption AFTER app is installed (replace with your real PackageFamilyName)
Filename: "powershell.exe"; Parameters: "-Command ""Start-Sleep -Seconds 2; CheckNetIsolation LoopbackExempt -a -n='OchoaCorp.OchoaApp_xyz123'"""; Flags: runhidden

; Register Scheduled Task to run launcher.bat as admin
Filename: "powershell.exe"; Parameters: "-ExecutionPolicy Bypass -Command ""$action = New-ScheduledTaskAction -Execute '{app}\\launcher.bat'; $principal = New-ScheduledTaskPrincipal -UserId 'BUILTIN\\Administrators' -RunLevel Highest; $trigger = New-ScheduledTaskTrigger -AtLogOn; Register-ScheduledTask -TaskName 'OchoaLauncherTask' -Action $action -Principal $principal -Trigger $trigger -Force"""; Flags: runhidden waituntilterminated

; Remove MSIX auto-created Start Menu shortcut (optional cleanup)
Filename: "powershell.exe"; Parameters: "-Command ""$s = Get-StartApps | Where-Object { $_.Name -like '*Ochoa*' }; foreach ($entry in $s) { Remove-Item \\\"$env:APPDATA\\Microsoft\\Windows\\Start Menu\\Programs\\$($entry.Name).lnk\\\" -ErrorAction SilentlyContinue }"""; Flags: runhidden

[UninstallRun]
; Clean uninstall of frontend MSIX app
Filename: "powershell.exe"; Parameters: "-Command ""Get-AppxPackage -Name *Ochoa* | Remove-AppxPackage -ErrorAction SilentlyContinue"""; Flags: runhidden