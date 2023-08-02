FROM node:20.5-slim

RUN mkdir -p /usr/share/man/man1 && \
    echo 'deb http://ftp.debian.org/debian bookworm-backports main' | tee /etc/apt/sources.list.d/bookworm-backports.list && \
    apt update && apt install -y \
    git \
    ca-certificates\
    openjdk-17-jre


ENV JAVA_HOME="/usr/lib/jvm/java-17-openjdk-amd64"

USER node

WORKDIR /home/node/app

CMD [ "sh", "-c", " npm install && tail -f /dev/null" ]
