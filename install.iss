Great to hear your Inno Setup installer is working! Let’s address your questions on size optimization, finish button issue, and distribution strategy.

✅ 1. Can we avoid copying the frontend folder to Program Files?

Yes — you don’t need to copy the entire frontend/ folder to Program Files if it’s only used to install the .msixbundle via Add-AppDevPackage.ps1.

✅ Recommended:
	•	Instead of copying frontend/, run the install script directly from the setup source folder.
	•	You can mark the folder as dontcopy using a flag in the [Files] section:

[Files]
Source: "installer_setup\frontend\*"; DestDir: "{tmp}\frontend"; Flags: deleteafterinstall

Or use {src} if you’re sure installer can run scripts from source:

[Run]
Filename: "powershell.exe"; Parameters: "-ExecutionPolicy Bypass -File ""{tmp}\frontend\Add-AppDevPackage.ps1"""; Flags: runhidden

This way, it installs and deletes the temporary files, keeping final installed size small.

✅ 2. Finish button not showing in wizard

You’re right: this typically happens if:
	•	A long-running process (like Add-AppDevPackage.ps1) runs without letting Inno Setup know it has finished.
	•	Or the run step is not asynchronous-safe.

✅ Fix:

Use WaitUntilTerminated=yes to ensure the script completes before finishing UI:

[Run]
Filename: "powershell.exe"; Parameters: "-ExecutionPolicy Bypass -File ""{tmp}\frontend\Add-AppDevPackage.ps1"""; Flags: runhidden; WaitUntilTerminated=yes

And ensure the script doesn’t leave child processes running (like msiexec or PowerShell background tasks).

✅ 3. Other Size Optimizations

Area	Optimization
.msixbundle	Remove debug symbols (sign only release)
frontend/	Don’t copy, use deleteafterinstall
backend/	Zip it beforehand and extract via script
Compress level	Set Compression=lzma2/ultra64
Icons/images	Use .ico instead of .png/.bmp

In [Setup]:

Compression=lzma2/ultra64
SolidCompression=yes

✅ 4. Better Way to Share the Installer

Option	Description
🔹 Azure DevOps Artifact	Upload final .exe or .zip automatically after build
🔹 Share via OneDrive/Google Drive	Easy, but less professional
🔹 Self-hosted page	Simple HTML page with changelog + download
🔹 GitHub Release	Great for public or open projects

✅ Bonus: Add Versioning + Metadata

[Setup]
AppVersion={#MyAppVersion}
AppPublisher=Your Company
AppPublisherURL=https://example.com
AppSupportURL=https://example.com/support

Keep version in a separate .iss include file or pass as CLI arg.

Let me know if you’d like:
	•	RunOnce logic for backend startup
	•	Script to zip/unzip backend cleanly during install
	•	Cleanup mechanism to auto-remove install folders

You’re doing great — just a bit more polishing now 🚀