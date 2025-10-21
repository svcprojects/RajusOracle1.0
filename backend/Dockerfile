# Use official Node.js 18 Alpine image
FROM node:18-alpine AS base

# Install git (needed for git+https dependencies) and bash
RUN apk add --no-cache git bash

WORKDIR /app

# Copy package.json only to leverage caching
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# Expose port
EXPOSE 3000

# Default command
CMD ["npm", "start"]
