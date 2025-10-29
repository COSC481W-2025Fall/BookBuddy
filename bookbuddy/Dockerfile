# ---------- FRONTEND BUILD ----------
FROM node:18 AS frontend-build
WORKDIR /frontend
# Copy frontend folder (it’s inside this same directory)
COPY ./frontend ./
RUN npm install
RUN npm run build

# ---------- BACKEND BUILD ----------
FROM maven:3.9.8-eclipse-temurin-17 AS backend-build
WORKDIR /app
# Copy everything in the current directory (src, pom.xml, etc.)
COPY . .
# Copy built frontend files into backend static resources
COPY --from=frontend-build /frontend/dist ./src/main/resources/static
RUN mvn clean package -DskipTests

# ---------- RUNTIME STAGE ----------
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app
COPY --from=backend-build /app/target/bookbuddy-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
