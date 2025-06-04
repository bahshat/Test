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
Source: "installer_source\launcher.bat"; DestDir: "{app}"; Flags: ignoreversion
Source: "installer_source\backend_launcher.bat"; DestDir: "{app}"; Flags: ignoreversion
Source: "installer_source\ul.ico"; DestDir: "{app}"; Flags: ignoreversion
Source: "installer_source\frontend\*"; DestDir: "{app}\frontend"; Flags: recursesubdirs createallsubdirs
Source: "installer_source\backend\*"; DestDir: "{app}\backend"; Flags: recursesubdirs createallsubdirs

[Icons]
Name: "{commonprograms}\Ochoa"; Filename: "{app}\launcher.bat"; IconFilename: "{app}\ul.ico"

[Run]
Filename: "powershell.exe"; Parameters: "-ExecutionPolicy Bypass -File ""{app}\frontend\Add-AppDevPackage.ps1"""; Flags: runhidden waituntilterminated
Filename: "powershell.exe"; Parameters: "-Command ""CheckNetIsolation LoopbackExempt -a -n='YourPackageFamilyNameHere'"""; Flags: runhidden