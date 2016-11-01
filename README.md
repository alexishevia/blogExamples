# Deploying an Express Application to AWS Lambda, the easy way
This is the source code for my [Deploying an Express Application to AWS Lambda, the easy way](https://medium.com/trisfera/deploying-an-express-application-to-aws-lambda-the-easy-way-fa5fbef190ba) post, where I show how to deploy an existing Express app to AWS Lambda.

## Getting Started
1. Install Node.js (v4.3.2 preferred) & yarn

2. Run `yarn` to install project dependencies

3. Create a local postgres database (v9.5.4 preferred)
  ```
  psql -c "CREATE ROLE todo_user LOGIN PASSWORD 'todo_password' SUPERUSER;" template1
  psql -c "CREATE DATABASE "todo" WITH OWNER todo_user;" template1
  ```
4. Create your .env.yml file:
  ```
  cp .env.example.yml .env.yml
  ```
  If you used different DB credentials, modify the `DATABASE_URL` value

5. Run your database migrations:
  ```
  npm run db:migrate:dev
  ```

6. Start the app:
  ```
  npm start
  ```

## Deploying the app
1. Edit your `.env.yml` file:
  - replace `accessKeyId` and `secretAccessKey` with your AWS keys (you can get AWS Keys by following this guide: https://serverless.com/framework/docs/providers/aws/setup/).
  - replace `DATABASE_URL` for `staging` and `production` environments (you can provision free postgres databases on https://postgres.heroku.com/databases)

2. Run `npm run deploy:staging` or `npm run deploy:prod` to deploy your changes

## Models, where are you?
This app uses [massive.js](https://github.com/robconery/massive-js) instead of a full-blown ORM. PostgreSQL is amazing, why not use all of its potential?

PostgreSQL CheatSheet

Connect to postgres: `psql DATABASE_URL`  
Toggle expanded display: `\x`  
Show available tables: `\dt+`  
Show details for a table: `\d+ table_name`  
Show available functions `\df`  
Show details for a function: `\df+ function_name` or `\ef function_name`  
