FROM node:20.9-slim

MAINTAINER joan vega

LABEL description="api serving to the vote-ab frontend"
LABEL version="1.0.0"


EXPOSE 8090
WORKDIR /app
COPY . /app
RUN npm install

CMD [ "node", "server/index.js" ]
