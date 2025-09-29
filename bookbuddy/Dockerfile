# -------- Frontend Build --------
FROM node:20 AS frontend-build
WORKDIR /frontend
COPY ./frontend/package*.json ./
RUN npm install
COPY ./frontend .
RUN npm run build

# -------- Backend Build --------
FROM maven:3.9.4-eclipse-temurin-17 AS backend-build
WORKDIR /app
COPY ./bookbuddy .
# Copy built frontend into Spring Boot static resources
COPY --from=frontend-build /frontend/dist ./src/main/resources/static
RUN mvn clean package -DskipTests

# -------- Runtime --------
FROM eclipse-temurin:17-jdk
WORKDIR /app
COPY --from=backend-build /app/target/*.jar app.jar
ENTRYPOINT ["java","-jar","/app/app.jar"]
