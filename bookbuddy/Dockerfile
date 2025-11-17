# ===========================
# Frontend Build
# ===========================
FROM node:20 AS frontend-build
WORKDIR /frontend

# --- ABSOLUTE CACHE BUSTER FOR THE WHOLE FRONTEND STAGE ---
RUN echo "frontend FULL rebuild $(date)"

# Copy dependency files first
COPY ./frontend/package*.json ./
RUN npm install

# Copy the rest of the frontend source
COPY ./frontend ./

# Build the frontend
RUN npm run build
# dist/ will now contain fresh assets


# ===========================
# Backend Build
# ===========================
FROM maven:3.9.4-eclipse-temurin-17 AS backend-build
WORKDIR /app

# --- ABSOLUTE CACHE BUSTER FOR BACKEND STAGE ---
RUN echo "backend FULL rebuild $(date)"

# Copy Maven files and backend source
COPY ./pom.xml ./
COPY ./src ./src

# Copy frontend build into Spring Boot resources
COPY --from=frontend-build /frontend/dist ./src/main/resources/static

# Build backend JAR
RUN mvn clean package -DskipTests


# ===========================
# Runtime
# ===========================
FROM eclipse-temurin:17-jdk
WORKDIR /app

# Copy only the built JAR
COPY --from=backend-build /app/target/*.jar app.jar

# Run Spring Boot
ENTRYPOINT ["java", "-jar", "/app/app.jar"]

