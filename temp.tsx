$cert = New-SelfSignedCertificate -Type CodeSigningCert -Subject "CN=OchoaTestCert" -CertStoreLocation "Cert:\LocalMachine\My"
Export-Certificate -Cert $cert -FilePath "C:\OchoaTestCert.cer"

Import-Certificate -FilePath "C:\OchoaTestCert.cer" -CertStoreLocation "Cert:\LocalMachine\TrustedPeople"

signtool sign /fd SHA256 /a /f "C:\OchoaTestCert.cer" "path\to\your\App.msix"

Add-AppxPackage "path\to\your\App.msix"