$cert = New-SelfSignedCertificate `
  -Type CodeSigningCert `
  -Subject "CN=OchoaCert" `
  -CertStoreLocation "Cert:\CurrentUser\My"

$pwd = ConvertTo-SecureString "1234" -AsPlainText -Force

Export-PfxCertificate `
  -Cert $cert `
  -FilePath "$env:USERPROFILE\Desktop\OchoaCert.pfx" `
  -Password $pwd