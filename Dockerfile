# Base image
FROM node:14

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose necessary ports
EXPOSE 3000 3001 3002 3003 3004 3005

# Start the application
CMD ["node", "load_balancer/server.js"]
