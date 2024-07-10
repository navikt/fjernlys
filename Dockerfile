# Stage 1: Build the Next.js fjernlys
FROM node:14 AS builder

# Set working directory
WORKDIR /fjernlys

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy all files
COPY . .

# Build the Next.js fjernlys
RUN npm run build

# Stage 2: Serve the built fjernlys using a lightweight web server
FROM node:14-alpine

# Set working directory
WORKDIR /fjernlys

# Copy built files from the builder stage
COPY --from=builder /fjernlys/.next /fjernlys/.next
COPY --from=builder /fjernlys/public /fjernlys/public
COPY --from=builder /fjernlys/next.config.mjs /fjernlys/next.config.mjs
COPY --from=builder /fjernlys/package.json /fjernlys/package.json
COPY --from=builder /fjernlys/node_modules /fjernlys/node_modules

# Expose the port the fjernlys runs on
ENV PORT 3000
EXPOSE 3000

# Start the Next.js fjernlys
CMD ["npm", "run", "start"]
