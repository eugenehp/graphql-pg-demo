import env from 'require-env';

const pgServer = env.requireUrl('DATABASE_URL');

export default {
  development: {
    client: 'postgresql',
    connection: env.require('DATABASE_URL')
  },
  production: {
    client: 'postgresql',
    connection: {
      host: pgServer.hostname,
      port: pgServer.port,
      user: (pgServer.auth || '').split(':')[0],
      password: (pgServer.auth || '').split(':')[1],
      database: pgServer.path.substring(1),
      ssl: true
    }
  }
};


