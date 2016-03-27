import {
  GraphQLID,
  GraphQLNonNull,
} from 'graphql';

import Post from '../types/Post';

export default {
  type: new GraphQLNonNull(Post),
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolve: async (_, {id}, {rootValue: {store}}) => {
    //const cursor = base62.decode(shortId);
    //const annotations = await store.annotations.query(q => q.where({cursor}));
    //return annotations[0];
  }
};

