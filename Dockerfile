# Stage 1: Build the Next.js fjernlys
FROM node:20 AS builder

# Install dependencies
COPY package.json .
RUN npm install

# Copy all files
COPY . .

# Build the Next.js fjernlys
RUN npm run build

# Stage 2: Serve the built fjernlys using a lightweight web server
FROM node:20
COPY . .
# Expose the port the fjernlys runs on
ENV PORT 3000
EXPOSE 3000

# Start the Next.js fjernlys
CMD node server.mjs
