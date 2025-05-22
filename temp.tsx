& "C:\Program Files (x86)\Windows Kits\10\bin\10.0.22621.0\x64\signtool.exe" sign `
  /fd SHA256 `
  /f "$env:USERPROFILE\Desktop\OchoaCert.pfx" `
  /p 1234 `
  /td SHA256 `
  "C:\path\to\new\app.msix"