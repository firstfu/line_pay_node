# Choose the Node.js LTS version
# FROM node:lts-alpine
# FROM node:latest
FROM node:21.1.0

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json before other files
# Utilise Docker cache to save re-installing dependencies if unchanged
COPY package*.json ./

# TODO: 設定時區
# ENV TIME_ZONE Asia/Shanghai
# RUN ln -snf /usr/share/zoneinfo/$TIME_ZONE /etc/localtime

# Install dependencies
#RUN npm -i -g @nestjs/cli

# RUN npm install --force or --legacy-peer-deps
RUN npm install
# Copy all files
COPY . .

# Generate the prisma client
RUN npm run generate

# Build the project
RUN npm run build


# Expose the listening port
EXPOSE 3001

# Run npm start
# CMD [ "npm", "run", "start:prod" ]