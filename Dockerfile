# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of your application code to the container
COPY . .

# Expose a port (if needed)
EXPOSE 3000

# Define the command to run your application
CMD ["node", "_app.js"]