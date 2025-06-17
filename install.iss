Yes, you can call your Ochoa.Package_10.msixbundle (or .msibundle) directly from Inno Setup or PowerShell — but with one big condition:

	🛑 .msixbundle requires elevation and uses App Installer (or PowerShell) to install.

✅ Option 1: Use PowerShell to Install .msixbundle

This is the recommended and standard way:

[Run]
Filename: "powershell.exe";
Parameters: "-ExecutionPolicy Bypass -NoProfile -Command Add-AppxPackage -Path '{app}\frontend\Ochoa.Package_10.msixbundle'";
Flags: runhidden waituntilterminated

	✅ This works even without modifying Add-AppDevPackage.ps1 and avoids needing that script.

✅ Option 2: Use AppInstaller.exe (GUI prompt)

If you want Windows’ GUI installer to appear:

[Run]
Filename: "explorer.exe";
Parameters: """{app}\frontend\Ochoa.Package_10.msixbundle""";
Flags: shellexec

	🔄 This opens the App Installer interface, and user has to click Install manually.

⚠️ Notes
	•	.msixbundle is not directly executable, it must go through Add-AppxPackage or explorer.exe.
	•	Make sure your Inno Setup installer is run as administrator or it will silently fail.
	•	If you’re using Add-AppDevPackage.ps1, it ultimately wraps Add-AppxPackage, so this is effectively the same — just removing the middleman.

✅ Bonus: Avoid Copying Frontend Folder

If your only goal is to install Ochoa.Package_10.msixbundle, then you only need to include that file, not the whole frontend folder.

[Files]
Source: "installer_setup\frontend\Ochoa.Package_10.msixbundle"; DestDir: "{tmp}"; Flags: deleteafterinstall

[Run]
Filename: "powershell.exe";
Parameters: "-ExecutionPolicy Bypass -NoProfile -Command Add-AppxPackage -Path '{tmp}\Ochoa.Package_10.msixbundle'";
Flags: runhidden waituntilterminated

Would you like me to refactor your installer to use this msixbundle method directly and skip .ps1 completely?