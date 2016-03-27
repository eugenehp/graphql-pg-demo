import {Router} from 'express';
import graphqlHTTP from 'express-graphql';
import bodyParser from 'body-parser';
import env from 'require-env';
import winston from 'winston';

import User from '../types/User';
import {setNodeType} from '../objectType';
import pg from '../services/pg';
import schema from '../schema';
import {createStore} from '../services/store';
import db from '../services/pg';

const pretty = NODE_ENV === 'development';
const NODE_ENV = env.require('NODE_ENV');
const graphiql = env.require('GRAPHIQL');

const router = Router();

router.use(bodyParser.json());

// Log queries and response time in development
if (NODE_ENV === 'development') {
  const colors = require('colors/safe');
  const {print} = require('graphql/language/printer');
  const {parse} = require('graphql/language/parser');

  router.use((req, res, next) => {
    const query = req.body.query || req.query.query;
    if (!query) return next();
    const variables = req.body.variables || req.query.variables;
    const prettyQuery = print(parse(query));
    const pQuery = colors.green(prettyQuery);
    const pVariables = variables ?
      colors.cyan('\nVariables: ') + colors.green(JSON.stringify(variables, null, 2)) :
      '';
    winston.info(colors.cyan('Running GraphQL query\n'), pQuery, pVariables);
    next();
  });

  const responseTime = require('response-time');
  router.use(responseTime());
}


router.use(async (req, res, next) => {
   // Todo - Authentication based on header
  //const {authorization} = req.headers;
  //if (!authorization) return next();
  //const token = authorization.split(' ').pop();
  //const {d: {uid}} = decodeToken(token);
  try {
    const user = await pg('users').first();
    if (!user) return next();
    req.user = setNodeType(User, user);
    next();
  } catch(e) {
    winston.error(e);
    next(e);
  }
});

router.use(graphqlHTTP(({user}) => {
  const store = createStore();
  return {
    schema,
    pretty,
    graphiql,
    rootValue: {
      user,
      store,
      db
    }
  };
}));

export default router;
