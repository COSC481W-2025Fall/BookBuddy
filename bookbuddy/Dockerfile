# ===========================
# Frontend Build
# ===========================
FROM node:20 AS frontend-build
WORKDIR /app/frontend

COPY ./frontend/package*.json ./
RUN npm install

COPY ./frontend .

# Force output into Spring Boot static folder inside /app
RUN npm run build -- --outDir=../src/main/resources/static

# ===========================
# Backend Build
# ===========================
FROM maven:3.9.4-eclipse-temurin-17 AS backend-build
WORKDIR /app

COPY . .

RUN mvn clean package -DskipTests

# ===========================
# Runtime
# ===========================
FROM eclipse-temurin:17-jdk
WORKDIR /app

COPY --from=backend-build /app/target/*.jar app.jar

ENTRYPOINT ["java","-jar","/app/app.jar"]
