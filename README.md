# Writing a RESTful API with Express & MassiveJS
This is the source code for my [Writing a RESTful API with Express & MassiveJS](https://medium.com/@alexishevia/writing-a-restful-api-with-express-massivejs-465218800c08) post, where I show how to work with PostgreSQL from a NodeJS app.

## Getting Started
1. Install Node.js (v4.3.2 preferred) & yarn

2. Run `yarn` to install project dependencies

3. Create a local postgres database (v9.5.4 preferred)
  ```
  psql -c "CREATE ROLE todo_user LOGIN PASSWORD 'todo_password' SUPERUSER;" template1
  psql -c "CREATE DATABASE "todo" WITH OWNER todo_user;" template1
  ```
4. Create your .env file:
  ```
  dburl="postgres://todo_user:todo_password@localhost/todo" && \
  echo "DATABASE_URL=${dburl}" > .env
  ```
  If you used different DB credentials, modify the `DATABASE_URL` value

5. Run your database migrations:
  ```
  db-migrate up
  ```

6. Start the app:
  ```
  npm start
  ```
