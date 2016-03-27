import knex from 'knex';
import env from 'require-env';

import config from '../../config/db';

const NODE_ENV = env.require('NODE_ENV');

export default knex(config[NODE_ENV]);

