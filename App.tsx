You’re very close — and these are common final mile issues when packaging advanced behavior into an installer. Let’s address each point clearly, with the corrected script and logic.

✅ 1. ❗ Setup Wizard Stuck at End (No Finish Button)

🔍 Cause:

InitializeSetup() must return False if any ShellExec fails, else it hangs the wizard UI.

✅ Fix:

We must check ExecResult = 0.

var
  ExecResult: Integer;

function InitializeSetup(): Boolean;
begin
  ShellExec('runas', 'powershell.exe',
    '-Command "Register-ScheduledTask -TaskName ''OchoaElevatedLauncher'' -Action (New-ScheduledTaskAction -Execute \"{app}\launcher.bat\") -Principal (New-ScheduledTaskPrincipal -UserId ''BUILTIN\Administrators'' -RunLevel Highest -LogonType Interactive) -Trigger (New-ScheduledTaskTrigger -AtLogOn -Once) -Force"',
    '', SW_HIDE, ewWaitUntilTerminated, ExecResult);

  Result := (ExecResult = 0);  // Prevents wizard hang
end;

✅ 2. ⚠ Installed in Program Files (x86)

🔍 Cause:

Inno Setup defaults to 32-bit mode → uses Program Files (x86).

✅ Fix:

Force 64-bit install by adding this to [Setup]:

ArchitecturesInstallIn64BitMode=x64

This ensures install goes into:

C:\Program Files\Ochoa

✅ 3. ❌ Launcher Shortcut Fails to Start launcher.bat

🔍 Possible Causes:
	•	schtasks.exe can’t run if the task isn’t created yet (race condition)
	•	Or working directory is incorrect

✅ Fix:

Create a shortcut to the actual .bat file, and run as admin via Scheduled Task (already working).
Just test task separately via this command after install:

schtasks /run /tn "OchoaElevatedLauncher"

If that doesn’t launch, task creation failed. Check in Task Scheduler → Task Library.

Also ensure .bat files are present at:

C:\Program Files\Ochoa\launcher.bat

✅ 4. ❌ Loopback Exemption Not Working

🔍 Cause:

MSIX app is not fully installed before loopback command runs.

✅ Fix:

Move loopback exemption into [Run], after Add-AppDevPackage.ps1

[Run]
; Install MSIX App
Filename: "powershell.exe"; Parameters: "-ExecutionPolicy Bypass -File ""{app}\frontend\Add-AppDevPackage.ps1"""; Flags: runhidden waituntilterminated

; Now add loopback exemption
Filename: "powershell.exe"; Parameters: "-Command ""CheckNetIsolation LoopbackExempt -a -n='OchoaCorp.OchoaApp_xyz123'"""; Flags: runhidden

Replace OchoaCorp.OchoaApp_xyz123 with real PackageFamilyName (get via Get-AppxPackage).

✅ 5. 🧹 Add to Control Panel Uninstaller

Inno already adds an uninstall entry.

To also include your custom uninstall logic, use:

[UninstallRun]
Filename: "powershell.exe"; Parameters: "-ExecutionPolicy Bypass -File ""{app}\uninstall.ps1"""; Flags: runhidden

You should include your uninstall.ps1 in the root of installer_source/.

✅ TL;DR – KEY CHANGES YOU MUST DO

In [Setup]:

ArchitecturesInstallIn64BitMode=x64
UninstallDisplayIcon={app}\ul.ico

In [Run]:

; 1. Install MSIX
Filename: "powershell.exe"; Parameters: "-ExecutionPolicy Bypass -File ""{app}\frontend\Add-AppDevPackage.ps1"""; Flags: runhidden waituntilterminated

; 2. Loopback (after install)
Filename: "powershell.exe"; Parameters: "-Command ""CheckNetIsolation LoopbackExempt -a -n='YourPackageFamilyNameHere'"""; Flags: runhidden

In [UninstallRun]:

Filename: "powershell.exe"; Parameters: "-ExecutionPolicy Bypass -File ""{app}\uninstall.ps1"""; Flags: runhidden

In [Code]:

var
  ExecResult: Integer;

function InitializeSetup(): Boolean;
begin
  ShellExec('runas', 'powershell.exe',
    '-Command "Register-ScheduledTask -TaskName ''OchoaElevatedLauncher'' -Action (New-ScheduledTaskAction -Execute \"{app}\launcher.bat\") -Principal (New-ScheduledTaskPrincipal -UserId ''BUILTIN\Administrators'' -RunLevel Highest -LogonType Interactive) -Trigger (New-ScheduledTaskTrigger -AtLogOn -Once) -Force"',
    '', SW_HIDE, ewWaitUntilTerminated, ExecResult);
  Result := (ExecResult = 0);
end;

Let me know if you’d like me to generate the full .iss file for you based on your corrected folder again — just share the structure if it changed.