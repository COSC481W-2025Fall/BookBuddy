# ---------- FRONTEND BUILD ----------
FROM node:18 AS frontend-build
WORKDIR /frontend
COPY ./frontend ./
RUN npm install
RUN npm run build

# ---------- BACKEND BUILD ----------
FROM maven:3.9.8-eclipse-temurin-17 AS backend-build
WORKDIR /app
COPY ./bookbuddy ./bookbuddy

# ✅ FIXED: copy from frontend build output to backend static resources
COPY --from=frontend-build /frontend/dist ./bookbuddy/src/main/resources/static

RUN mvn -f ./bookbuddy/pom.xml clean package -DskipTests

# ---------- RUNTIME STAGE ----------
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app
COPY --from=backend-build /app/bookbuddy/target/bookbuddy-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]
