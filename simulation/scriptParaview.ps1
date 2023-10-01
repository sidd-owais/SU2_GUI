$scriptpath = $MyInvocation.MyCommand.Path
$dir = Split-Path $scriptpath

cd $dir;

& "C:\Program Files\ParaView 5.11.1\bin\paraview.exe" "flow.vtu"