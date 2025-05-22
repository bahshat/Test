That specific error (0x8007000B, SignerSign() failed) means there’s a bitness mismatch — you’re trying to use a 32-bit certificate or tool to sign a 64-bit .msix (or vice versa). This happens when:
	•	signtool from the x86 (32-bit) folder is used for a 64-bit app
	•	Or .cer file format isn’t fully compatible for signing .msix

✅ Fix Steps

1. Always Use 64-bit signtool

Use the 64-bit version of signtool manually.

Run this from PowerShell or CMD:

& "C:\Program Files (x86)\Windows Kits\10\bin\10.0.19041.0\x64\signtool.exe" sign `
  /fd SHA256 `
  /a `
  /f "$env:USERPROFILE\Desktop\OchoaTestCert.cer" `
  "C:\path\to\your\app.msix"

Make sure:
	•	The .msix path is 100% correct
	•	You’re running this in Administrator mode

2. If error persists: regenerate certificate in PFX format

.cer is not ideal for signing. Let’s create a PFX instead:

(a) In PowerShell as Admin:

$cert = New-SelfSignedCertificate -Type CodeSigningCert -Subject "CN=OchoaTestCert" -CertStoreLocation "Cert:\LocalMachine\My"
$pwd = ConvertTo-SecureString -String "1234" -Force -AsPlainText
Export-PfxCertificate -Cert $cert -FilePath "$env:USERPROFILE\Desktop\OchoaTestCert.pfx" -Password $pwd

(b) Then sign using:

& "C:\Program Files (x86)\Windows Kits\10\bin\10.0.19041.0\x64\signtool.exe" sign `
  /fd SHA256 `
  /f "$env:USERPROFILE\Desktop\OchoaTestCert.pfx" `
  /p 1234 `
  "C:\path\to\your\app.msix"

Let me know which step fails — and I’ll guide you through it. This will 100% resolve the signer error.