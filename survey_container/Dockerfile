FROM node:12-alpine
RUN mkdir /out
RUN npm install -g --registry=https://npm.pkg.github.com/robinmarchart @robinmarchart/survey@1.0.0
EXPOSE 80
ENTRYPOINT [ "survey", "--port=80", "/out"]