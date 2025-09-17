FROM maven:3.8.6-eclipse-temurin-17 AS builder
WORKDIR /app
# Copy source files and build
COPY . .
RUN mvn package -DskipTests
# Use a slimmer runtime image
FROM eclipse-temurin:17-jdk
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "/app/app.jar"]