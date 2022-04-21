# Storefront Backend Project

## Technologies
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

# Structure
`migrations` all database migrations used to create data-base schema.

`src/` all source code, which contains.
- `models` for all function models used for database quiries.
- `handlers` model handlers that recieves the requests and send respones as well as status codes.
- `routes` the configuration for all routes.
- `middleware` authentication middleware.
- `tests` all test suits.
- `server.ts` main server configuration.
- `database.ts` database configuration.


# installation
`yarn` or `npm install` to install required packages.

`yarn start` or `npm run start` will run `nodemon` and start the server and the database on the `ports` defined in environment variables.

## Migrations
Start by creating two data-bases, a data-base for testing and another for development.
```
psql -U username
# Enter Password
CREATE DATABASE databaseName;
CREATE DATABASE testDatabaseName;
```
Then run 
`db-migrate up` to create the schema.


# Testing
`yarn test` or `npm run test`


