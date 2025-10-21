# Use official Node.js 18 Alpine image
FROM node:18-alpine

# Install git (needed to fetch GitHub packages over HTTPS)
RUN apk add --no-cache git bash

# Set working directory
WORKDIR /app

# Copy only package.json first to leverage Docker cache
COPY package.json ./

# Make sure git uses HTTPS instead of SSH (optional, extra safety)
RUN git config --global url."https://github.com/".insteadOf git@github.com:

# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# Expose the port your app listens on
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
