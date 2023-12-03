# It uses node:20-alpine as the base image for the frontend React.js application
FROM node:20-alpine
# Creating the working directory named `app`
WORKDIR /usr/src/app
COPY package*.json ./

#Copying all the application source code and files to the working directory `app`
COPY . .
#Installing all the tools and dependencies in the container
RUN npm install


CMD ["npm", "start"]


