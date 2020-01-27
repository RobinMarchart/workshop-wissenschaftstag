FROM node:13-alpine3.10 as node

COPY . /workspace

WORKDIR /workspace/client

RUN yarn
    
RUN yarn build

ENTRYPOINT [ "sh" ]

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-alpine3.10 as netcoresdk

COPY --from=node /workspace /workspace

WORKDIR /workspace

RUN dotnet restore -r linux-musl-x64

RUN dotnet publish -c release -o /app -r linux-musl-x64 --self-contained true --no-restore /p:PublishTrimmed=true /p:PublishReadyToRun=true

ENTRYPOINT [ "sh" ]

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-alpine3.10

COPY --from=netcoresdk /app /app

WORKDIR /app

ENTRYPOINT [ "./survey" ]

EXPOSE 80