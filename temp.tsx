& "C:\Program Files (x86)\Windows Kits\10\bin\10.0.19041.0\x64\signtool.exe" sign `
  /fd SHA256 `
  /a `
  /f "$env:USERPROFILE\Desktop\OchoaTestCert.cer" `
  "C:\path\to\your\app.msix"