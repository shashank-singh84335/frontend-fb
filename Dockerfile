# Use an official Node runtime as a parent image
FROM node:16 as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install any dependencies
RUN npm install

# Copy the rest of your application's code
COPY . .

# Define build-time arguments
ARG VITE_FACEBOOK_REDIRECT_URL
ARG VITE_BASE_URL
ARG VITE_BASE_AUTH_URL
# Create or append to .env file
RUN echo "VITE_FACEBOOK_REDIRECT_URL=${VITE_API_URL}" > .env
RUN echo "VITE_BASE_URL=${VITE_APP_TITLE}" >> .env
RUN echo "VITE_BASE_AUTH_URL=${VITE_APP_TITLE}" >> .env

# Build your app
RUN npm run build

# Stage 2: Serve the app using serve
FROM node:16

# Install serve to serve the app on port 80
RUN npm install -g serve

# Copy build artifacts from the build stage
COPY --from=build /app/dist /app

# Set the working directory to where the build artifacts are
WORKDIR /app

# Expose port 80
EXPOSE 80

# Command to run the app using serve
CMD ["serve", "-s", ".", "-l", "80"]