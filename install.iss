👍 Got it! Here’s how you can copy the frontend folder to C:\Program Files\Ochoa, use it during install, and clean it up after installation finishes.

✅ Step-by-Step Plan

✅ 1. Copy frontend folder to {app} (Program Files\Ochoa)

[Files]
Source: "installer_setup\frontend\*"; DestDir: "{app}\frontend"; Flags: recursesubdirs

✅ 2. Run the PowerShell install script from {app}\frontend

[Run]
Filename: "powershell.exe";
Parameters: "-ExecutionPolicy Bypass -NoProfile -File ""{app}\frontend\Add-AppDevPackage.ps1""";
Flags: runhidden waituntilterminated

✅ 3. Delete frontend folder after install

There are two ways to do this:

Option A: Use [Run] again to delete folder

[Run]
Filename: "powershell.exe";
Parameters: "-Command Remove-Item -Path '{app}\frontend' -Recurse -Force";
Flags: runhidden

Put this after the Add-AppDevPackage.ps1 line to make sure it runs after FE install is done.

Option B: Use [Code] section for more control

You can delete the folder in PascalScript:

[Code]
procedure CurStepChanged(CurStep: TSetupStep);
var
  ResultCode: Integer;
begin
  if CurStep = ssPostInstall then begin
    Exec('powershell.exe',
         '-Command Remove-Item -Path "' + ExpandConstant('{app}\frontend') + '" -Recurse -Force',
         '', SW_HIDE, ewWaitUntilTerminated, ResultCode);
  end;
end;

🔐 Important Notes
	•	Make sure Add-AppDevPackage.ps1 doesn’t need anything from that folder after install completes.
	•	Don’t use deleteafterinstall on [Files] if you’re copying to {app} — that’s for {tmp} only.

✅ Result
	•	✅ Files copied to C:\Program Files\Ochoa\frontend
	•	✅ Frontend installed from there
	•	✅ Folder deleted post-install
	•	✅ Wizard shows Finish button properly

Let me know if you want to zip the frontend and unzip it instead — that saves even more space.