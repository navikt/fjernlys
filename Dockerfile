# Stage 1: Build the Next.js fjernlys
FROM node:20

COPY . .

RUN npm install

RUN npm run build

# Expose the port the fjernlys runs on
EXPOSE 3000

# Start the Next.js fjernlys
CMD node server.mjs
