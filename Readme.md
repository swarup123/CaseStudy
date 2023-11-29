# Running the Fully Containerized Application
### To run the fully containerized application, follow these steps:
- run docker desktop application

- Open the root directory in your terminal or command prompt.

- Execute the following command to run the docker-compose.yml file:

- docker-compose up --build

- If above command give error then manul run npm install on both fe-user and be-user then run docker-compose up --build
- This is due to sometimes the container does not get updated with the latest packages, so the above steps make sure that the container can get updated packages

- Once the containers are up and running, you can access the application by visiting http://localhost:8000/ in your web browser. The Nginx will redirect to the react application.

# To Run Test case
- Stop fully containerized application
- Change the db connection to localhost from db in config/mongoose
- run npm test