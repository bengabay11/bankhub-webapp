# Build stage: compile the Vite app
FROM node:20 AS build
WORKDIR /app

# Enable Corepack & pin Yarn 4.6.0 (matches your package.json "packageManager")
RUN corepack enable && corepack prepare yarn@4.6.0 --activate

# Install dependencies
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn .yarn
RUN yarn install

# Copy source code and build the app
COPY . .
RUN yarn build

# Production stage: serve static files with nginx
FROM nginx:stable-alpine AS production
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
