# It uses node:20 as the base image for the Node.js application
FROM node:20-alpine

# Creating the working directory named `app`
WORKDIR /usr/src/app
#Copying all the application source code and files to the working directory `app`
COPY . .
#Installing all the tools and dependencies in the container
RUN npm install
#Exposing the container to run on this port 3004
EXPOSE 3004
