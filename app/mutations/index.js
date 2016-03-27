import {
  GraphQLObjectType,
} from 'graphql';

import createPost from './createPost';
import createComment from './createComment';

const RootMutation = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: () => ({
    createPost,
    createComment,
  }),
});

export default RootMutation;
