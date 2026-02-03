# Use Node 20 LTS as base image.
FROM node:20-alpine AS build

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package.json package-lock.json ./

# Install app dependencies
RUN npm ci

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN npx ng build --configuration development --output-path=dist/output

# Stage 2: Serve the application with a minimal web server
FROM nginx:alpine

# Copy the build output from the previous stage
COPY --from=build /app/dist/output/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

# Start the server using the production build
EXPOSE 4200

CMD ["nginx", "-g", "daemon off;"]
