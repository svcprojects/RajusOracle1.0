FROM node:18-alpine

# Install git and bash
RUN apk add --no-cache git bash

WORKDIR /app

COPY package.json ./

# Force git to use HTTPS instead of SSH
RUN git config --global url."https://github.com/".insteadOf git@github.com:

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
