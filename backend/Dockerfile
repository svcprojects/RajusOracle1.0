FROM node:18-alpine

# Install git (needed for git+https dependencies)
RUN apk add --no-cache git

WORKDIR /app

# Copy package.json only to leverage Docker caching
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

EXPOSE 3000

CMD ["npm", "start"]
