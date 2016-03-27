import User from '../types/User';

import {
  GraphQLString,
  GraphQLNonNull,
} from 'graphql';

export default {
  type: new GraphQLNonNull(User),
  args: {
    username: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: async (_, {username}, {rootValue: {store}}) => {
    const users = await store.users.query(q => q.where({username}));
    return users[0];
  }
};

