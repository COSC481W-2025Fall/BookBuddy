# ===========================
# Frontend Build
# ===========================
FROM node:20 AS frontend-build
WORKDIR /frontend

# Install dependencies
COPY ./frontend/package*.json ./
RUN npm install

# Copy source and build
COPY ./frontend .
RUN npm run build

# ===========================
# Backend Build
# ===========================
FROM maven:3.9.4-eclipse-temurin-17 AS backend-build
WORKDIR /app

# Copy backend + frontend into build context
COPY . .

# Copy built frontend into Spring Boot static resources
COPY --from=frontend-build /frontend/dist ./src/main/resources/static

# Package Spring Boot app
RUN mvn clean package -DskipTests

# ===========================
# Runtime
# ===========================
FROM eclipse-temurin:17-jdk
WORKDIR /app

# Copy JAR from backend build
COPY --from=backend-build /app/target/*.jar app.jar

# Run application
ENTRYPOINT ["java","-jar","/app/app.jar"]
