# ===========================
# FRONTEND BUILD STAGE
# ===========================
FROM node:20 AS frontend-build
WORKDIR /frontend

# Copy dependency files first (for caching)
COPY ./frontend/package*.json ./
RUN npm ci

# Copy rest of frontend source
COPY ./frontend ./

# Build React app
RUN echo "=== Frontend directory before build ===" && pwd && ls -la
RUN echo "=== Starting frontend build ===" && npm run build || (echo "Frontend build failed" && exit 1)
RUN echo "=== Frontend build complete ===" && ls -la dist || echo "No dist folder found"

# ===========================
# BACKEND BUILD STAGE
# ===========================
FROM maven:3.9.8-eclipse-temurin-17 AS backend-build
WORKDIR /app

# Copy backend and frontend output
COPY . .
COPY --from=frontend-build /frontend/dist ./bookbuddy/src/main/resources/static

# Build backend JAR (skip tests)
RUN echo "=== Starting backend build ===" && mvn clean package -DskipTests

# ===========================
# RUNTIME STAGE
# ===========================
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app

COPY --from=backend-build /app/target/bookbuddy-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
