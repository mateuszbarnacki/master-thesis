FROM gradle:7.5.1-jdk17-alpine AS builder
ENV APP_HOME=/usr/app
WORKDIR $APP_HOME
COPY ./auth-service ./auth-service
COPY build.gradle .
COPY settings.gradle .
COPY gradle .
COPY --chown=gradle:gradle . /home/gradle/src
USER root
RUN chown -R gradle /home/gradle/src
RUN cd auth-service && gradle build || return 0

FROM openjdk:17
ENV APP_NAME auth-service.jar
ENV APP_HOME=/usr/app
ARG PROFILE
ENV ENV_PROFILE=${PROFILE}
COPY --from=builder $APP_HOME/auth-service/build/libs/$APP_NAME $APP_HOME/
WORKDIR $APP_HOME
ENTRYPOINT exec java -jar $APP_NAME
EXPOSE 13402