import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import {PostConnection} from './Post';
import {CommentConnection} from './Comment';
import ObjectType from '../objectType';
import {INode} from './Node';
import Time from './Time';

import {
  connectionArgs,
} from 'graphql-relay';

const NAME = 'User';

export default new GraphQLObjectType(ObjectType({
  name: NAME,
  description: 'A user',
  interfaces: [INode],
  fields: (field) => ({
    id: field.id(NAME),
    email: { type: new GraphQLNonNull(GraphQLString) },
    username: { type: new GraphQLNonNull(GraphQLString) },
    createdAt: {
      type: new GraphQLNonNull(Time),
      resolve: ({created_at}) => new Date(created_at)
    },
    posts: {
      type: PostConnection,
      args: connectionArgs,
      resolve: async ({id}, args, {rootValue: {store}}) => {
      }
    },
    comments: {
      type: CommentConnection,
      args: connectionArgs,
      resolve: async ({id}, args, {rootValue: {store}}) => {
      }
    },
  })
}));

