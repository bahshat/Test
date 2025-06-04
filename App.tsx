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
Name: "{commonprograms}\Ochoa"; Filename: "{app}\launcher.bat"; IconFilename: "{app}\ul.ico"
Name: "{group}\Uninstall Ochoa"; Filename: "{uninstallexe}"

[Run]
Filename: "powershell.exe"; Parameters: "-ExecutionPolicy Bypass -File ""{app}\frontend\Add-AppDevPackage.ps1"""; Flags: runhidden waituntilterminated

[UninstallRun]
Filename: "powershell.exe"; Parameters: "-Command ""Get-AppxPackage -Name *Ochoa* | Remove-AppxPackage -ErrorAction SilentlyContinue"""; Flags: runhidden