Thanks — you’re right to investigate why the PowerShell script isn’t running from {tmp}. If it’s not being copied to {tmp} or running properly, here are the key points and how to fix it reliably:

✅ Goal:

Run Add-AppDevPackage.ps1 from a temporary folder without copying the full frontend/ folder to Program Files.

✅ Fix: Ensure Files Are Copied to {tmp} and Used

✅ Step 1: Copy Only Required Files to {tmp}

Update [Files] section in Inno Setup:

[Files]
Source: "installer_setup\frontend\Add-AppDevPackage.ps1"; DestDir: "{tmp}"; Flags: deleteafterinstall
Source: "installer_setup\frontend\Ochoa.msixbundle"; DestDir: "{tmp}"; Flags: deleteafterinstall

➡️ This ensures only the .ps1 and .msixbundle are copied temporarily.

✅ Step 2: Run PowerShell Script from {tmp}

[Run]
Filename: "powershell.exe";
Parameters: "-ExecutionPolicy Bypass -NoProfile -File ""{tmp}\Add-AppDevPackage.ps1""";
Flags: runhidden waituntilterminated

This ensures it waits for the installation to complete before showing “Finish” and doesn’t keep the wizard stuck.

✅ Optional: Fix Add-AppDevPackage.ps1 to Expect Local Path

If your Add-AppDevPackage.ps1 references the MSIX file with a relative path (e.g. .\Ochoa.msixbundle), ensure it’s referencing it relative to $PSScriptRoot:

Add-AppxPackage "$PSScriptRoot\Ochoa.msixbundle"

✅ Verify It’s in {tmp}

To debug if file copied or not:
	•	Temporarily remove deleteafterinstall
	•	Add this to [Run]:

[Run]
Filename: "explorer.exe"; Parameters: "{tmp}"; Flags: nowait

✅ Summary

Fix	Description
Copy required files to {tmp}	Using [Files] with deleteafterinstall
Run script from {tmp}	Use correct PowerShell command
Fix .ps1 file	Use $PSScriptRoot for file references

Let me know if you want to combine the .ps1 and .msixbundle into one .zip to unpack during setup for further optimization.