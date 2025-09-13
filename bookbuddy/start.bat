@echo off

:: Start docker
start docker compose up --build

:: Start frontend
cd frontend
start cmd /k "npm run dev"

:: Start backend
:: Hard coded for now
start java -jar target\bookbuddy-0.0.1-SNAPSHOT.jar