# Use the official Node.js image as the base image
FROM node:23

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Copy the CSV file
COPY src/data/Interns_2025_SWIFT_CODES.csv ./dist/src/data/Interns_2025_SWIFT_CODES.csv

# Expose the port the app runs on
EXPOSE 8080

# Start the application
CMD ["npm", "run", "start"]