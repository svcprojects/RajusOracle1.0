ROM node:18-alpine

RUN apk add --no-cache git bash

WORKDIR /app

COPY package.json ./

# Force git to convert any SSH URLs to HTTPS
RUN git config --global url."https://github.com/".insteadOf git@github.com:

RUN npm cache clean --force

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
