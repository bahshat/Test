var
  ExecResult: Integer;

function InitializeSetup(): Boolean;
begin
  ShellExec('runas', 'powershell.exe',
    '-Command "Register-ScheduledTask -TaskName ''OchoaElevatedLauncher'' -Action (New-ScheduledTaskAction -Execute \"{app}\launcher.bat\") -Principal (New-ScheduledTaskPrincipal -UserId ''BUILTIN\Administrators'' -RunLevel Highest -LogonType Interactive) -Trigger (New-ScheduledTaskTrigger -AtLogOn -Once) -Force"',
    '', SW_HIDE, ewWaitUntilTerminated, ExecResult);
  Result := True;
end;