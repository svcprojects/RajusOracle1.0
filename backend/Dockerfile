FROM node:18-alpine

WORKDIR /app

# Install git
RUN apk add --no-cache git

# Copy dependencies first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the code
COPY . .

# Start server
CMD ["npm", "start"]
