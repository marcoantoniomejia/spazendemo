# Stage 1: Build the React + Vite application
FROM node:22-alpine AS builder
WORKDIR /app

# Copy package manifests and install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy project source and build production bundle
COPY . .
RUN npm run build

# Stage 2: Serve static assets with Nginx on Cloud Run port 8080
FROM nginx:stable-alpine AS production

# Copy custom Nginx configuration for SPA routing & Cloud Run port 8080
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy compiled static files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
