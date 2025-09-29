# ---------------------------
# Stage 1: Build frontend
# ---------------------------
FROM node:18 AS frontend-build
WORKDIR /frontend

# Copy frontend package files
COPY ./frontend/package*.json ./
RUN npm install

# Copy rest of frontend and build
COPY ./frontend .
RUN npm run build

# ---------------------------
# Stage 2: Build backend
# ---------------------------
FROM maven:3.9.4-eclipse-temurin-17 AS backend-build
WORKDIR /app

# Copy backend project (everything in bookbuddy/ dir)
COPY . .

# Copy built frontend into Spring Boot static resources
COPY --from=frontend-build /frontend/dist ./src/main/resources/static

# Package Spring Boot app
RUN mvn clean package -DskipTests

# ---------------------------
# Stage 3: Runtime container
# ---------------------------
FROM eclipse-temurin:17-jdk
WORKDIR /app

COPY --from=backend-build /app/target/*.jar app.jar

ENTRYPOINT ["java","-jar","/app/app.jar"]

