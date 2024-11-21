# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock) to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Set environment variables for MongoDB URI and JWT secret
ENV MONGO_URI=mongodb://localhost:27017/dogAuthAPI
ENV JWT_SECRET=your_jwt_secret_key
ENV PORT=3000

# Expose the application port
EXPOSE 3000

# Start the server
CMD ["npm", "start"]
