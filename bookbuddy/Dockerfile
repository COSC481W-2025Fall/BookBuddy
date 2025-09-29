# ---------------------------
# Stage 1: Build frontend
# ---------------------------
FROM node:18 AS frontend-build
WORKDIR /frontend

# Copy frontend package files first for caching
COPY ./bookbuddy/frontend/package*.json ./
RUN npm install

# Copy the rest of the frontend source and build
COPY ./bookbuddy/frontend .
RUN npm run build

# ---------------------------
# Stage 2: Build backend
# ---------------------------
FROM maven:3.9.4-eclipse-temurin-17 AS backend-build
WORKDIR /app

# Copy entire backend project
COPY ./bookbuddy .

# Copy built frontend into Spring Boot static resources
COPY --from=frontend-build /frontend/dist ./src/main/resources/static

# Package Spring Boot app (skip tests for faster build)
RUN mvn clean package -DskipTests

# ---------------------------
# Stage 3: Runtime container
# ---------------------------
FROM eclipse-temurin:17-jdk
WORKDIR /app

# Copy built jar from backend stage
COPY --from=backend-build /app/target/*.jar app.jar

# Run the Spring Boot app
ENTRYPOINT ["java","-jar","/app/app.jar"]
