# ===========================
# FRONTEND BUILD STAGE
# ===========================
FROM node:20 AS frontend-build
WORKDIR /frontend

# Copy dependency files first (improves caching)
COPY ./frontend/package*.json ./
RUN npm install

# Copy the rest of the frontend source
COPY ./frontend ./

# Debug: show current working directory and files
RUN echo "=== Frontend directory structure before build ===" && pwd && ls -la

# Build the frontend (Vite)
RUN echo "=== Starting frontend build ===" && npm run build || (echo "Frontend build failed" && exit 1)

# Debug: confirm that the dist folder exists
RUN echo "=== Frontend directory structure after build ===" && ls -la && echo "=== dist folder contents ===" && ls -la dist || (echo "No dist folder found!" && exit 1)

# ===========================
# BACKEND BUILD STAGE
# ===========================
FROM maven:3.9.8-eclipse-temurin-17 AS backend-build
WORKDIR /app

# Copy the backend source code
COPY . .

# Copy built frontend assets into Spring Boot static resources
COPY --from=frontend-build /frontend/dist ./src/main/resources/static

# Build backend JAR (skip tests for faster builds)
RUN echo "=== Starting backend build ===" && mvn clean package -DskipTests

# ===========================
# RUNTIME STAGE
# ===========================
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app

# Copy the packaged JAR from the backend build stage
COPY --from=backend-build /app/target/bookbuddy-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]

