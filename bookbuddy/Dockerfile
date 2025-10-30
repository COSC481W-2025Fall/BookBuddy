# ===========================
# FRONTEND BUILD STAGE
# ===========================
FROM node:20 AS frontend-build
WORKDIR /app/bookbuddy/frontend

# Copy package files first
COPY ./bookbuddy/frontend/package*.json ./
RUN npm ci

# Copy all frontend source
COPY ./bookbuddy/frontend ./

# Build frontend — output goes directly into backend/static
RUN echo "=== Frontend directory before build ===" && pwd && ls -la
RUN echo "=== Starting frontend build ===" && npm run build || (echo "Frontend build failed" && exit 1)
RUN echo "=== Frontend build complete ===" && ls -la ../src/main/resources/static || echo "Static folder missing"

# ===========================
# BACKEND BUILD STAGE
# ===========================
FROM maven:3.9.8-eclipse-temurin-17 AS backend-build
WORKDIR /app/bookbuddy

# Copy everything (frontend + backend with built static assets)
COPY . .

# Build backend JAR (skip tests)
RUN echo "=== Starting backend build ===" && mvn clean package -DskipTests

# ===========================
# RUNTIME STAGE
# ===========================
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app

COPY --from=backend-build /app/bookbuddy/target/bookbuddy-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]

