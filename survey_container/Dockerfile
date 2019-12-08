# syntax = docker/dockerfile:experimental
FROM node:12-alpine
RUN mkdir /out
RUN apk add --no-cache git
RUN git clone https://github.com/RobinMarchart/workshop-wissenschaftstag.git /survey;\
    yarn global add file:/survey/survey
#RUN survey -h
#ENTRYPOINT [ "survey", "--port=80", "/out"]