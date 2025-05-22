& "C:\Program Files (x86)\Windows Kits\10\bin\10.0.19041.0\x64\signtool.exe" sign `
  /fd SHA256 `
  /f "$env:USERPROFILE\Desktop\OchoaTestCert.pfx" `
  /p 1234 `
  /tr http://timestamp.digicert.com `
  /td SHA256 `
  "C:\path\to\your\Ochoa.msix"