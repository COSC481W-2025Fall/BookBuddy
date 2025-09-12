#!/bin/bash

# Find the latest jar in target/
LATEST_JAR=$(ls -t target/*.jar | head -n 1)

# start docker
docker compose up --build &

# start backend
java -jar "$LATEST_JAR" &

# start frontend
cd frontend
npm run dev