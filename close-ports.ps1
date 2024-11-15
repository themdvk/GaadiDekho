$ports = @(3000, 3001, 3002)

foreach ($port in $ports) {
    $processId = netstat -ano | findstr ":$port" | findstr "LISTENING"
    if ($processId) {
        $processNum = ($processId -split ' ')[-1]
        Write-Host "Killing process on port $port (PID: $processNum)"
        taskkill /PID $processNum /F
    } else {
        Write-Host "No process found on port $port"
    }
}
