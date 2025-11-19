# ===========================
# FRONTEND BUILD STAGE
# ===========================
FROM node:20 AS frontend-build
WORKDIR /app/bookbuddy/frontend

# Copy package info and install dependencies
COPY ./bookbuddy/frontend/package*.json ./
RUN npm ci

# Copy frontend source
COPY ./bookbuddy/frontend ./

# Clean any existing static folder (safety)
RUN rm -rf ../src/main/resources/static/* || true

# Build React app (Vite)
RUN echo "=== Starting frontend build ===" \
 && npm run build \
 && echo "=== Frontend build complete ===" \
 && ls -la ../src/main/resources/static

# ===========================
# BACKEND BUILD STAGE
# ===========================
FROM maven:3.9.8-eclipse-temurin-17 AS backend-build
WORKDIR /app/bookbuddy

# Copy full project (backend + built frontend)
COPY . .

# Build backend JAR
RUN echo "=== Starting backend build ===" \
 && mvn clean package -DskipTests \
 && echo "=== Backend build complete ===" \
 && ls -la target

# ===========================
# RUNTIME STAGE
# ===========================
FROM eclipse-temurin:17-jdk
WORKDIR /app

# Copy compiled JAR from backend build
COPY --from=backend-build /app/bookbuddy/target/bookbuddy-0.0.1-SNAPSHOT.jar app.jar

# Expose backend port
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]


