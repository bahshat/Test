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
Compression=lzma
SolidCompression=yes

[Files]
Source: "installer_source\*"; DestDir: "{app}"; Flags: recursesubdirs createallsubdirs

[Icons]
Name: "{commonprograms}\Ochoa"; Filename: "schtasks.exe"; Parameters: "/run /tn ""OchoaElevatedLauncher"""; IconFilename: "{app}\ul.ico"

[Run]
; Run MSIX installer script
Filename: "powershell.exe"; Parameters: "-ExecutionPolicy Bypass -File ""{app}\frontend\Add-AppDevPackage.ps1"""; Flags: runhidden waituntilterminated

; Add loopback exemption (replace with your actual PackageFamilyName)
Filename: "powershell.exe"; Parameters: "-Command ""CheckNetIsolation LoopbackExempt -a -n='OchoaCorp.OchoaApp_xyz123'"""; Flags: runhidden

[Code]
// Schedule admin launcher shortcut for backend + frontend
function InitializeSetup(): Boolean;
begin
  ShellExec('runas', 'powershell.exe',
    '-Command "Register-ScheduledTask -TaskName ''OchoaElevatedLauncher'' -Action (New-ScheduledTaskAction -Execute \"{app}\launcher.bat\") -Principal (New-ScheduledTaskPrincipal -UserId ''BUILTIN\Administrators'' -RunLevel Highest -LogonType Interactive) -Trigger (New-ScheduledTaskTrigger -AtLogOn -Once) -Force"',
    '', SW_HIDE, ewWaitUntilTerminated, ResultCode);
  Result := True;
end;