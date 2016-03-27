import express from 'express';
import env from 'require-env';
import winston from 'winston';

import graphql from './routers/graphql';

const PORT = env.require('PORT');

const app = express();

app.use('/graphql', graphql);

app.listen(PORT, () => {
  winston.info(
    `GraphQL app listening on PORT: ${process.env.PORT}`
  );
});

