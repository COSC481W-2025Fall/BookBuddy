@echo off

cd bookbuddy

:: Start docker
::start docker compose up --build

:: Start backend
:: Hard coded for now
start java -jar target\bookbuddy-0.0.1-SNAPSHOT.jar

:: Start frontend
cd frontend
start cmd /k "npm run dev"