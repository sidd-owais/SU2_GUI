$scriptpath = $MyInvocation.MyCommand.Path
$dir = Split-Path $scriptpath

cd $dir;

Invoke-Expression "..\bin\SU2_CFD.exe inv_NACA0012.cfg"