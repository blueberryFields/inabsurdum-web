# Build stage

FROM adoptopenjdk/openjdk11 as build
WORKDIR /jambox

COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

RUN chmod +x ./mvnw
# download the dependency if needed or if the pom file is changed
RUN ./mvnw dependency:go-offline -B

COPY src src

RUN ./mvnw clean package -DskipTests


# Production stage

FROM adoptopenjdk/openjdk11 as production

COPY --from=build /jambox/target/*.jar .
RUN apt-get update && apt-get upgrade -y
# This is needed to be able to install apt-repos
RUN apt-get install software-properties-common -y
# Install audiowaveform
RUN add-apt-repository ppa:chris-needham/ppa && apt-get update
RUN apt-get install audiowaveform -y
RUN apt-get install ffmpeg -y
# Install python
RUN add-apt-repository ppa:deadsnakes/ppa && apt-get update
RUN apt-get install python -y
# Copy scripts
COPY wait-for-mysql.sh wait-for-mysql.sh
COPY scale-json.py scale-json.py
RUN chmod +x wait-for-mysql.sh
RUN mkdir ./temp-files
ENTRYPOINT ["./wait-for-mysql.sh", "mysql", "java", "-jar", "jambox-0.0.1-SNAPSHOT.jar"]


