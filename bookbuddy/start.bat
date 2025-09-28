@echo off
cd bookbuddy
:: Start docker (optional, uncomment if needed)
start docker compose up -d --build



:: Start backend
::start java -jar target\bookbuddy-0.0.1-SNAPSHOT.jar

:: Start frontend
cd frontend

:: Check if node_modules exists, if not run npm install
if not exist node_modules (
    echo Installing frontend dependencies...
    call npm install
)

:: Start Vite dev server
start cmd /k "npm run dev"
