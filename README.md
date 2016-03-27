
## Install
```sh
git clone git@github.com:moudy/graphql-pg-demo.git
cd graphql-pg-demo
npm install
```

## Setup Postgres DB
```
# The name should match the path of DATABASE_URL in `.env`
createdb graphqldemo

npm run migrate
npm run seed
```

## Running app
```sh
npm run dev
open http://localhost:3021/graphql
```

### Notes
- [knex.js](http://knexjs.org/) is used to interact with Postgres
- [express-graphql](https://github.com/graphql/express-graphql) is used to create an Express GraphQL server
- There is no "Client app" but the data can be explored through [Graphiql](https://github.com/graphql/graphiql) at http://localhost:3021/graphql (try clicking around "Docs" in the upper right corner).
- [Here is an example query](http://localhost:3021/graphql?query=query%20%7B%0A%20%20viewer%20%7B%0A%20%20%20%20posts%20%7B%0A%20%20%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20%20%20text%0A%20%20%20%20%20%20%20%20%20%20user%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D) that returns a list of posts with it's text and user.

