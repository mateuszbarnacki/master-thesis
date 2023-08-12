FROM gradle:7.5.1-jdk17-alpine AS builder
ENV APP_HOME=/usr/app
WORKDIR $APP_HOME
COPY ./service-registry ./service-registry
COPY build.gradle .
COPY settings.gradle .
COPY gradle .
COPY --chown=gradle:gradle . /home/gradle/src
USER root
RUN chown -R gradle /home/gradle/src
RUN cd service-registry && gradle build || return 0

FROM openjdk:17
ENV APP_NAME service-registry.jar
ENV APP_HOME=/usr/app
ARG PROFILE
ENV ENV_PROFILE=${PROFILE}
COPY --from=builder $APP_HOME/service-registry/build/libs/$APP_NAME $APP_HOME/
WORKDIR $APP_HOME
ENTRYPOINT exec java -jar $APP_NAME
EXPOSE 19990