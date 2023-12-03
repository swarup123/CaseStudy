# It uses node:20 as the base image for the Node.js application
FROM node:20-alpine

# Creating the working directory named `app`
WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm install


CMD ["npm", "start"]
