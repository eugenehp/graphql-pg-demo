import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import {
  connectionDefinitions,
  connectionArgs,
  connectionFromArray,
} from 'graphql-relay';

import {CommentConnection} from './Comment';
import ObjectType from '../objectType';
import Time from './Time';
import User from './User';
import {INode} from './Node';

const NAME = 'Post';

const Post = new GraphQLObjectType(ObjectType({
  name: NAME,
  description: 'A post',
  interfaces: [INode],
  fields: (field) => ({
    id: field.id(NAME),
    text: { type: new GraphQLNonNull(GraphQLString) },
    createdAt: {
      type: new GraphQLNonNull(Time),
      resolve: ({created_at}) => new Date(created_at)
    },
    user: {
      type: new GraphQLNonNull(User),
      resolve: ({user_id}, _, {rootValue: {store}}) => store.users.load(user_id)
    },
    comments: {
      type: CommentConnection,
      args: connectionArgs,
      resolve: async ({id}, args, {rootValue: {store}}) => {
        const comments = await store.comments.query(q => {
          return q.where({post_id: id}).orderByRaw('created_at ASC');
        });
        return connectionFromArray(comments, args);
      }
    },
  })
}));

export default Post;

export const {
  connectionType: PostConnection,
  edgeType: PostEdge,
} = connectionDefinitions({name: NAME, nodeType: Post});

