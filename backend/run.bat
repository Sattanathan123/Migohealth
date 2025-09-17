@echo off
echo Starting MigoHealth Backend Server...
java -jar target\health-record-backend-1.0.0.jar --server.port=8081
pause