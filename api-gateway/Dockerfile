FROM gradle:7.5.1-jdk17-alpine AS builder
ENV APP_HOME=/usr/app
WORKDIR $APP_HOME
COPY . .
COPY --chown=gradle:gradle . /home/gradle/src
USER root
RUN chown -R gradle /home/gradle/src
RUN gradle build || return 0

FROM openjdk:17
ENV APP_NAME api-gateway.jar
ENV APP_HOME=/usr/app
COPY --from=builder $APP_HOME/build/libs/$APP_NAME $APP_HOME/
WORKDIR $APP_HOME
ENTRYPOINT exec java -jar $APP_NAME
EXPOSE 8080