FROM eclipse-temurin:17-jdk
WORKDIR /app
# Copy source files and build
COPY . .
RUN mvn package -DskipTests
COPY target/*.jar app.jar
ENTRYPOINT ["java","-jar","/app/app.jar"]

