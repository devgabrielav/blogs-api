# Project Blogs API

# Context
This is a Backend, CRUD project made with layered architecture, simulating a blog with: users, categories and posts.

Along with the login route with validations, it's possible to: 
  - GET posts, categories and users;
  - POST posts, categories and users;
  - PUT posts;
  - DELETE posts and users.

## Used technologies

Back-end:
> Developed using: Javascript, Docker, NodeJS, ExpressJS, MYSQL, Sequelize, JWT

## Installing Dependencies

> After cloning the project

```bash
cd blogs-api
npm install
``` 
## Running the application with Docker
  
  ```
  docker compose up -d
  docker exec -it blogs_api bash
  ```
* Then run
  
  ```
  npm start
  ```
  > 'node .'
  
  - or run
    
  ```
  npm run dev
  ```
  > 'nodemon .'
