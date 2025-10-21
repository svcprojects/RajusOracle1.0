FROM node:18-alpine

WORKDIR /app

# Install git for npm to fetch from GitHub
RUN apk add --no-cache git

COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the code
COPY . .

# Expose port and start app
EXPOSE 10000
CMD ["npm", "start"]
