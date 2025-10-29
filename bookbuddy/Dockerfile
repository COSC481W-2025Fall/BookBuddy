# ===========================
# FRONTEND BUILD STAGE
# ===========================
FROM node:20 AS frontend-build
WORKDIR /frontend

# Copy dependency files first (for caching)
COPY ./frontend/package*.json ./
RUN npm install

# Copy the rest of the frontend source
COPY ./frontend ./

# Debugging logs for clarity
RUN echo "=== Frontend directory before build ===" && pwd && ls -la
RUN echo "=== Starting frontend build ===" && npm run build || (echo "Frontend build failed" && exit 1)
RUN echo "=== Frontend directory after build ===" && ls -la ../src/main/resources/static || echo "Static folder not found yet"

# ===========================
# BACKEND BUILD STAGE
# ===========================
FROM maven:3.9.8-eclipse-temurin-17 AS backend-build
WORKDIR /app

# Copy everything (backend + built frontend)
COPY . .

# Build the backend (skip tests)
RUN echo "=== Starting backend build ===" && mvn clean package -DskipTests

# ===========================
# RUNTIME STAGE
# ===========================
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app

# Copy built JAR from backend build stage
COPY --from=backend-build /app/target/bookbuddy-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
