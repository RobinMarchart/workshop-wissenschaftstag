# syntax = docker/dockerfile:experimental
FROM node:12-alpine
RUN mkdir /out
RUN apk add --no-cache git
COPY survey /survey
ENTRYPOINT [ "sh" ]
#RUN survey -h
#ENTRYPOINT [ "survey", "--port=80", "/out"]