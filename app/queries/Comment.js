import {
  GraphQLID,
  GraphQLNonNull,
} from 'graphql';

import Comment from '../types/Comment';

export default {
  type: new GraphQLNonNull(Comment),
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


