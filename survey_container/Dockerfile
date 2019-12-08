# syntax = docker/dockerfile:experimental
FROM node:12-alpine
RUN mkdir /out
RUN apk add --no-cache git
RUN npm install -g github:RobinMarchart/workshop-wissenschaftstag
ENTRYPOINT [ "survey", "--port=80", "/out"]