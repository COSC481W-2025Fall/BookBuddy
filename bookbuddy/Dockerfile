# ===========================
# Frontend Build
# ===========================
FROM node:20 AS frontend-build
WORKDIR /frontend

# Copy dependency files first for caching
COPY ./frontend/package*.json ./
RUN npm install

# Copy the rest of the frontend source and build
COPY ./frontend ./
RUN npm run build
# 👉 Outputs static files into /frontend/dist

# ===========================
# Backend Build
# ===========================
FROM maven:3.9.4-eclipse-temurin-17 AS backend-build
WORKDIR /app

# Copy Maven files and backend source
COPY ./pom.xml ./
COPY ./src ./src

# Copy frontend build output into Spring Boot's static resources
COPY --from=frontend-build /frontend/dist ./src/main/resources/static

# Build backend JAR (skip tests for faster builds)
RUN mvn clean package -DskipTests

# ===========================
# Runtime
# ===========================
FROM eclipse-temurin:17-jdk
WORKDIR /app

# Copy only the built JAR (keep image small)
COPY --from=backend-build /app/target/*.jar app.jar

# Run Spring Boot
ENTRYPOINT ["java","-jar","/app/app.jar"]